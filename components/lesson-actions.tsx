"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useCollectionProgress } from "@/hooks/use-collection-progress";
import { markLessonOpened } from "@/lib/progress";
import { Button } from "@/components/ui/button";

/**
 * Records that this lesson was opened (for "continue where you left off")
 * and provides the lightweight mark-as-complete toggle.
 */
export function LessonActions({
  slug,
  lessonId,
}: {
  slug: string;
  lessonId: string;
}) {
  const { isComplete, toggleComplete } = useCollectionProgress(slug);
  const done = isComplete(lessonId);

  useEffect(() => {
    markLessonOpened(slug, lessonId);
  }, [slug, lessonId]);

  return (
    <Button
      variant={done ? "secondary" : "outline"}
      size="sm"
      onClick={() => toggleComplete(lessonId, !done)}
      aria-pressed={done}
    >
      <CheckCircle2 data-icon="inline-start" />
      {done ? "Completed" : "Mark as Completed"}
    </Button>
  );
}
