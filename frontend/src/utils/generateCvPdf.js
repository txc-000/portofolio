import { jsPDF } from "jspdf";
import { RESUME_LABELS, groupExperiencesByType } from "./resumeI18n";

const MARGIN = 15;
const LINE_HEIGHT = 5;
const MUTED = [80, 80, 80];
const FAINT = [130, 130, 130];
const INK = [17, 17, 17];
const RULE = [210, 210, 210];

function createWriter(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;
  let y = MARGIN;

  function ensureSpace(needed) {
    if (y + needed > pageHeight - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  }

  function paragraph(text, { size = 10, color = MUTED, gapAfter = 3 } = {}) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentWidth);
    for (const line of lines) {
      ensureSpace(LINE_HEIGHT);
      doc.text(line, MARGIN, y);
      y += LINE_HEIGHT;
    }
    y += gapAfter;
  }

  function sectionTitle(text) {
    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...INK);
    doc.text(text.toUpperCase(), MARGIN, y);
    y += 2;
    doc.setDrawColor(...RULE);
    doc.line(MARGIN, y, pageWidth - MARGIN, y);
    y += 6;
  }

  function entryHeader(title, period) {
    ensureSpace(LINE_HEIGHT + 1);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text(title, MARGIN, y);
    if (period) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...FAINT);
      doc.text(period, pageWidth - MARGIN, y, { align: "right" });
    }
    y += LINE_HEIGHT;
  }

  function link(text) {
    ensureSpace(LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...FAINT);
    doc.textWithLink(text, MARGIN, y, { url: text });
    y += LINE_HEIGHT + 2;
  }

  function spacer(amount = 2) {
    y += amount;
  }

  return { doc, ensureSpace, paragraph, sectionTitle, entryHeader, link, spacer, get y() { return y; }, set y(v) { y = v; } };
}

export function generateCvPdf({ profile, experiences, lang }) {
  const t = RESUME_LABELS[lang] ?? RESUME_LABELS.en;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = createWriter(doc);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text(profile.name, MARGIN, w.y);
  w.y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...MUTED);
  doc.text(profile.title, MARGIN, w.y);
  w.y += 6;

  const contactItems = [
    profile.location,
    profile.phone,
    profile.email,
    ...(profile.social_links ? Object.values(profile.social_links) : []),
  ].filter(Boolean);
  if (contactItems.length > 0) {
    w.paragraph(contactItems.join("   ·   "), { size: 9.5, color: FAINT, gapAfter: 4 });
  }

  // Profile
  w.sectionTitle(t.profile);
  w.paragraph(lang === "id" ? profile.bio_id ?? profile.bio : profile.bio);

  // Technical Skills
  if (profile.skills?.length > 0 || profile.tools?.length > 0) {
    w.sectionTitle(t.technicalSkills);
    if (profile.skills?.length > 0) {
      w.paragraph(`${t.skills}: ${profile.skills.join(", ")}`);
    }
    if (profile.tools?.length > 0) {
      w.paragraph(`${t.tools}: ${profile.tools.join(", ")}`);
    }
  }

  // Experience groups
  if (experiences?.length > 0) {
    for (const group of groupExperiencesByType(experiences)) {
      w.sectionTitle(t.types[group.type] ?? group.type);
      for (const exp of group.items) {
        w.entryHeader(`${exp.role} — ${exp.organization}`, exp.period);
        w.paragraph(lang === "id" ? exp.cv_description_id ?? exp.description_id ?? exp.description : exp.cv_description ?? exp.description);
        if (exp.link) w.link(exp.link);
      }
    }
  }

  // Education
  if (profile.education?.length > 0) {
    w.sectionTitle(t.education);
    for (const edu of profile.education) {
      w.entryHeader(lang === "id" ? edu.degree_id ?? edu.degree : edu.degree, edu.period);
      w.paragraph(edu.institution, { gapAfter: 1 });
      const details = (lang === "id" ? edu.details_id ?? edu.details : edu.details) ?? [];
      for (const detail of details) w.paragraph(detail, { gapAfter: 1 });
      w.spacer(2);
    }
  }

  // Certifications
  if (profile.certifications?.length > 0) {
    w.sectionTitle(t.certifications);
    for (const cert of profile.certifications) {
      const name = lang === "id" ? cert.name_id ?? cert.name : cert.name;
      w.entryHeader(`${name} — ${cert.issuer}`, cert.year);
      w.paragraph(lang === "id" ? cert.description_id ?? cert.description : cert.description);
    }
  }

  doc.save(`CV - ${profile.name} (${lang.toUpperCase()}).pdf`);
}
