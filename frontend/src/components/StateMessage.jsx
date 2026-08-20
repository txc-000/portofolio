export function Loader({ label = "Memuat..." }) {
  return (
    <div className="state-message">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export function ErrorState({ children }) {
  return (
    <div className="state-message state-message-error">
      <p>{children}</p>
    </div>
  );
}

export function EmptyState({ children }) {
  return (
    <div className="state-message">
      <p>{children}</p>
    </div>
  );
}
