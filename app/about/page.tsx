import {
  BookOpen,
  Camera,
  ChefHat,
  Code2,
  Dumbbell,
  FlaskConical,
  Languages,
  Laptop,
  Music,
  PiggyBank,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.shortDescription,
};

const interests = [
  { label: "School subjects", icon: BookOpen },
  { label: "Technology", icon: Laptop },
  { label: "Cooking", icon: ChefHat },
  { label: "Photography", icon: Camera },
  { label: "Languages", icon: Languages },
  { label: "Music", icon: Music },
  { label: "Finance", icon: PiggyBank },
  { label: "Fitness", icon: Dumbbell },
  { label: "Science", icon: FlaskConical },
  { label: "Personal projects", icon: Code2 },
];

export default function AboutPage() {
  const hasChannel = site.youtubeChannelUrl.trim().length > 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        About {site.siteName}
      </h1>

      <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
        <p>
          This site is my tutor library — short lesson clips hosted on YouTube,
          organized into courses so learners can follow a path instead of
          scrolling a channel.
        </p>
        <p>{site.creatorNote}</p>
        <p>
          New clips go on YouTube first; I add them here with titles, order,
          notes, and any worksheets or links learners need beside the video.
        </p>
      </div>

      {hasChannel && (
        <div className="mt-10">
          <Button asChild variant="outline">
            <a
              href={site.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink data-icon="inline-start" />
              Watch on YouTube
            </a>
          </Button>
        </div>
      )}

      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Sparkles className="size-5 text-primary" aria-hidden />
          Topics I teach
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {interests.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
            >
              <Icon className="size-3.5 text-primary" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-14 rounded-xl border bg-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight">
          Ready to watch?
        </h2>
        <p className="mt-2 mb-5 text-sm text-muted-foreground">
          Browse courses, pick a lesson, and mark progress on your device — no
          sign-in required.
        </p>
        <Button asChild>
          <Link href="/library">Open the Library</Link>
        </Button>
      </div>
    </div>
  );
}
