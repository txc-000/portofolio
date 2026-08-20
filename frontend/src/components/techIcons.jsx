import { BRAND_ICONS } from "../data/brandIcons";

const base = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
};

function LetterMark({ label, ...rest }) {
  const fontSize = label.length > 3 ? 7 : label.length === 3 ? 8 : 9.5;
  return (
    <svg {...base} {...rest}>
      <text
        x="12"
        y="13"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Bricolage Grotesque', sans-serif"
        fontWeight="700"
        fontSize={fontSize}
        fill="currentColor"
      >
        {label}
      </text>
    </svg>
  );
}

function initialsFor(name) {
  const words = name.replace(/[.+#]/g, (m) => ` ${m} `).trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).charAt(0).toUpperCase() + name.slice(1, 2);
}

function BrandIcon({ slug, ...props }) {
  const icon = BRAND_ICONS[slug];
  if (!icon) return null;
  return (
    <svg {...base} {...props} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

function brand(slug) {
  return (props) => <BrandIcon slug={slug} {...props} />;
}

export function IconVSCode(props) {
  return (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="m8 8-4.5 4 4.5 4" />
      <path d="M16 4 6.2 12 16 20l4-2V6z" />
    </svg>
  );
}

export function IconLock(props) {
  return (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChartBars(props) {
  return (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V11" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M4 20h14" />
    </svg>
  );
}

export { LetterMark, initialsFor, BrandIcon };

export const SHAPE_ICONS = {
  react: brand("react"),
  "react.js": brand("react"),
  reactjs: brand("react"),
  "react native": brand("react"),
  vue: brand("vuedotjs"),
  "vue.js": brand("vuedotjs"),
  vuejs: brand("vuedotjs"),
  node: brand("nodedotjs"),
  "node.js": brand("nodedotjs"),
  nodejs: brand("nodedotjs"),
  next: brand("nextdotjs"),
  "next.js": brand("nextdotjs"),
  nextjs: brand("nextdotjs"),
  laravel: brand("laravel"),
  supabase: brand("supabase"),
  tailwind: brand("tailwindcss"),
  "tailwind css": brand("tailwindcss"),
  tailwindcss: brand("tailwindcss"),
  git: brand("git"),
  github: brand("github"),
  figma: brand("figma"),
  postman: brand("postman"),
  firebase: brand("firebase"),
  mysql: brand("mysql"),
  postgresql: brand("postgresql"),
  postgres: brand("postgresql"),
  mongodb: brand("mongodb"),
  redis: brand("redis"),
  docker: brand("docker"),
  vercel: brand("vercel"),
  vite: brand("vite"),
  javascript: brand("javascript"),
  js: brand("javascript"),
  typescript: brand("typescript"),
  ts: brand("typescript"),
  php: brand("php"),
  html: brand("html5"),
  html5: brand("html5"),
  css: brand("css"),
  css3: brand("css"),
  bootstrap: brand("bootstrap"),
  sass: brand("sass"),
  scss: brand("sass"),
  python: brand("python"),
  "c++": brand("cplusplus"),
  go: brand("go"),
  mikrotik: brand("mikrotik"),
  "cisco packet tracer": brand("cisco"),
  cisco: brand("cisco"),
  "vs code": IconVSCode,
  vscode: IconVSCode,
  "visual studio code": IconVSCode,
  sanctum: IconLock,
  recharts: IconChartBars,
};
