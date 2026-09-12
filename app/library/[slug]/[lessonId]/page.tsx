import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonActions } from "@/components/lesson-actions";
import {
  LessonDesktopSidebar,
  LessonMobileNav,
} from "@/components/lesson-sidebar";
import { ResourceCard } from "@/components/resource-card";
import { YouTubePlayer } from "@/components/youtube-player";
import { Button } from "@/components/ui/button";
import {
  getAllCollections,
  getAdjacentLessons,
  getCollectionBySlug,
  getLesson,
} from "@/lib/collections";

export function generateStaticParams() {
  return getAllCollections().flatMap((c) =>
    c.lessons.map((l) => ({ slug: c.slug, lessonId: l.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: PageProps<"/library/[slug]/[lessonId]">["params"];
}): Promise<Metadata> {
  const { slug, lessonId } = await params;
  const collection = getCollectionBySlug(slug);
  const lesson = collection && getLesson(collection, lessonId);
  if (!collection || !lesson) return { title: "Not Found" };
  return {
    title: `${lesson.title} — ${collection.title}`,
    description: lesson.description,
  };
}

export default async function LessonPage({
  params,
}: PageProps<"/library/[slug]/[lessonId]">) {
  const { slug, lessonId } = await params;
  const collection = getCollectionBySlug(slug);
  const lesson = collection && getLesson(collection, lessonId);
  if (!collection || !lesson) notFound();

  const lessonIndex = collection.lessons.findIndex((l) => l.id === lessonId);
  const { prev, next } = getAdjacentLessons(collection, lessonId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href={`/library/${collection.slug}`}
          className="transition-colors hover:text-foreground"
        >
          {collection.title}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">
          Lesson {lessonIndex + 1}
        </span>
      </nav>

      {/* Mobile lesson drawer */}
      <div className="mb-4">
        <LessonMobileNav
          slug={collection.slug}
          collectionTitle={collection.title}
          lessons={collection.lessons}
          currentLessonId={lesson.id}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main content */}
        <article className="min-w-0">
          <YouTubePlayer youtubeId={lesson.youtubeId} title={lesson.title} />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {lesson.title}
              </h1>
              <p className="mt-2 text-muted-foreground">{lesson.description}</p>
            </div>
            <LessonActions slug={collection.slug} lessonId={lesson.id} />
          </div>

          {lesson.about && (
            <section className="mt-8">
              <h2 className="mb-3 text-lg font-semibold tracking-tight">
                About This Lesson
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {lesson.about}
              </p>
            </section>
          )}

          {lesson.resources && lesson.resources.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 text-lg font-semibold tracking-tight">
                Resources
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {lesson.resources.map((resource) => (
                  <ResourceCard key={resource.url} {...resource} />
                ))}
              </div>
            </section>
          )}

          {/* Previous / Next */}
          <nav
            aria-label="Lesson navigation"
            className="mt-10 grid grid-cols-2 gap-3 border-t pt-6"
          >
            {prev ? (
              <Button variant="outline" className="h-auto justify-start py-3 text-left" asChild>
                <Link href={`/library/${collection.slug}/${prev.id}`}>
                  <span className="flex flex-col items-start gap-0.5">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="size-3.5" aria-hidden />
                      Previous Lesson
                    </span>
                    <span className="text-sm font-medium">{prev.title}</span>
                  </span>
                </Link>
              </Button>
            ) : (
              <span aria-hidden />
            )}
            {next && (
              <Button
                variant="outline"
                className="h-auto justify-end py-3 text-right"
                asChild
              >
                <Link href={`/library/${collection.slug}/${next.id}`}>
                  <span className="flex flex-col items-end gap-0.5">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      Next Lesson
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-sm font-medium">{next.title}</span>
                  </span>
                </Link>
              </Button>
            )}
          </nav>
        </article>

        {/* Desktop sidebar */}
        <LessonDesktopSidebar
          slug={collection.slug}
          collectionTitle={collection.title}
          lessons={collection.lessons}
          currentLessonId={lesson.id}
        />
      </div>
    </div>
  );
}
