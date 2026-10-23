"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCollectionProgress } from "@/hooks/use-collection-progress";
import { Button } from "@/components/ui/button";

type LessonRef = { id: string; title: string; playable: boolean };

/**
 * Start / continue CTAs. Server render shows "Start learning" only; after
 * hydration, lastLessonId from localStorage may reveal Continue.
 */
export function CollectionStartActions({
  slug,
  lessons,
}: {
  slug: string;
  lessons: LessonRef[];
}) {
  const { lastLessonId } = useCollectionProgress(slug);
  const playableLessons = lessons.filter((l) => l.playable);
  const firstPlayable = playableLessons[0];

  const continueLesson =
    lastLessonId &&
    playableLessons.find((l) => l.id === lastLessonId);

  if (!firstPlayable) {
    return (
      <p className="text-sm text-muted-foreground">
        Lessons are on the way — check back soon.
      </p>
    );
  }

  if (continueLesson && continueLesson.id !== firstPlayable.id) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button size="lg" asChild>
          <Link href={`/library/${slug}/${continueLesson.id}`}>
            Continue: {continueLesson.title}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href={`/library/${slug}/${firstPlayable.id}`}>
            <RotateCcw data-icon="inline-start" />
            Start from beginning
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Button size="lg" asChild>
      <Link href={`/library/${slug}/${firstPlayable.id}`}>
        Start Learning
        <ArrowRight data-icon="inline-end" />
      </Link>
    </Button>
  );
}
