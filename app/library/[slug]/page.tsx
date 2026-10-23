import { ArrowLeft, Clock, PlayCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionStartActions } from "@/components/collection-start-actions";
import { LessonList } from "@/components/lesson-list";
import { ResourceCard } from "@/components/resource-card";
import { Badge } from "@/components/ui/badge";
import {
  getPublishedCollections,
  getPublishedCollectionBySlug,
  collectionThumbnail,
  formatTotalDuration,
  isLessonPlayable,
  totalDuration,
} from "@/lib/collections";

export function generateStaticParams() {
  return getPublishedCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageProps<"/library/[slug]">["params"];
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getPublishedCollectionBySlug(slug);
  if (!collection) return { title: "Not Found" };
  return {
    title: collection.title,
    description: collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: [{ url: collectionThumbnail(collection) }],
    },
  };
}

export default async function CollectionPage({
  params,
}: PageProps<"/library/[slug]">) {
  const { slug } = await params;
  const collection = getPublishedCollectionBySlug(slug);
  if (!collection) notFound();

  const count = collection.lessons.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/library"
          className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Library
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate text-foreground">{collection.title}</span>
      </nav>

      {/* Header */}
      <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <Image
            src={collectionThumbnail(collection)}
            alt={`${collection.title} cover`}
            width={1280}
            height={720}
            priority
            className="aspect-video w-full object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <Badge variant="secondary">{collection.category}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {collection.title}
          </h1>
          <p className="text-muted-foreground">
            {collection.longDescription ?? collection.description}
          </p>
          <p className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <PlayCircle className="size-4" aria-hidden />
              {count} {count === 1 ? "lesson" : "lessons"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {formatTotalDuration(totalDuration(collection))} total
            </span>
          </p>
          <CollectionStartActions
            slug={collection.slug}
            lessons={collection.lessons.map((l) => ({
              id: l.id,
              title: l.title,
              playable: isLessonPlayable(l),
            }))}
          />
        </div>
      </div>

      {/* Course content */}
      <section className="mt-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Course Content
        </h2>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <LessonList slug={collection.slug} lessons={collection.lessons} />
        </div>
      </section>

      {/* Resources */}
      {collection.resources && collection.resources.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            Resources
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {collection.resources.map((resource) => (
              <ResourceCard key={resource.url} {...resource} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
