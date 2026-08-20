import { LetterMark, SHAPE_ICONS, initialsFor } from "../components/techIcons";

const LETTER_OVERRIDES = {
  "c#": "C#",
};

export function techIconFor(name) {
  if (!name) return null;
  const key = name.trim().toLowerCase();
  if (SHAPE_ICONS[key]) return SHAPE_ICONS[key];
  const label = LETTER_OVERRIDES[key] ?? initialsFor(name);
  return (props) => <LetterMark label={label} {...props} />;
}
