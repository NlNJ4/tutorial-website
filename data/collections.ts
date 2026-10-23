import type { Collection } from "./types";

/**
 * Tutor library content. Use /create to draft collections, then paste into this file.
 */
export const collections: Collection[] = [
  {
    id: "essence-of-calculus",
    slug: "essence-of-calculus",
    title: "Essence of Calculus",
    category: "Academic",
    status: "published",
    description: "A visual introduction to calculus from 3Blue1Brown.",
    longDescription:
      "Grant Sanderson builds intuition for derivatives, integrals, and the fundamental theorem of calculus with animated visuals.",
    featured: true,
    lessons: [
      {
        id: "the-essence-of-calculus",
        title: "The essence of calculus",
        youtubeId: "WUvTyaaNkzM",
        duration: 1024,
        description:
          "A visual overview of derivatives, integrals, and why they are inverse operations.",
      },
    ],
  },
  {
    id: "getting-started",
    slug: "getting-started",
    title: "Getting Started on This Site",
    category: "Other",
    status: "published",
    description:
      "How this library works and how to follow lessons in order.",
    longDescription:
      "A short orientation before you dive into subject courses. The welcome video will appear here once it is uploaded.",
    featured: true,
    lessons: [
      {
        id: "welcome",
        title: "Welcome — how to use this library",
        status: "coming-soon",
        duration: 0,
        description:
          "A quick tour of courses, progress tracking, and lesson materials.",
        about:
          "This clip will be added when the welcome video is on YouTube. Until then, read the notes below and open the next lesson when it is ready.",
      },
      {
        id: "how-lessons-work",
        title: "How lessons and materials work",
        status: "coming-soon",
        duration: 0,
        description:
          "What to expect beside each video: notes, timestamps, and downloads.",
      },
    ],
  },
  {
    id: "sample-course",
    slug: "sample-course",
    title: "Sample Course (draft)",
    category: "Academic",
    status: "draft",
    description: "Work in progress — not visible in the library until published.",
    featured: false,
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1 — draft outline",
        status: "coming-soon",
        duration: 0,
        description: "Prepare titles and order here before publishing the course.",
      },
    ],
  },
];
