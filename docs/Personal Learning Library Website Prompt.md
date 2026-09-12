Build a modern, clean, responsive website called **Learnly**.

The website is a personal learning library where one creator can organize educational YouTube videos into simple courses or collections and share them with family, friends, or anyone through a public link.

This is NOT a marketplace, NOT a complex LMS, and does NOT need quizzes, assignments, certificates, payments, student submissions, or advanced analytics.

The goal is simplicity:
- Upload videos to YouTube
- Add the YouTube links to the website
- Organize videos into courses or learning collections
- Add descriptions and optional resources
- Share the website with other people
- Let viewers browse and watch everything directly inside the website

The website must support ANY subject, not only programming. Example topics can include:
- Mathematics
- Languages
- Cooking
- Photography
- Finance
- Music
- Fitness
- Science
- Technology
- School subjects
- Hobbies
- Personal guides
- Anything the creator wants to teach

## Overall Style

Create a warm, modern, personal learning experience.

The design should feel like a mix of:
- Notion
- YouTube
- a personal blog
- a lightweight course platform

Avoid making it look like Udemy or a corporate education platform.

Use:
- lots of whitespace
- rounded cards
- subtle shadows
- clean typography
- soft neutral colors
- one strong accent color
- minimal animations
- responsive mobile design

The website should feel friendly, calm, and easy to browse.

## Main Navigation

Navbar:

Logo / Learnly

Home
Library
About

Search icon

Optional:
Dark mode toggle

No login button is required for the first version.

## Home Page

Create a hero section.

Headline:

**Learn something worth knowing.**

Subheadline:

A small collection of videos, guides, and lessons made to explain things simply.

Buttons:

[ Explore Library ]
[ About This Project ]

Below the hero, show a section called:

**Featured Collections**

Display 3–6 collection cards.

Example cards:

Photography Basics  
Learn camera settings, composition, and lighting.  
6 lessons

Basic Calculus  
Simple explanations of limits, derivatives, and integration.  
8 lessons

English Grammar  
Practical grammar lessons with simple examples.  
12 lessons

Cooking at Home  
Easy recipes and basic cooking techniques.  
5 lessons

Each card should include:
- thumbnail
- title
- short description
- number of lessons
- category or tag
- View Collection button

Add another section:

**Browse by Topic**

Use simple category chips or cards such as:

Academic
Creative
Language
Technology
Health
Finance
Cooking
Music
Lifestyle
Other

Add a small personal section near the bottom:

**Made to share what I learn.**

Text:
I created this website as a place to organize things I’ve learned and explain them in a simple way for friends, family, and anyone who finds them useful.

## Library Page

Create a full library page.

Title:

**Learning Library**

Subtitle:

Explore everything available to learn.

At the top include:
- search bar
- category filters
- optional sorting dropdown

Search placeholder:

Search anything...

Categories should be flexible and not hard-coded only for programming.

Example filters:
All
Academic
Creative
Language
Technology
Health
Lifestyle
Other

Display collections in a responsive card grid.

Each collection card includes:
- thumbnail
- category badge
- title
- short description
- lesson count
- optional total duration
- Open Collection button

Example:

Photography Basics
Creative
6 lessons
Learn the fundamentals of photography.

Japanese for Travel
Language
10 lessons
Useful phrases and basics for traveling in Japan.

Personal Finance Basics
Finance
7 lessons
Simple explanations about saving, budgeting, and money.

## Collection Detail Page

URL example:

/library/basic-calculus

Design a clean collection overview page.

Top section:

Thumbnail / cover image

Title:
Basic Calculus

Category:
Academic

Description:
A simple introduction to calculus covering limits, derivatives, and integration.

Information:
8 lessons
2h 35m total

Button:
[ Start Learning ]

Below, create a lesson list.

Example:

Course Content

01 Introduction to Calculus
8:20

02 Understanding Limits
12:30

03 Derivatives
15:40

04 Chain Rule
11:25

05 Integration
16:50

Each lesson row should be clickable.

Show completed styling only if local progress exists, but completion tracking is optional.

Add an optional section:

**Resources**

Examples:
PDF notes
Google Drive link
GitHub repository
Reference article
Slides

## Lesson Page

This is the most important page.

Desktop layout:

Large content area on the left
Course lesson navigation/sidebar on the right

At the top:

