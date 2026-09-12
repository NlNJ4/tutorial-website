"use client";

import { useCallback, useEffect, useState } from "react";
import type { CollectionProgress } from "@/lib/progress";
import { getCollectionProgress, setLessonComplete } from "@/lib/progress";

const EMPTY: CollectionProgress = { completed: [] };

/**
 * Hydration-safe read of a collection's local progress. Returns null until
 * mounted so server and first client render agree.
 */
export function useCollectionProgress(slug: string) {
  const [progress, setProgress] = useState<CollectionProgress | null>(null);

  useEffect(() => {
    setProgress(getCollectionProgress(slug));
  }, [slug]);

  const toggleComplete = useCallback(
    (lessonId: string, complete: boolean) => {
      setLessonComplete(slug, lessonId, complete);
      setProgress(getCollectionProgress(slug));
    },
    [slug]
  );

  return {
    progress,
    completed: progress?.completed ?? EMPTY.completed,
    lastLessonId: progress?.lastLessonId,
    toggleComplete,
    isComplete: (lessonId: string) =>
      (progress ?? EMPTY).completed.includes(lessonId),
  };
}
