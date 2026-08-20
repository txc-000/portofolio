import { BRAND_ICONS } from "../data/brandIcons";

// slug -> our tech-name keys that should use that brand's authentic color
const SLUG_ALIASES = {
  react: ["react", "react.js", "reactjs", "react native"],
  vuedotjs: ["vue", "vue.js", "vuejs"],
  nodedotjs: ["node", "node.js", "nodejs"],
  nextdotjs: ["next", "next.js", "nextjs"],
  laravel: ["laravel"],
  supabase: ["supabase"],
  tailwindcss: ["tailwind", "tailwind css", "tailwindcss"],
  git: ["git"],
  github: ["github"],
  figma: ["figma"],
  postman: ["postman"],
  firebase: ["firebase"],
  mysql: ["mysql"],
  postgresql: ["postgresql", "postgres"],
  mongodb: ["mongodb"],
  redis: ["redis"],
  docker: ["docker"],
  vercel: ["vercel"],
  vite: ["vite"],
  javascript: ["javascript", "js"],
  typescript: ["typescript", "ts"],
  php: ["php"],
  html5: ["html", "html5"],
  css: ["css", "css3"],
  bootstrap: ["bootstrap"],
  sass: ["sass", "scss"],
  python: ["python"],
  cplusplus: ["c++"],
  go: ["go"],
  mikrotik: ["mikrotik"],
  cisco: ["cisco packet tracer", "cisco"],
};

// Overrides for brand colors too dark/black to read on our dark UI —
// same logo shape, just recolored for contrast (a normal practice for dark-mode UIs).
const LIGHT_OVERRIDES = {
  github: "#e5e7eb",
  vercel: "#f5f5f7",
  nextdotjs: "#f5f5f7",
  mikrotik: "#9aa5ad",
};

const COLORS = {};
for (const [slug, keys] of Object.entries(SLUG_ALIASES)) {
  const hex = LIGHT_OVERRIDES[slug] ?? BRAND_ICONS[slug]?.hex;
  if (!hex) continue;
  for (const key of keys) COLORS[key] = hex;
}

Object.assign(COLORS, {
  sql: "#7fb3e0",
  "c#": "#a259ff",
  sanctum: "#ff5252",
  recharts: "#f97316",
  zustand: "#d9a066",
  "restful api": "#7fb3e0",
  "vs code": "#3b9dee",
  vscode: "#3b9dee",
  "visual studio code": "#3b9dee",
});

const DEFAULT_COLOR = "#a78bfa";

export function techColorFor(name) {
  if (!name) return DEFAULT_COLOR;
  return COLORS[name.trim().toLowerCase()] ?? DEFAULT_COLOR;
}
