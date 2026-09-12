/**
 * Lightweight local progress tracking — no accounts, just localStorage.
 * Shape: { [collectionSlug]: { completed: string[], lastLessonId?: string } }
 *
 * Exposed as an external store so every subscribed component (badges,
 * lesson lists, the complete-toggle) stays in sync after any write.
 */

const STORAGE_KEY = "learnly:progress";

export interface CollectionProgress {
  completed: string[];
  lastLessonId?: string;
}

type ProgressMap = Record<string, CollectionProgress>;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function readAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as ProgressMap;
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
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Raw string snapshot — stable between renders until the data changes. */
function getSnapshot(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return "";
}

export const progressStore = { subscribe, getSnapshot, getServerSnapshot };

export function parseProgress(raw: string): ProgressMap {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as ProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getCollectionProgress(slug: string): CollectionProgress {
  return readAll()[slug] ?? { completed: [] };
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
