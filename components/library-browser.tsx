"use client";

import { Search, SearchX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { CollectionCard } from "@/components/collection-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Collection } from "@/data/types";
import { getUsedCategories, searchCollections } from "@/lib/collections";

const sortOptions = [
  { value: "curated", label: "Curated order" },
  { value: "title", label: "Title A–Z" },
  { value: "lessons", label: "Most lessons" },
  { value: "duration", label: "Longest" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

export function LibraryBrowser({
  collections,
  initialCategory = "All",
}: {
  collections: Collection[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortValue>("curated");
  const searchRef = useRef<HTMLInputElement>(null);

  // Deep-link support: /library#search (navbar search icon) focuses the input.
  useEffect(() => {
    if (window.location.hash === "#search") {
      searchRef.current?.focus();
    }
  }, []);

  const categories = useMemo(() => getUsedCategories(), []);

  const results = useMemo(() => {
    let list = searchCollections(query, collections);
    if (category !== "All") {
      list = list.filter((c) => c.category === category);
    }
    switch (sort) {
      case "title":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case "lessons":
        return [...list].sort((a, b) => b.lessons.length - a.lessons.length);
      case "duration":
        return [...list].sort(
          (a, b) =>
            b.lessons.reduce((s, l) => s + l.duration, 0) -
            a.lessons.reduce((s, l) => s + l.duration, 0)
        );
      default:
        return list;
    }
  }, [collections, query, category, sort]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="search"
            ref={searchRef}
            type="search"
            placeholder="Search anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 bg-card pl-9 text-base"
            aria-label="Search the library"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={setCategory}
          />
          <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
            <SelectTrigger className="h-9 w-full bg-card sm:w-44" aria-label="Sort collections">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground" role="status">
        {results.length} {results.length === 1 ? "collection" : "collections"}
        {category !== "All" && ` in ${category}`}
        {query.trim() && ` matching “${query.trim()}”`}
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((collection) => (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              ctaLabel="Open Collection"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
          <SearchX className="size-8 text-muted-foreground/60" aria-hidden />
          <p className="font-medium">No collections found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a different search term or category — or browse everything.
          </p>
        </div>
      )}
    </div>
  );
}
