import type { Collection } from "./types";

/**
 * Tutor library content. Replace youtubeId values with your own clips after
 * uploading to YouTube. Use /create to generate new collection snippets.
 */
export const collections: Collection[] = [
  {
    id: "getting-started",
    slug: "getting-started",
    title: "Getting Started on This Site",
    category: "Other",
    description:
      "How this library works and where to put your first tutor clip.",
    longDescription:
      "A short orientation for learners and for you as the tutor. Swap the placeholder video IDs below with your own YouTube uploads when they are ready.",
    featured: true,
    lessons: [
      {
        id: "welcome",
        title: "Welcome — how to use this library",
        youtubeId: "dQw4w9WgXcQ",
        duration: 212,
        description:
          "Placeholder video — replace youtubeId in data/collections.ts with your welcome clip.",
        about:
          "When you publish on YouTube, copy the 11-character video ID from the URL and paste it here. Learners will see the embed on the lesson page.",
      },
      {
        id: "adding-your-clips",
        title: "Adding your own lesson clips",
        youtubeId: "dQw4w9WgXcQ",
        duration: 180,
        description:
          "Use /create to draft a collection or import a playlist, then paste the code into collections.ts.",
      },
    ],
  },
  {
    id: "sample-course",
    slug: "sample-course",
    title: "Sample Course (replace me)",
    category: "Academic",
    description:
      "Template for a real subject — rename, reorder lessons, and drop in your IDs.",
    featured: true,
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1 — your topic here",
        youtubeId: "dQw4w9WgXcQ",
        duration: 600,
        description: "First lesson in the series. Update title and youtubeId.",
      },
      {
        id: "lesson-2",
        title: "Lesson 2 — next step",
        youtubeId: "dQw4w9WgXcQ",
        duration: 540,
        description: "Second lesson. Add resources[] if you share PDFs or links.",
      },
    ],
    resources: [
      {
        label: "Example worksheet (replace URL)",
        url: "https://example.com",
        type: "link",
      },
    ],
  },
];