Basic Calculus / Lesson 2

Main YouTube player.

Embed YouTube directly inside the website.

Example embed format:

https://www.youtube.com/embed/VIDEO_ID

Do not redirect users to YouTube by default.

Below video:

Lesson title

**Understanding Limits**

Lesson description:

In this lesson, we explore what a limit means and why it is important in calculus.

Add optional sections:

### About This Lesson

Short explanation or notes.

### Resources

Use clean resource cards.

Examples:

Download Notes
Open Slides
Useful Website
View Source Code

At the bottom:

[ ← Previous Lesson ]

[ Next Lesson → ]

On desktop, show a right sidebar:

Collection Content

1. Introduction to Calculus
2. Understanding Limits
3. Derivatives
4. Chain Rule
5. Integration

Highlight the currently selected lesson.

On mobile, collapse the lesson list into a dropdown or drawer.

## About Page

Create a simple personal About page.

Headline:

**About This Project**

Text:

This website is my personal learning library.

I use it to organize videos and resources about things I learn and want to share with friends, family, and anyone else who might find them useful.

The topics can be anything — from school subjects and technology to cooking, photography, languages, hobbies, or personal projects.

Keep this page personal and friendly.

Optional section:

**Topics I’m interested in**

Use simple tags or cards.

## Data Structure

For the first version, do NOT require a database.

Store course data in TypeScript or JSON.

Example:

```ts
export const collections = [
  {
    id: "basic-calculus",
    slug: "basic-calculus",
    title: "Basic Calculus",
    category: "Academic",
    description: "Learn the basics of calculus in a simple way.",
    thumbnail: "/images/calculus.jpg",
    lessons: [
      {
        id: "introduction",
        title: "Introduction to Calculus",
        youtubeId: "VIDEO_ID",
        duration: "8:20",
        description: "An introduction to calculus."
      },
      {
        id: "limits",
        title: "Understanding Limits",
        youtubeId: "VIDEO_ID",
        duration: "12:30",
        description: "Learn how limits work."
      }
    ]
  }
]
```

Generate pages dynamically using the collection slug and lesson ID.

## Optional Local Progress

If easy to implement, use localStorage to remember:
- last opened lesson
- completed lessons

No account or authentication is required.

Example:

Basic Calculus
3 / 8 lessons viewed

However, progress tracking should remain very lightweight.

## Optional Creator Page

If adding a creator tool, keep it extremely simple.

Route:

/create

The creator can enter:

Collection title
Description
Category
Thumbnail
Lesson title
YouTube URL
Lesson description

Button:

+ Add Lesson

Then:

Publish

For the first implementation, this page may simply generate or update local JSON/mock data instead of requiring a full backend.

Do not build a complex admin dashboard.

## Important Restrictions

Do NOT add:
- quizzes
- homework
- assignment submission
- certificates
- payment
- marketplace features
- tutor booking
- live classes
- discussion forums
- AI tutor
- complicated student dashboards
- gamification
- leaderboards

Keep the project focused on:

**Upload elsewhere → organize → watch → learn → share.**

## Technology

Use:

Next.js
TypeScript
Tailwind CSS
shadcn/ui

Recommended structure:

app/
  page.tsx
  library/
    page.tsx
    [slug]/
      page.tsx
      [lesson]/
        page.tsx
  about/
    page.tsx

components/
  Navbar
  Hero
  CollectionCard
  CategoryFilter
  YouTubePlayer
  LessonSidebar
  ResourceCard
  Footer

data/
  collections.ts

## Responsive Design

Desktop:
- spacious card grid
- lesson sidebar
- large video player

Tablet:
- 2-column collection grid

Mobile:
- 1-column grid
- compact navigation
- video full width
- lesson sidebar becomes drawer/dropdown

## Visual Direction

Use a light background with dark text.

Suggested colors:

Background:
#FAFAFA

Cards:
#FFFFFF

Primary text:
#18181B

Secondary text:
#71717A

Accent:
#6366F1

Border:
#E4E4E7

Border radius:
12–16px

Use an elegant font such as Inter, Geist, or similar.

Images should be large and visually attractive.

Avoid excessive gradients and excessive glassmorphism.

The final website should look polished enough to be used as a real personal website, but simple enough that one person can maintain it easily.

The core philosophy is:

**A personal place to organize what I know and share it with people I care about.**