"use client";

import { CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useCollectionProgress } from "@/hooks/use-collection-progress";
import type { Lesson } from "@/data/types";
import { formatDuration, isLessonPlayable } from "@/lib/collections";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Clickable lesson rows with completion styling driven by local progress.
 * Used on the collection page and inside the lesson sidebar/drawer.
 */
export function LessonList({
  slug,
  lessons,
  currentLessonId,
}: {
  slug: string;
  lessons: Pick<Lesson, "id" | "title" | "duration" | "youtubeId" | "status">[];
  currentLessonId?: string;
}) {
  const { completed } = useCollectionProgress(slug);

  return (
    <ol className="flex flex-col gap-1">
      {lessons.map((lesson, index) => {
        const isCurrent = lesson.id === currentLessonId;
        const isDone = completed?.includes(lesson.id) ?? false;
        const playable = isLessonPlayable(lesson);

        return (
          <li key={lesson.id}>
            <Link
              href={`/library/${slug}/${lesson.id}`}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isCurrent
                  ? "bg-primary/10 font-medium text-primary"
                  : "hover:bg-muted",
                !playable && "opacity-90"
              )}
            >
              <span
                className={cn(
                  "w-6 shrink-0 text-right text-xs tabular-nums",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 truncate">{lesson.title}</span>
              {!playable ? (
                <Badge variant="secondary" className="shrink-0 text-xs">
                  Coming soon
                </Badge>
              ) : null}
              {isDone ? (
                <CheckCircle2
                  className="size-4 shrink-0 text-primary"
                  aria-label="Completed"
                />
              ) : (
                <PlayCircle
                  className="size-4 shrink-0 text-muted-foreground/50"
                  aria-hidden
                />
              )}
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {formatDuration(lesson.duration)}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
