import { collections } from "@/data/collections";
import { CATEGORIES, type Category, type Collection, type Lesson } from "@/data/types";

export { CATEGORIES };
export type { Category, Collection, Lesson };

const COURSE_COVER_PLACEHOLDER = "/course-cover-placeholder.svg";

const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export function isCollectionPublished(collection: Collection): boolean {
  return collection.status !== "draft";
}

export function getPublishedCollections(): Collection[] {
  return collections.filter(isCollectionPublished);
}

export function getAllCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/** Learner-facing lookup — draft collections are treated as missing. */
export function getPublishedCollectionBySlug(
  slug: string
): Collection | undefined {
  const collection = getCollectionBySlug(slug);
  return collection && isCollectionPublished(collection) ? collection : undefined;
}

export function isLessonPlayable(
  lesson: Pick<Lesson, "status" | "youtubeId">
): boolean {
  if (lesson.status === "coming-soon") return false;
  const id = lesson.youtubeId?.trim();
  return Boolean(id && YOUTUBE_ID_RE.test(id));
}

export function firstPlayableLesson(
  collection: Collection
): Lesson | undefined {
  return collection.lessons.find(isLessonPlayable);
}

export function getLesson(
  collection: Collection,
  lessonId: string
): Lesson | undefined {
  return collection.lessons.find((l) => l.id === lessonId);
}

export function getAdjacentLessons(
  collection: Collection,
  lessonId: string
): { prev: Lesson | null; next: Lesson | null } {
  const index = collection.lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? collection.lessons[index - 1] : null,
    next: index < collection.lessons.length - 1 ? collection.lessons[index + 1] : null,
  };
}

export function getFeaturedCollections(): Collection[] {
  const published = getPublishedCollections();
  const featured = published.filter((c) => c.featured);
  return featured.length > 0 ? featured : published.slice(0, 6);
}

/** Categories that actually have content, ordered by the canonical list. */
export function getUsedCategories(): Category[] {
  const used = new Set(getPublishedCollections().map((c) => c.category));
  return CATEGORIES.filter((c) => used.has(c));
}

export function totalDuration(collection: Collection): number {
  return collection.lessons.reduce((sum, l) => sum + l.duration, 0);
}

export function lessonCount(collection: Collection): number {
  return collection.lessons.length;
}

/** 500 -> "8:20", 3725 -> "1:02:05" */
export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** 9311 -> "2h 35m" */
export function formatTotalDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.round((totalSeconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function youtubeThumbnailUrl(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

/** Custom thumbnail, else first playable lesson, else neutral placeholder. */
export function collectionThumbnail(collection: Collection): string {
  if (collection.thumbnail) return collection.thumbnail;
  const playable = firstPlayableLesson(collection);
  if (playable?.youtubeId) return youtubeThumbnailUrl(playable.youtubeId);
  return COURSE_COVER_PLACEHOLDER;
}

/** Case-insensitive search across titles, descriptions, categories, and lesson titles. */
export function searchCollections(query: string, list: Collection[] = collections): Collection[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.lessons.some((l) => l.title.toLowerCase().includes(q))
  );
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
