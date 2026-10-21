"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCollectionProgress } from "@/hooks/use-collection-progress";
import { Button } from "@/components/ui/button";

type LessonRef = { id: string; title: string };

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
  const first = lessons[0];
  const continueLesson =
    lastLessonId && lessons.find((l) => l.id === lastLessonId);

  if (!first) return null;

  if (continueLesson && continueLesson.id !== first.id) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button size="lg" asChild>
          <Link href={`/library/${slug}/${continueLesson.id}`}>
            Continue: {continueLesson.title}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href={`/library/${slug}/${first.id}`}>
            <RotateCcw data-icon="inline-start" />
            Start from beginning
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Button size="lg" asChild>
      <Link href={`/library/${slug}/${first.id}`}>
        Start Learning
        <ArrowRight data-icon="inline-end" />
      </Link>
    </Button>
  );
}
