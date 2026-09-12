import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-32 text-center sm:px-6">
      <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Compass className="size-5" aria-hidden />
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">
        This page wandered off
      </h1>
      <p className="text-muted-foreground">
        The collection or lesson you&rsquo;re looking for doesn&rsquo;t exist —
        but the library has plenty more to explore.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/library">
            <ArrowLeft data-icon="inline-start" />
            Back to the Library
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
