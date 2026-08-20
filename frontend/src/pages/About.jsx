import { useEffect, useState } from "react";
import client from "../api/client";
import { IconMail } from "../components/icons";
import { socialIconFor } from "../utils/social";
import { Loader, ErrorState } from "../components/StateMessage";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    client
      .get("/profile")
      .then((res) => {
        setProfile(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <Loader label="Memuat profil..." />;
  if (status === "error" || !profile)
    return (
      <ErrorState>
        Gagal memuat profil. Pastikan server backend Laravel berjalan di http://localhost:8000.
      </ErrorState>
    );

  return (
    <section className="about glass-panel">
      <div className="about-photo">
        {profile.photo_url ? (
          <img src={profile.photo_url} alt={profile.name} />
        ) : (
          <div className="about-photo-placeholder">
            {profile.name
              ?.split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>
        )}
      </div>
      <div className="about-content">
        <p className="eyebrow">Halo, perkenalkan</p>
        <h1 className="gradient-text">{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="bio">{profile.bio}</p>

        {Array.isArray(profile.skills) && profile.skills.length > 0 && (
          <div className="skills">
            <h3>Skills</h3>
            <ul>
              {profile.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="social-links">
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
        </div>
      </div>
    </section>
  );
}
