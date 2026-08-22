export const TYPE_ORDER = ["internship", "professional", "project"];

export const RESUME_LABELS = {
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

export function groupExperiencesByType(experiences) {
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
