"use client";

import {
  Check,
  ClipboardCopy,
  Download,
  Plus,
  Trash2,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, slugifyTitle } from "@/lib/collections";

interface LessonDraft {
  key: number;
  title: string;
  youtubeUrl: string;
  duration: string;
  description: string;
}

let nextKey = 1;
const emptyLesson = (): LessonDraft => ({
  key: nextKey++,
  title: "",
  youtubeUrl: "",
  duration: "",
  description: "",
});

/** Extract a video ID from most YouTube URL shapes (or a bare ID). */
function parseYouTubeId(input: string): string | null {
  const value = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/(?:embed|shorts|live)\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/** "8:20" -> 500, "1:02:05" -> 3725; bare seconds also accepted. */
function parseDuration(input: string): number | null {
  const value = input.trim();
  if (!value) return null;
  if (!/^\d{1,2}(:\d{1,2}){0,2}$/.test(value)) return null;
  const parts = value.split(":").map(Number);
  if (parts.some((p) => p > 59)) return null;
  return parts.reduce((sum, p) => sum * 60 + p, 0);
}

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("Other");
  const [thumbnail, setThumbnail] = useState("");
  const [lessons, setLessons] = useState<LessonDraft[]>([emptyLesson()]);
  const [generated, setGenerated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [playlistError, setPlaylistError] = useState<string | null>(null);

  const slug = useMemo(() => slugifyTitle(title) || "my-collection", [title]);

  function updateLesson(key: number, patch: Partial<LessonDraft>) {
    setLessons((list) =>
      list.map((l) => (l.key === key ? { ...l, ...patch } : l))
    );
  }

  function removeLesson(key: number) {
    setLessons((list) =>
      list.length > 1 ? list.filter((l) => l.key !== key) : list
    );
  }

  function publish() {
    setError(null);
    setCopied(false);

    if (!title.trim()) return setError("Please give your collection a title.");
    if (!description.trim())
      return setError("Please add a short description.");
    if (!lessons[0]?.youtubeUrl.trim() || !lessons[0]?.title.trim())
      return setError(
        "The first lesson needs a title and a YouTube link at minimum."
      );

    const parsed = lessons.map((lesson) => {
      const id = lesson.youtubeUrl.trim() ? parseYouTubeId(lesson.youtubeUrl) : null;
      return { lesson, id, duration: parseDuration(lesson.duration) };
    });
    if (parsed.some((p) => p.lesson.youtubeUrl.trim() && !p.id))
      return setError("One of the YouTube links could not be read — paste the full URL, e.g. https://www.youtube.com/watch?v=…");
    if (parsed.some((p) => p.lesson.duration.trim() && p.duration === null))
      return setError("Durations should look like 8:20 or 1:02:05.");

    const lines: string[] = [];
    lines.push("  {");
    lines.push(`    id: "${slug}",`);
    lines.push(`    slug: "${slug}",`);
    lines.push(`    title: ${JSON.stringify(title.trim())},`);
    lines.push(`    category: "${category}",`);
    lines.push(`    description: ${JSON.stringify(description.trim())},`);
    if (thumbnail.trim()) lines.push(`    thumbnail: ${JSON.stringify(thumbnail.trim())},`);
    lines.push("    lessons: [");
    parsed
      .filter((p) => p.lesson.title.trim() && p.id)
      .forEach(({ lesson, id, duration }, index) => {
        lines.push("      {");
        lines.push(`        id: ${JSON.stringify(slugifyTitle(lesson.title) || `lesson-${index + 1}`)},`);
        lines.push(`        title: ${JSON.stringify(lesson.title.trim())},`);
        lines.push(`        youtubeId: "${id}",`);
        lines.push(`        duration: ${duration ?? 0},`);
        lines.push(`        description: ${JSON.stringify(lesson.description.trim())},`);
        lines.push("      },");
      });
    lines.push("    ],");
    lines.push("  },");

    setGenerated(lines.join("\n"));
  }

  async function copyGenerated() {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadGenerated() {
    if (!generated) return;
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.ts.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function loadPlaylist() {
    setPlaylistError(null);
    if (!playlistUrl.trim()) {
      setPlaylistError("Paste a public YouTube playlist URL.");
      return;
    }

    const hasDraftContent = lessons.some(
      (l) => l.title.trim() || l.youtubeUrl.trim() || l.description.trim()
    );
    if (
      hasDraftContent &&
      !window.confirm(
        "Replace the current lesson rows with videos from this playlist?"
      )
    ) {
      return;
    }

    setPlaylistLoading(true);
    try {
      const res = await fetch(
        `/api/youtube-playlist?url=${encodeURIComponent(playlistUrl.trim())}`
      );
      const data = (await res.json()) as {
        entries?: { videoId: string; title: string }[];
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not load playlist.");
      }

      const entries = data.entries ?? [];
      if (entries.length === 0) {
        throw new Error("No videos found in this playlist.");
      }

      setLessons(
        entries.map((entry) => ({
          key: nextKey++,
          title: entry.title,
          youtubeUrl: `https://www.youtube.com/watch?v=${entry.videoId}`,
          duration: "",
          description: "",
        }))
      );
    } catch (err) {
      setPlaylistError(
        err instanceof Error ? err.message : "Could not load playlist."
      );
    } finally {
      setPlaylistLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Create a Collection
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fill in the details, import a public playlist if you like, then paste
          the generated code into{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            data/collections.ts
          </code>
          . Playlist import fills titles and links; add durations manually (RSS
          does not include length).
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Collection details */}
        <Card>
          <CardHeader>
            <CardTitle>Collection details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Basic Calculus"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Short description</Label>
              <Textarea
                id="description"
                placeholder="Simple explanations of limits, derivatives, and integration."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="thumbnail">
                Thumbnail URL{" "}
                <span className="font-normal text-muted-foreground">
                  (optional — defaults to the first lesson)
                </span>
              </Label>
              <Input
                id="thumbnail"
                placeholder="https://…"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              URL will be:{" "}
              <code className="rounded bg-muted px-1 py-0.5">/library/{slug}</code>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import from YouTube playlist</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="playlist-url">Playlist URL</Label>
              <Input
                id="playlist-url"
                placeholder="https://www.youtube.com/playlist?list=PL…"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
              />
            </div>
            {playlistError && (
              <p className="text-sm text-destructive" role="alert">
                {playlistError}
              </p>
            )}
            <Button
              type="button"
              variant="secondary"
              disabled={playlistLoading}
              onClick={() => void loadPlaylist()}
            >
              {playlistLoading ? "Loading…" : "Load playlist"}
            </Button>
          </CardContent>
        </Card>

        {/* Lessons */}
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {lessons.map((lesson, index) => (
              <div key={lesson.key}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between gap-2 pb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Lesson {index + 1}
                  </span>
                  {lessons.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove lesson ${index + 1}`}
                      onClick={() => removeLesson(lesson.key)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-[1fr_130px]">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`lesson-title-${lesson.key}`}>Title</Label>
                      <Input
                        id={`lesson-title-${lesson.key}`}
                        placeholder="Understanding Limits"
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(lesson.key, { title: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`lesson-duration-${lesson.key}`}>Length</Label>
                      <Input
                        id={`lesson-duration-${lesson.key}`}
                        placeholder="8:20"
                        value={lesson.duration}
                        onChange={(e) =>
                          updateLesson(lesson.key, { duration: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`lesson-url-${lesson.key}`}>YouTube URL</Label>
                    <Input
                      id={`lesson-url-${lesson.key}`}
                      placeholder="https://www.youtube.com/watch?v=…"
                      value={lesson.youtubeUrl}
                      onChange={(e) =>
                        updateLesson(lesson.key, { youtubeUrl: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`lesson-desc-${lesson.key}`}>
                      Description{" "}
                      <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id={`lesson-desc-${lesson.key}`}
                      placeholder="What this lesson covers."
                      value={lesson.description}
                      onChange={(e) =>
                        updateLesson(lesson.key, { description: e.target.value })
                      }
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => setLessons((list) => [...list, emptyLesson()])}
            >
              <Plus data-icon="inline-start" />
              Add Lesson
            </Button>
          </CardContent>
        </Card>

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button size="lg" onClick={publish} className="w-full sm:w-auto sm:self-start">
          <Wand2 data-icon="inline-start" />
          Publish
        </Button>

        {generated && (
          <Card>
            <CardHeader>
              <CardTitle>Your collection is ready 🎉</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Copy this into the{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">collections</code>{" "}
                array in{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">
                  data/collections.ts
                </code>{" "}
                — the site picks it up automatically.
              </p>
              <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
                <code>{generated}</code>
              </pre>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={copyGenerated}>
                  {copied ? (
                    <Check data-icon="inline-start" />
                  ) : (
                    <ClipboardCopy data-icon="inline-start" />
                  )}
                  {copied ? "Copied!" : "Copy Code"}
                </Button>
                <Button variant="outline" onClick={downloadGenerated}>
                  <Download data-icon="inline-start" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
