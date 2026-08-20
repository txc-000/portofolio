import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="navbar-brand-dot" aria-hidden="true" />
          Portofolio
        </NavLink>

        <button
          type="button"
          className={`navbar-toggle ${open ? "is-open" : ""}`}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links ${open ? "is-open" : ""}`}>
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/portfolio" className={linkClass} onClick={() => setOpen(false)}>
            Portfolio
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
