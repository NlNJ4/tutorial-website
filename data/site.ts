/**
 * Site-wide branding and copy. Edit this file when you pick a final name
 * or add your YouTube channel link.
 */
export const site = {
  siteName: "Learnly",
  defaultTitle: "Learnly — Tutor lessons worth watching",
  titleTemplate: "%s · Learnly",
  tagline: "Tutor lessons, organized for learners.",
  shortDescription:
    "Short lesson clips I teach on YouTube, grouped into simple courses you can watch at your own pace.",
  youtubeChannelUrl: "",
  creatorNote:
    "I upload lessons to YouTube and organize them here so friends, family, and anyone learning with me can find the right clip without digging through a channel.",
} as const;

export type SiteConfig = typeof site;
