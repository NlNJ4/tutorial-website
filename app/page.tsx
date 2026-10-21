import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { CollectionCard } from "@/components/collection-card";
import { Hero } from "@/components/hero";
import { site } from "@/data/site";
import { getFeaturedCollections, getUsedCategories } from "@/lib/collections";

export default function HomePage() {
  const featured = getFeaturedCollections();
  const topics = getUsedCategories();

  return (
    <div>
      <Hero />

      {/* Featured Collections */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Collections
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Courses and lesson series to start with.
            </p>
          </div>
          <Link
            href="/library"
            className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
          >
            View all
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((collection, index) => (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              priority={index < 3}
            />
          ))}
        </div>
      </section>

      {/* Browse by Topic */}
      <section className="border-t bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Browse by Topic
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Whatever you feel like learning today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Link
                key={topic}
                href={`/library?category=${encodeURIComponent(topic)}`}
                className="rounded-full border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-sm"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personal note */}
      <section className="border-t">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
          <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Heart className="size-4" aria-hidden />
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Lessons I teach, in one place.
          </h2>
          <p className="text-muted-foreground">{site.creatorNote}</p>
        </div>
      </section>
    </div>
  );
}
