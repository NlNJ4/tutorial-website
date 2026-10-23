export const CATEGORIES = [
  "Academic",
  "Creative",
  "Language",
  "Technology",
  "Health",
  "Finance",
  "Cooking",
  "Music",
  "Lifestyle",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type CollectionStatus = "published" | "draft";
export type LessonStatus = "published" | "coming-soon";

export type ResourceType =
  | "pdf"
  | "slides"
  | "link"
  | "code"
  | "drive"
  | "article"
  | "video";

export interface Resource {
  label: string;
  url: string;
  type: ResourceType;
}

export interface Lesson {
  id: string;
  title: string;
  /** Required when status is published (or omitted and treated as published). */
  youtubeId?: string;
  status?: LessonStatus;
  /** Lesson length in seconds. */
  duration: number;
  description: string;
  /** Optional longer notes shown under "About This Lesson". */
  about?: string;
  resources?: Resource[];
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  category: Category;
  description: string;
  /** Optional longer text for the collection detail page. */
  longDescription?: string;
  /** Omit or set to published for learner-visible courses. */
  status?: CollectionStatus;
  /** Optional custom cover image; falls back to the first lesson's YouTube thumbnail. */
  thumbnail?: string;
  /** Featured collections appear on the home page. */
  featured?: boolean;
  lessons: Lesson[];
  resources?: Resource[];
}
