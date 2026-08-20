const TYPE_LABELS = {
  internship: "Internship Experience",
  professional: "Professional Experience",
  project: "Project Experience",
};

const TYPE_ORDER = ["internship", "professional", "project"];

function groupByType(experiences) {
  const groups = new Map();
  for (const exp of experiences) {
    const key = exp.type || "project";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(exp);
  }
  return TYPE_ORDER.filter((type) => groups.has(type)).map((type) => ({
    type,
    label: TYPE_LABELS[type] ?? type,
    items: groups.get(type),
  }));
}

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

export function ResumeExperienceGroups({ experiences }) {
  if (!experiences?.length) return null;
  const groups = groupByType(experiences);

  return (
    <>
      {groups.map((group) => (
        <section key={group.type} className="resume-section">
          <h2>{group.label}</h2>
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
    </>
  );
}
