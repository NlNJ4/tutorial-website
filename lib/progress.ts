/**
 * Lightweight local progress tracking — no accounts, just localStorage.
 * Shape: { [collectionSlug]: { completed: string[], lastLessonId?: string } }
 */

const STORAGE_KEY = "learnly:progress";

export interface CollectionProgress {
  completed: string[];
  lastLessonId?: string;
}

type ProgressMap = Record<string, CollectionProgress>;

function readAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: ProgressMap): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage full or unavailable — progress is best-effort by design.
  }
}

export function getCollectionProgress(slug: string): CollectionProgress {
  return readAll()[slug] ?? { completed: [] };
}

export function isLessonComplete(slug: string, lessonId: string): boolean {
  return getCollectionProgress(slug).completed.includes(lessonId);
}

export function setLessonComplete(
  slug: string,
  lessonId: string,
  complete: boolean
): void {
  const map = readAll();
  const current = map[slug] ?? { completed: [] };
  const set = new Set(current.completed);
  if (complete) set.add(lessonId);
  else set.delete(lessonId);
  map[slug] = { ...current, completed: [...set] };
  writeAll(map);
}

export function markLessonOpened(slug: string, lessonId: string): void {
  const map = readAll();
  const current = map[slug] ?? { completed: [] };
  if (current.lastLessonId === lessonId) return;
  map[slug] = { ...current, lastLessonId: lessonId };
  writeAll(map);
}
