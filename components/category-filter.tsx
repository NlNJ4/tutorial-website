"use client";

import { cn } from "@/lib/utils";

export function CategoryFilter({
  categories,
  active,
  onChange,
  className,
}: {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
  className?: string;
}) {
  const options = ["All", ...categories];

  return (
    <div
      role="group"
      aria-label="Filter by category"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {options.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
