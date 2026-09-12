import type { Collection } from "./types";

/**
 * Seed data for the Learnly library. Every lesson points to a real YouTube
 * video. To add your own collection, add an entry here — the pages,
 * navigation, filters, and search all pick it up automatically.
 */
export const collections: Collection[] = [
  {
    id: "basic-calculus",
    slug: "basic-calculus",
    title: "Basic Calculus",
    category: "Academic",
    description: "Simple explanations of limits, derivatives, and integration.",
    longDescription:
      "A simple introduction to calculus covering limits, derivatives, and integration. Built on 3Blue1Brown's Essence of Calculus series — short visual lessons that make the big ideas feel intuitive before you ever touch a formula.",
    featured: true,
    lessons: [
      {
        id: "essence-of-calculus",
        title: "The Essence of Calculus",
        youtubeId: "WUvTyaaNkzM",
        duration: 1024,
        description:
          "An overview of what calculus is all about, and how the core ideas could have been discovered by anyone.",
        about:
          "This lesson sets up the whole series: derivatives, integrals, and the relationship between them, all through pictures rather than formulas.",
      },
      {
        id: "paradox-of-the-derivative",
        title: "The Paradox of the Derivative",
        youtubeId: "9vKqVkMQHKk",
        duration: 1010,
        description:
          "What a derivative really means, and why the instant-rate-of-change idea is subtler than it looks.",
      },
      {
        id: "derivative-formulas-through-geometry",
        title: "Derivative Formulas Through Geometry",
        youtubeId: "S0_qX4VJhMQ",
        duration: 1053,
        description:
          "Where the classic derivative rules come from, derived visually from simple geometric intuition.",
      },
      {
        id: "chain-rule-and-product-rule",
        title: "Visualizing the Chain Rule and Product Rule",
        youtubeId: "YG15m2VwSjA",
        duration: 956,
        description:
          "The chain rule and product rule explained with diagrams, so they stop feeling like memorized tricks.",
      },
      {
        id: "eulers-number",
        title: "What's So Special About Euler's Number e?",
        youtubeId: "m2MIpDrF7Es",
        duration: 830,
        description:
          "Why e appears everywhere in calculus, and what makes it the natural base for growth.",
      },
      {
        id: "implicit-differentiation",
        title: "Implicit Differentiation",
        youtubeId: "qb40J4N1fa4",
        duration: 933,
        description:
          "What's actually going on when you differentiate without solving for y first.",
      },
      {
        id: "limits-and-lhopital",
        title: "Limits, L'Hôpital's Rule, and Epsilon-Delta",
        youtubeId: "kfF40MiS7zA",
        duration: 1106,
        description:
          "A visual tour of limits, the formal epsilon-delta definition, and when L'Hôpital's rule applies.",
      },
      {
        id: "integration-and-ftc",
        title: "Integration and the Fundamental Theorem",
        youtubeId: "rfG8ce4nNh0",
        duration: 1246,
        description:
          "What integrals measure, and why area and slope turn out to be inverse operations.",
      },
    ],
    resources: [
      {
        label: "Series Page with Notes",
        url: "https://www.3blue1brown.com/topics/calculus",
        type: "article",
      },
      {
        label: "Khan Academy: Calculus 1",
        url: "https://www.khanacademy.org/math/calculus-1",
        type: "link",
      },
      {
        label: "Practice Problems (Paul's Notes)",
        url: "https://tutorial.math.lamar.edu/classes/calci/calci.aspx",
        type: "link",
      },
    ],
  },
  {
    id: "photography-basics",
    slug: "photography-basics",
    title: "Photography Basics",
    category: "Creative",
    description: "Learn camera settings, composition, and lighting.",
    longDescription:
      "Learn the fundamentals of photography — what aperture, shutter speed, and ISO actually do, how they work together, and how to compose shots that look intentional instead of accidental.",
    featured: true,
    lessons: [
      {
        id: "photography-basics-overview",
        title: "Photography Basics: Settings and Composition",
        youtubeId: "1vSQ0sCvwgE",
        duration: 1679,
        description:
          "A friendly walkthrough of shutter speed, aperture, ISO, and basic composition to get you off auto mode.",
      },
      {
        id: "exposure-explained",
        title: "ISO, Shutter Speed and Aperture Explained",
        youtubeId: "Edvpu_939l4",
        duration: 211,
        description:
          "A quick, clear explanation of the three settings that control every photo you take.",
      },
      {
        id: "aperture-and-f-stops",
        title: "Aperture and F-Stops Explained",
        youtubeId: "0yoz5tW3WPc",
        duration: 373,
        description:
          "What the f-numbers on your lens mean, and how aperture changes depth of field.",
      },
      {
        id: "shutter-speed-explained",
        title: "Shutter Speed Explained",
        youtubeId: "13eB3u9SnUs",
        duration: 970,
        description:
          "How shutter speed freezes or blurs motion, with practical examples for everyday shooting.",
      },
      {
        id: "master-the-exposure-triangle",
        title: "Master the Exposure Triangle",
        youtubeId: "4vuPrDdTzSY",
        duration: 956,
        description:
          "How shutter speed, ISO, and aperture work together — and how to balance them in real situations.",
      },
      {
        id: "composition-beyond-rule-of-thirds",
        title: "Composition: Better Than the Rule of Thirds",
        youtubeId: "1RjUnlSNNDY",
        duration: 633,
        description:
          "Composition techniques that go deeper than the rule of thirds, with clear visual examples.",
      },
    ],
    resources: [
      {
        label: "Photography Life: Beginner Guides",
        url: "https://photographylife.com/photography-basics",
        type: "article",
      },
    ],
  },
  {
    id: "english-grammar",
    slug: "english-grammar",
    title: "English Grammar",
    category: "Language",
    description: "Practical grammar lessons with simple examples.",
    longDescription:
      "Practical grammar lessons with simple examples — the building blocks of English, one small topic at a time, from verbs and nouns to articles and tenses.",
    featured: true,
    lessons: [
      {
        id: "be-verbs",
        title: "Be Verbs: Am, Is, Are",
        youtubeId: "5kjCcBsBzUs",
        duration: 186,
        description:
          "The most common verbs in English, and how to use am, is, and are correctly.",
      },
      {
        id: "introduction-to-nouns",
        title: "Introduction to Nouns",
        youtubeId: "8IogxPUrW7k",
        duration: 477,
        description:
          "What nouns are, the different kinds, and how to spot them in any sentence.",
      },
      {
        id: "present-simple-tense",
        title: "The Present Simple Tense",
        youtubeId: "47LEelX7nhg",
        duration: 626,
        description:
          "How to talk about routines and facts with the present simple, including the tricky third-person -s.",
      },
      {
        id: "auxiliary-verbs",
        title: "Auxiliary Verbs: Be, Do & Have",
        youtubeId: "A2ncygNMaFo",
        duration: 644,
        description:
          "Three little verbs that unlock questions, negatives, and perfect tenses.",
      },
      {
        id: "articles",
        title: "Articles: A, An, The & Zero Article",
        youtubeId: "2G4jyNIaBI4",
        duration: 1527,
        description:
          "When to use a, an, the — and when to use no article at all.",
      },
      {
        id: "talk-about-your-day",
        title: "Talk About Your Day in English",
        youtubeId: "3Mhoq1zfnYE",
        duration: 941,
        description:
          "Practice the present simple by describing a daily routine, step by step.",
      },
      {
        id: "tell-a-story",
        title: "Tell a Story in English",
        youtubeId: "0v3SLspaaf0",
        duration: 989,
        description:
          "Put grammar to work by telling a simple, complete story in English.",
      },
    ],
    resources: [
      {
        label: "Full Beginner Course (2h)",
        url: "https://www.youtube.com/watch?v=AVYfyTvc9KY",
        type: "video",
      },
      {
        label: "BBC Learning English: Grammar",
        url: "https://www.bbc.co.uk/learningenglish/english/grammar",
        type: "link",
      },
    ],
  },
  {
    id: "cooking-at-home",
    slug: "cooking-at-home",
    title: "Cooking at Home",
    category: "Cooking",
    description: "Easy recipes and basic cooking techniques.",
    longDescription:
      "Easy recipes and basic cooking techniques — knife skills, sautéing, dry vs. moist heat, and the small habits that make home food taste better.",
    featured: true,
    lessons: [
      {
        id: "basic-knife-skills",
        title: "Basic Knife Skills",
        youtubeId: "G-Fg7l7G1zw",
        duration: 394,
        description:
          "How to hold a knife, position your guide hand, and make clean, safe cuts.",
      },
      {
        id: "learn-to-cook-quickly",
        title: "Learn to Cook in Under 25 Minutes",
        youtubeId: "P6W8kwmwcno",
        duration: 1451,
        description:
          "A fast, practical introduction to cooking a real meal from scratch.",
      },
      {
        id: "cooking-methods",
        title: "Cooking 101: Dry, Moist, and Combo Techniques",
        youtubeId: "RS8ALWDlpis",
        duration: 80,
        description:
          "The three families of cooking methods and when to use each one.",
      },
      {
        id: "how-to-saute",
        title: "How to Sauté",
        youtubeId: "CTyV3JExDT8",
        duration: 121,
        description:
          "High heat, a little fat, and constant motion — the technique behind countless quick dishes.",
      },
      {
        id: "50-cooking-tips",
        title: "50 Cooking Tips from Gordon Ramsay",
        youtubeId: "BHcyuzXRqLs",
        duration: 1219,
        description:
          "A rapid-fire collection of professional habits for home kitchens.",
      },
      {
        id: "how-to-cook-like-a-pro",
        title: "How to Cook Like a Pro",
        youtubeId: "0fUdqo3PQPM",
        duration: 1047,
        description:
          "Core techniques and mindset shifts that level up everything you cook.",
      },
    ],
    resources: [
      {
        label: "Recipe Sites & Tools",
        url: "https://www.seriouseats.com/",
        type: "link",
      },
    ],
  },
  {
    id: "japanese-for-travel",
    slug: "japanese-for-travel",
    title: "Japanese for Travel",
    category: "Language",
    description: "Useful phrases and basics for traveling in Japan.",
    longDescription:
      "Useful phrases and basics for traveling in Japan — greetings, essential questions, restaurant language, and enough vocabulary to be a polite guest.",
    lessons: [
      {
        id: "greetings",
        title: "Japanese Greetings",
        youtubeId: "4e7WcxhCEjk",
        duration: 764,
        description:
          "Hello, goodbye, thank you — the greetings you'll use constantly, with pronunciation practice.",
      },
      {
        id: "travel-phrases-basics",
        title: "Japanese Phrases You Need for Traveling",
        youtubeId: "74aYs6rcbiM",
        duration: 499,
        description:
          "A friendly set of survival phrases for trains, hotels, and asking for help.",
      },
      {
        id: "top-30-travel-phrases",
        title: "Top 30 Japanese Travel Phrases",
        youtubeId: "6GMLXqMu8tc",
        duration: 786,
        description:
          "The 30 phrases that cover most tourist situations, with repetition to help them stick.",
      },
      {
        id: "restaurant-phrases",
        title: "Must-Know Phrases for Eating Out",
        youtubeId: "03-NQk__zNI",
        duration: 690,
        description:
          "Ordering, allergies, the bill, and what to say at restaurants in Japan.",
      },
      {
        id: "100-beginner-phrases",
        title: "100 Phrases Every Beginner Must-Know",
        youtubeId: "66P5_R37vek",
        duration: 1332,
        description:
          "A comprehensive phrase list for beginners — listen, repeat, and build a real base.",
      },
    ],
    resources: [
      {
        label: "jisho.org Dictionary",
        url: "https://jisho.org/",
        type: "link",
      },
    ],
  },
  {
    id: "personal-finance-basics",
    slug: "personal-finance-basics",
    title: "Personal Finance Basics",
    category: "Finance",
    description: "Simple explanations about saving, budgeting, and money.",
    longDescription:
      "Simple explanations about saving, budgeting, and money — the handful of concepts that quietly decide most of your financial life.",
    lessons: [
      {
        id: "financial-literacy-lessons",
        title: "5 Financial Literacy Lessons",
        youtubeId: "4wIXnPaooag",
        duration: 119,
        description:
          "Five ideas about money that most people wish they had learned in school.",
      },
      {
        id: "start-budgeting",
        title: "Start Budgeting with Little Money",
        youtubeId: "-bqeNE1DOzA",
        duration: 774,
        description:
          "You don't need a big income to budget — ten easy tips to get started.",
      },
      {
        id: "emergency-funds",
        title: "Emergency Funds for Beginners",
        youtubeId: "-B51IXRO_Jk",
        duration: 299,
        description:
          "What an emergency fund is for, how big it should be, and where to keep it.",
      },
      {
        id: "compound-interest",
        title: "How Does Compound Interest Work?",
        youtubeId: "2JxlNpspr2o",
        duration: 163,
        description:
          "The math behind why starting early matters more than starting big.",
      },
      {
        id: "index-funds",
        title: "Investing in Index Funds: A Step-by-Step Guide",
        youtubeId: "1h0fFwAVnek",
        duration: 686,
        description:
          "What index funds are and how to buy your first one, explained for complete beginners.",
      },
      {
        id: "how-to-invest-with-little",
        title: "How to Start Investing with Almost Nothing",
        youtubeId: "-C_5hzJCHaY",
        duration: 1311,
        description:
          "Practical steps for opening accounts and making your first investments on a small budget.",
      },
    ],
    resources: [
      {
        label: "Compound Interest Calculator",
        url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
        type: "link",
      },
    ],
  },
];
