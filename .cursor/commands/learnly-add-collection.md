Add or update the learning collection described in my message, following Learnly's existing content model.

1. Read `data/types.ts`, representative entries in `data/collections.ts`, `lib/collections.ts`, and `.cursor/rules/30-learning-data.mdc`.
2. Preserve existing URLs/identifiers when updating. For new content, generate unique nonempty slugs and lesson IDs, select a canonical category, extract valid YouTube IDs, and express durations in seconds.
3. Use supplied sources; verify links and metadata with available tools. Do not fabricate links, video availability, or durations. If essential information cannot be verified, ask for that specific missing information while preparing independent parts.
4. Update the TypeScript data directly; use optional descriptions/resources/featured flags only where appropriate. Keep content changes focused and retain the current architecture.
5. Run `pnpm lint` and `pnpm build`. Check the affected collection and lesson routes when a browser is available. Report the content added, URLs, and any metadata or playback that remains unverified.
