import { useEffect, useRef, useState } from "react";

export default function Navbar({ sections, brand, ready }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const linkRefs = useRef([]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (targets.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections, ready]);

  useEffect(() => {
    function measure() {
      const index = sections.findIndex((s) => s.id === activeId);
      const node = linkRefs.current[index];
      if (node) setIndicator({ left: node.offsetLeft, width: node.offsetWidth, ready: true });
    }
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId, sections]);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#home" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="navbar-brand-dot" aria-hidden="true" />
          {brand || "Portofolio"}
        </a>

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
          {indicator.ready && (
            <span
              className="navbar-indicator"
              style={{ left: indicator.left, width: indicator.width }}
              aria-hidden="true"
            />
          )}
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className={activeId === section.id ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
