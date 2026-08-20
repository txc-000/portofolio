import { useEffect, useRef } from "react";

const STAR_DENSITY = 9000; // px^2 per star
const SHOOTING_STAR_INTERVAL = [3500, 9000]; // ms range

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    let shootingStars = [];
    let animationId = null;
    let shootingStarTimeout = null;

    function makeStars() {
      const count = Math.floor((width * height) / STAR_DENSITY);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.1 + 0.25,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.15 ? "cyan" : Math.random() < 0.1 ? "purple" : "white",
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    }

    function colorFor(hue, alpha) {
      if (hue === "cyan") return `rgba(148, 224, 255, ${alpha})`;
      if (hue === "purple") return `rgba(196, 165, 255, ${alpha})`;
      return `rgba(255, 255, 255, ${alpha})`;
    }

    function spawnShootingStar() {
      const startX = Math.random() * width * 0.7;
      shootingStars.push({
        x: startX,
        y: Math.random() * height * 0.4,
        length: Math.random() * 90 + 70,
        speed: Math.random() * 9 + 7,
        angle: (Math.PI / 180) * (35 + Math.random() * 15),
        life: 1,
      });
      const [min, max] = SHOOTING_STAR_INTERVAL;
      shootingStarTimeout = window.setTimeout(spawnShootingStar, min + Math.random() * (max - min));
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = prefersReducedMotion
          ? 0
          : Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.35;
        const alpha = Math.max(0, Math.min(1, star.baseAlpha + twinkle));
        ctx.beginPath();
        ctx.fillStyle = colorFor(star.hue, alpha);
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        shootingStars = shootingStars.filter((s) => s.life > 0);
        for (const s of shootingStars) {
          const dx = Math.cos(s.angle) * s.speed;
          const dy = Math.sin(s.angle) * s.speed;
          s.x += dx;
          s.y += dy;
          s.life -= 0.02;

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;
          const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          gradient.addColorStop(0, `rgba(255,255,255,${s.life})`);
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
        animationId = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    if (!prefersReducedMotion) {
      shootingStarTimeout = window.setTimeout(spawnShootingStar, 2000);
    } else {
      draw(0);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
      if (shootingStarTimeout) clearTimeout(shootingStarTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
