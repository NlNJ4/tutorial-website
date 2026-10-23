Validate Learnly's current work using the existing project tooling.

1. Read `AGENTS.md` and the applicable `.cursor/rules/`. Inspect the current diff to select affected flows.
2. Run `pnpm lint` and `pnpm build` sequentially from the repository root. Do not start concurrent Next.js builds/dev sessions against the same `.next` directory. Stop and diagnose a failed check before continuing.
3. If my request includes fixing failures, make focused corrections and rerun affected checks. Otherwise report failures and their likely causes without editing source.
4. For behavior/UI changes, use available browser tools to verify the affected route and interactions. Relevant cases include library search/category/sort, collection-to-lesson navigation, previous/next, completion with refresh, mobile drawer, theme toggle, and creator copy/download. Do not claim YouTube playback was tested if only the iframe rendered.
5. State which checks passed/failed, which flows were verified, and which need manual checking. There is currently no configured automated test suite.
