import { BookOpen, Code2, Camera, ChefHat, Languages, Music, PiggyBank, Dumbbell, FlaskConical, Laptop, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About This Project",
  description:
    "This website is my personal learning library — videos and resources about things I learn and want to share.",
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
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        About This Project
      </h1>

      <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
        <p>This website is my personal learning library.</p>
        <p>
          I use it to organize videos and resources about things I learn and
          want to share with friends, family, and anyone else who might find
          them useful.
        </p>
        <p>
          The topics can be anything — from school subjects and technology to
          cooking, photography, languages, hobbies, or personal projects.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Sparkles className="size-5 text-primary" aria-hidden />
          Topics I&rsquo;m interested in
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
          Want to explore?
        </h2>
        <p className="mt-2 mb-5 text-sm text-muted-foreground">
          Everything here is free to browse and watch — no accounts, no
          tracking, just lessons.
        </p>
        <Button asChild>
          <Link href="/library">Open the Library</Link>
        </Button>
      </div>
    </div>
  );
}
