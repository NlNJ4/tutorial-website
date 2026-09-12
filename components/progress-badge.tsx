"use client";

import { CheckCircle2 } from "lucide-react";
import { useCollectionProgress } from "@/hooks/use-collection-progress";
import { cn } from "@/lib/utils";

export function ProgressBadge({
  slug,
  total,
  className,
}: {
  slug: string;
  total: number;
  className?: string;
}) {
  const { completed } = useCollectionProgress(slug);
  if (!completed || completed.length === 0) return null;

  const done = Math.min(completed.length, total);
  const all = done === total;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        all ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      <CheckCircle2 className="size-3.5" aria-hidden />
      {done}/{total} lessons viewed
    </span>
  );
}
