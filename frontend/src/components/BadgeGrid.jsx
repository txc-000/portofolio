import { techIconFor } from "../utils/techIconFor";
import { techColorFor } from "../utils/techColorFor";

export default function BadgeGrid({ title, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="badge-grid-section">
      <h3>{title}</h3>
      <div className="badge-grid">
        {items.map((item) => {
          const Icon = techIconFor(item);
          const color = techColorFor(item);
          return (
            <div key={item} className="badge-tile" style={{ "--badge-color": color }}>
              {Icon && <Icon className="badge-tile-icon" style={{ color }} />}
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
