import { ResumeExperienceGroups } from "../components/ExperienceList";
import BioText from "../components/BioText";
import Reveal from "../components/Reveal";

export default function Resume({ profile, experiences }) {
  if (!profile) return null;

  const contactItems = [
    profile.location,
    profile.phone,
    profile.email,
    ...(profile.social_links ? Object.values(profile.social_links) : []),
  ].filter(Boolean);

  return (
    <section id="resume" className="page-section">
      <Reveal className="resume-toolbar">
        {profile.cv_url ? (
          <a href={profile.cv_url} target="_blank" rel="noreferrer" className="btn btn-primary">
            ⬇ Download CV
          </a>
        ) : (
          <span className="resume-cv-missing">CV belum diunggah — tambahkan cv_url pada profil.</span>
        )}
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
          <h2>Profile</h2>
          <BioText text={profile.bio} />
        </section>

        <ResumeExperienceGroups experiences={experiences} />
      </Reveal>
    </section>
  );
}
