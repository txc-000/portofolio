import { useEffect, useState } from "react";
import BioText from "../components/BioText";
import Reveal from "../components/Reveal";

const TYPE_ORDER = ["internship", "professional", "project"];

const LABELS = {
  en: {
    profile: "Profile",
    technicalSkills: "Technical Skills",
    skills: "Skills",
    tools: "Tools",
    education: "Education",
    certifications: "Certifications",
    types: {
      internship: "Internship Experience",
      professional: "Professional Experience",
      project: "Project Experience",
    },
  },
  id: {
    profile: "Profil",
    technicalSkills: "Keahlian Teknis",
    skills: "Keahlian",
    tools: "Tools",
    education: "Pendidikan",
    certifications: "Sertifikasi",
    types: {
      internship: "Pengalaman Magang",
      professional: "Pengalaman Profesional",
      project: "Pengalaman Proyek",
    },
  },
};

function groupByType(experiences) {
  const groups = new Map();
  for (const exp of experiences) {
    const key = exp.type || "project";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(exp);
  }
  return TYPE_ORDER.filter((type) => groups.has(type)).map((type) => ({
    type,
    items: groups.get(type),
  }));
}

export default function Resume({ profile, experiences }) {
  const [lang, setLang] = useState("en");
  const [printTick, setPrintTick] = useState(0);

  useEffect(() => {
    if (printTick === 0) return;
    const previousTitle = document.title;
    document.title = `CV - ${profile.name} (${lang.toUpperCase()})`;
    window.print();
    document.title = previousTitle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printTick]);

  if (!profile) return null;

  const t = LABELS[lang];

  const contactItems = [
    profile.location,
    profile.phone,
    profile.email,
    ...(profile.social_links ? Object.values(profile.social_links) : []),
  ].filter(Boolean);

  const handleDownload = (targetLang) => {
    setLang(targetLang);
    setPrintTick((tick) => tick + 1);
  };

  return (
    <section id="resume" className="page-section">
      <Reveal className="resume-toolbar">
        <button type="button" className="btn btn-primary" onClick={() => handleDownload("en")}>
          ⬇ Download CV (EN)
        </button>
        <button type="button" className="btn btn-outline" onClick={() => handleDownload("id")}>
          ⬇ Download CV (ID)
        </button>
      </Reveal>

      <Reveal as="article" className="resume-sheet glass-panel" delay={80}>
        <header className="resume-head">
          <h1>{profile.name}</h1>
          <h2>{profile.title}</h2>
          {contactItems.length > 0 && (
            <p className="resume-contact">{contactItems.join("  ·  ")}</p>
          )}
        </header>

        <section className="resume-section">
          <h2>{t.profile}</h2>
          <BioText text={lang === "id" ? profile.bio_id ?? profile.bio : profile.bio} />
        </section>

        {(profile.skills?.length > 0 || profile.tools?.length > 0) && (
          <section className="resume-section">
            <h2>{t.technicalSkills}</h2>
            {profile.skills?.length > 0 && (
              <p><strong>{t.skills}:</strong> {profile.skills.join(", ")}</p>
            )}
            {profile.tools?.length > 0 && (
              <p><strong>{t.tools}:</strong> {profile.tools.join(", ")}</p>
            )}
          </section>
        )}

        {experiences?.length > 0 &&
          groupByType(experiences).map((group) => (
            <section key={group.type} className="resume-section">
              <h2>{t.types[group.type] ?? group.type}</h2>
              {group.items.map((exp) => (
                <div key={exp.id} className="resume-entry">
                  <div className="resume-entry-header">
                    <h3>
                      {exp.role} <span>— {exp.organization}</span>
                    </h3>
                    <span className="resume-period">{exp.period}</span>
                  </div>
                  <p>{lang === "id" ? exp.description_id ?? exp.description : exp.description}</p>
                  {exp.link && (
                    <a href={exp.link} target="_blank" rel="noreferrer">
                      {exp.link}
                    </a>
                  )}
                </div>
              ))}
            </section>
          ))}

        {profile.education?.length > 0 && (
          <section className="resume-section">
            <h2>{t.education}</h2>
            {profile.education.map((edu, index) => (
              <div key={index} className="resume-entry">
                <div className="resume-entry-header">
                  <h3>{lang === "id" ? edu.degree_id ?? edu.degree : edu.degree}</h3>
                  <span className="resume-period">{edu.period}</span>
                </div>
                <p>{edu.institution}</p>
                {(lang === "id" ? edu.details_id ?? edu.details : edu.details)?.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            ))}
          </section>
        )}

        {profile.certifications?.length > 0 && (
          <section className="resume-section">
            <h2>{t.certifications}</h2>
            {profile.certifications.map((cert, index) => (
              <div key={index} className="resume-entry">
                <div className="resume-entry-header">
                  <h3>
                    {lang === "id" ? cert.name_id ?? cert.name : cert.name} — {cert.issuer}
                  </h3>
                  <span className="resume-period">{cert.year}</span>
                </div>
                <p>{lang === "id" ? cert.description_id ?? cert.description : cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </Reveal>
    </section>
  );
}
