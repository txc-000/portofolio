export function ExperienceTimeline({ experiences }) {
  if (!experiences?.length) return null;

  return (
    <ol className="timeline">
      {experiences.map((exp) => (
        <li key={exp.id} className="timeline-item">
          <div className="timeline-marker" aria-hidden="true" />
          <div className="timeline-body">
            <div className="timeline-header">
              <h3>
                {exp.role} <span className="timeline-org">— {exp.organization}</span>
              </h3>
              <span className="timeline-period">{exp.period}</span>
            </div>
            <p>{exp.description}</p>
            {exp.link && (
              <a href={exp.link} target="_blank" rel="noreferrer" className="timeline-link">
                Website Link
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
