import { ExperienceTimeline } from "../components/ExperienceList";
import BadgeGrid from "../components/BadgeGrid";
import BioText from "../components/BioText";
import Reveal from "../components/Reveal";

export default function About({ profile, experiences }) {
  if (!profile) return null;

  return (
    <section id="about" className="page-section about-page">
      <h1 className="section-title">
        Know Who <span className="gradient-text">I&apos;m</span>
      </h1>

      <Reveal className="about-intro glass-panel">
        <BioText text={profile.bio} />
        {profile.location && (
          <p className="about-location">
            📍 Based in <strong>{profile.location}</strong>
          </p>
        )}
      </Reveal>

      {experiences?.length > 0 && (
        <Reveal className="about-block" delay={80}>
          <h2 className="section-subtitle">Experience</h2>
          <ExperienceTimeline experiences={experiences} />
        </Reveal>
      )}

      <Reveal className="about-badges" delay={120}>
        <BadgeGrid title={<>Tech <span className="gradient-text">I use</span></>} items={profile.skills} />
        <BadgeGrid title={<>Tools <span className="gradient-text">I use</span></>} items={profile.tools} />
      </Reveal>
    </section>
  );
}
