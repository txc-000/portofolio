import { IconGithub, IconLinkedin, IconInstagram, IconLink } from "../components/icons";

const SOCIAL_ICONS = {
  github: IconGithub,
  linkedin: IconLinkedin,
  instagram: IconInstagram,
};

export function socialIconFor(label) {
  return SOCIAL_ICONS[label?.toLowerCase()] ?? IconLink;
}
