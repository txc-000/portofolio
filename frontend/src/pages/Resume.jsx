import BioText from "../components/BioText";
import Reveal from "../components/Reveal";
import { RESUME_LABELS, groupExperiencesByType } from "../utils/resumeI18n";
import { generateCvPdf } from "../utils/generateCvPdf";

export default function Resume({ profile, experiences }) {
  if (!profile) return null;

  const t = RESUME_LABELS.en;

  const contactItems = [
    profile.location,
    profile.phone,
    profile.email,
    ...(profile.social_links ? Object.values(profile.social_links) : []),
  ].filter(Boolean);

  return (
    <section id="resume" className="page-section">
      <Reveal className="resume-toolbar">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => generateCvPdf({ profile, experiences, lang: "en" })}
        >
          ⬇ Download CV (EN)
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => generateCvPdf({ profile, experiences, lang: "id" })}
        >
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
          <BioText text={profile.bio} />
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
          groupExperiencesByType(experiences).map((group) => (
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
                  <p>{exp.description}</p>
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
                  <h3>{edu.degree}</h3>
                  <span className="resume-period">{edu.period}</span>
                </div>
                <p>{edu.institution}</p>
                {edu.details?.map((detail, i) => (
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
                  <h3>{cert.name} — {cert.issuer}</h3>
                  <span className="resume-period">{cert.year}</span>
                </div>
                <p>{cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </Reveal>
    </section>
  );
}
