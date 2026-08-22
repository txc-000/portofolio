import PortfolioCard from "../components/PortfolioCard";
import { EmptyState } from "../components/StateMessage";

const CATEGORY_LABELS = {
  professional: "Professional Projects",
  website: "Website Projects",
  mobile: "Mobile App Projects",
  uiux: "UI/UX Projects",
};

const CATEGORY_ORDER = ["professional", "website", "mobile", "uiux"];

function groupByCategory(portfolios) {
  const groups = new Map();
  for (const item of portfolios) {
    const key = item.category || "website";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const ordered = CATEGORY_ORDER.filter((key) => groups.has(key)).map((key) => ({
    key,
    label: CATEGORY_LABELS[key] ?? key,
    items: groups.get(key),
  }));
  for (const [key, items] of groups) {
    if (!CATEGORY_ORDER.includes(key)) {
      ordered.push({ key, label: CATEGORY_LABELS[key] ?? key, items });
    }
  }
  return ordered;
}

export default function Project({ portfolios }) {
  const groups = groupByCategory(portfolios ?? []);

  return (
    <section id="projects" className="page-section">
      <h1 className="section-title gradient-text">Projects</h1>
      {groups.length === 0 && <EmptyState>No projects added yet.</EmptyState>}
      {groups.map((group) => (
        <div key={group.key} className="project-group">
          <h2 className="section-subtitle">{group.label}</h2>
          <div className="portfolio-grid">
            {group.items.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
