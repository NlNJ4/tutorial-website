import type { Metadata } from "next";
import { LibraryBrowser } from "@/components/library-browser";
import { getPublishedCollections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Learning Library",
  description: "Explore everything available to learn.",
};

export default async function LibraryPage({
  searchParams,
}: PageProps<"/library">) {
  const { category } = await searchParams;
  const initialCategory =
    typeof category === "string" && category ? category : "All";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Learning Library
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore everything available to learn.
        </p>
      </div>
      <LibraryBrowser
        collections={getPublishedCollections()}
        initialCategory={initialCategory}
      />
    </div>
  );
}
