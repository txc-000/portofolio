import { IconExternal, IconCode } from "./icons";

export default function PortfolioCard({ portfolio }) {
  return (
    <article className="portfolio-card glass-panel">
      <div className="portfolio-card-image">
        {portfolio.image_url ? (
          <img src={portfolio.image_url} alt={portfolio.title} />
        ) : (
          <div className="portfolio-card-placeholder">No Image</div>
        )}
      </div>
      <div className="portfolio-card-body">
        <h3>{portfolio.title}</h3>
        <p>{portfolio.description}</p>
        {Array.isArray(portfolio.tech_stack) && portfolio.tech_stack.length > 0 && (
          <ul className="tech-stack">
            {portfolio.tech_stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        <div className="portfolio-card-links">
          {portfolio.project_url && (
            <a href={portfolio.project_url} target="_blank" rel="noreferrer">
              <IconExternal /> Live Demo
            </a>
          )}
          {portfolio.repo_url && (
            <a href={portfolio.repo_url} target="_blank" rel="noreferrer">
              <IconCode /> Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
