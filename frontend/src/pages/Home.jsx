import { useTypewriter } from "../hooks/useTypewriter";
import { IconMail } from "../components/icons";
import { socialIconFor } from "../utils/social";
import BioText from "../components/BioText";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import { resolveUrl } from "../api/client";

export default function Home({ profile, portfolios, experiences }) {
  const typedTitle = useTypewriter(profile?.title ?? "");

  if (!profile) return null;

  return (
    <section id="home" className="page-section hero">
      <div className="hero-text">
        <Reveal as="p" className="hero-wave">
          Hi There! <span className="hero-wave-emoji">👋</span>
        </Reveal>
        <Reveal as="h1" delay={80}>
          I&apos;m <span className="gradient-text">{profile.name}</span>
        </Reveal>
        <Reveal as="h2" className="hero-typed" delay={160}>
          {typedTitle}
          <span className="hero-cursor" aria-hidden="true" />
        </Reveal>
        <Reveal delay={240}>
          <BioText text={profile.bio} className="hero-bio" />
        </Reveal>

        <Reveal className="hero-actions" delay={320}>
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#resume" className="btn btn-outline">
            My Resume
          </a>
        </Reveal>

        <Reveal className="social-links" delay={380}>
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="social-link" aria-label="Email">
              <IconMail />
              <span>Email</span>
            </a>
          )}
          {profile.social_links &&
            Object.entries(profile.social_links).map(([label, url]) => {
              const Icon = socialIconFor(label);
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label={label}
                >
                  <Icon />
                  <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
                </a>
              );
            })}
        </Reveal>

        <Reveal className="hero-stats" delay={440}>
          <div className="hero-stat">
            <span className="hero-stat-number">
              <CountUp value={portfolios?.length ?? 0} />+
            </span>
            <span className="hero-stat-label">Projects</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">
              <CountUp value={profile.skills?.length ?? 0} />
            </span>
            <span className="hero-stat-label">Tech Stack</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">
              <CountUp value={experiences?.length ?? 0} />
            </span>
            <span className="hero-stat-label">Experience</span>
          </div>
        </Reveal>
      </div>

      <Reveal as="div" className="hero-photo" delay={120}>
        <span className="hero-blob" aria-hidden="true" />
        <span className="hero-photo-glow" aria-hidden="true" />
        <div className="hero-photo-frame">
          {profile.photo_url ? (
            <>
              <img src={resolveUrl(profile.photo_url)} alt={profile.name} />
              <span className="hero-photo-tint" aria-hidden="true" />
            </>
          ) : (
            <div className="hero-photo-placeholder">
              {profile.name
                ?.split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
