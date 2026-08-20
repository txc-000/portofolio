import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 55) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplay("");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplay(text);
      return;
    }

    setDisplay("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return display;
}
