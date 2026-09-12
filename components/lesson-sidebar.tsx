"use client";

import { ListVideo } from "lucide-react";
import { LessonList } from "@/components/lesson-list";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Lesson } from "@/data/types";

type LessonNavProps = {
  slug: string;
  collectionTitle: string;
  lessons: Pick<Lesson, "id" | "title" | "duration">[];
  currentLessonId: string;
};

/** Sticky lesson navigation beside the video on desktop. */
export function LessonDesktopSidebar({
  slug,
  collectionTitle,
  lessons,
  currentLessonId,
}: LessonNavProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 rounded-xl border bg-card p-4">
        <h2 className="mb-1 px-3 pt-1 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Collection Content
        </h2>
        <p className="mb-3 truncate px-3 text-xs text-muted-foreground">
          {collectionTitle}
        </p>
        <LessonList
          slug={slug}
          lessons={lessons}
          currentLessonId={currentLessonId}
        />
      </div>
    </aside>
  );
}

/** Full-width trigger that opens the lesson list as a drawer on mobile. */
export function LessonMobileNav({
  slug,
  collectionTitle,
  lessons,
  currentLessonId,
}: LessonNavProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <ListVideo data-icon="inline-start" />
            Collection Content
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-base">{collectionTitle}</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">
            <LessonList
              slug={slug}
              lessons={lessons}
              currentLessonId={currentLessonId}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
