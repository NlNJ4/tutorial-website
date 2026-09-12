import { ArrowRight, Clock, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProgressBadge } from "@/components/progress-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Collection } from "@/data/types";
import {
  collectionThumbnail,
  formatTotalDuration,
  lessonCount,
  totalDuration,
} from "@/lib/collections";

export function CollectionCard({
  collection,
  ctaLabel = "View Collection",
}: {
  collection: Collection;
  ctaLabel?: string;
}) {
  const count = lessonCount(collection);

  return (
    <Card className="group gap-0 py-0 transition-shadow hover:shadow-md">
      <Link
        href={`/library/${collection.slug}`}
        className="block overflow-hidden rounded-t-xl"
        tabIndex={-1}
        aria-hidden
      >
        <Image
          src={collectionThumbnail(collection)}
          alt=""
          width={480}
          height={270}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{collection.category}</Badge>
          <ProgressBadge slug={collection.slug} total={count} />
        </div>
        <div className="space-y-1.5">
          <Link href={`/library/${collection.slug}`}>
            <h3 className="font-heading text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
              {collection.title}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {collection.description}
          </p>
        </div>
        <p className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <PlayCircle className="size-3.5" aria-hidden />
            {count} {count === 1 ? "lesson" : "lessons"}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {formatTotalDuration(totalDuration(collection))}
          </span>
        </p>
        <Button variant="outline" size="sm" className="mt-auto w-fit" asChild>
          <Link href={`/library/${collection.slug}`}>
            {ctaLabel}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
