"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { CollectionProgress } from "@/lib/progress";
import {
  parseProgress,
  progressStore,
  setLessonComplete,
} from "@/lib/progress";

/**
 * Reads a collection's local progress from the localStorage store.
 * useSyncExternalStore keeps server and first client render in sync
 * (empty snapshot) and updates every subscriber after any write.
 */
export function useCollectionProgress(slug: string) {
  const raw = useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getServerSnapshot
  );

  const progress = useMemo<CollectionProgress | undefined>(
    () => (raw ? parseProgress(raw)[slug] : undefined),
    [raw, slug]
  );

  const completed = useMemo(() => progress?.completed ?? [], [progress]);

  const toggleComplete = useCallback(
    (lessonId: string, complete: boolean) => {
      setLessonComplete(slug, lessonId, complete);
    },
    [slug]
  );

  const isComplete = useCallback(
    (lessonId: string) => completed.includes(lessonId),
    [completed]
  );

  return {
    progress,
    completed,
    lastLessonId: progress?.lastLessonId,
    toggleComplete,
    isComplete,
  };
}
