import { forwardRef, useEffect, useRef, useState } from "react";

function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") ref.current = node;
    }
  };
}

const Reveal = forwardRef(function Reveal(
  { children, className = "", as: Tag = "div", delay = 0, ...rest },
  forwardedRef
) {
  const localRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = localRef.current;
    if (!node) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={mergeRefs(localRef, forwardedRef)}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;
