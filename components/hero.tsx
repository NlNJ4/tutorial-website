import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Soft accent glow — subtle, not a heavy gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 max-w-2xl rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 md:py-32">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
          {site.shortDescription}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/library">
              Explore Library
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">About This Project</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
