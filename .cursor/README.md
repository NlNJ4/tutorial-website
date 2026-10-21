# Cursor setup for Learnly

This setup is project-local in `.cursor/` and can be tracked in Git. It installs no global skills. Communication, project instructions, documentation, and UI copy default to English unless the user requests another language.

## Getting started

1. Open the `tutorial-website` root folder in Cursor and start a new Agent chat. If the new rules or skills do not appear, run **Developer: Reload Window**.
2. Check the rules and skills in Cursor Settings, using the interface available in your installed version. Project rules come from `.cursor/rules/*.mdc`.
3. Make a normal request, such as "Improve the Library page on mobile." The project rule provides context and points the agent to relevant skills.
4. Type `/` to select the commands below. If they are not listed, attach the corresponding file from `.cursor/commands/` to your request.

Rules guide the agent. They are not lint enforcement or automatic tests, and they do not run commands on file save. Discovery has been configured through the documented directory structure; it has not been verified in the Cursor UI on this machine.

## Project analysis and skill selection

Learnly uses Next.js 16.3.5 App Router, React 19, strict TypeScript, Tailwind v4, and shadcn with Radix. Its primary flow is browse -> collection -> lesson, with content maintained in a TypeScript file.

| Project area | Support |
| --- | --- |
| Server pages, client search, theme, local progress | React performance guidance for client boundaries, hydration, subscriptions, and bundles when relevant |
| UI primitives, forms, and Sheet | shadcn guidance for compatible APIs, composition, and semantic tokens |
| Navigation, filters, and mobile lesson drawer | Web interface review for keyboard support, focus, labels, contrast, and responsive behavior |
| Visual design and polish | Frontend design guidance for content-specific hierarchy, typography, layouts, and restrained details |
| Collections, YouTube IDs, durations, creator output | Learnly-specific data invariants and content workflow |
| Version-sensitive Next.js APIs | Rules requiring the installed documentation in `node_modules/next/dist/docs/` |

## Installed skills

Sources were researched on **October 21, 2026**. Install counts and GitHub stars are approximate research snapshots and can change. Installed files are pinned to exact commits in `skills-sources.json`.

| Skill | Source | Research snapshot | Use for |
| --- | --- | --- | --- |
| `vercel-react-best-practices` | [Vercel agent-skills](https://github.com/vercel-labs/agent-skills) | About 825K installs; 32.8K repository stars | React implementation, refactoring, and performance review |
| `web-design-guidelines` | [Vercel agent-skills](https://github.com/vercel-labs/agent-skills) | About 766K installs; 32.8K repository stars | UI, UX, and accessibility review |
| `shadcn` | [shadcn-ui/ui](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn) | About 86.7K installs; 126K repository stars | Components, forms, overlays, and theme integration |
| `frontend-design` | [Anthropic skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | About 1M installs; 183K repository stars | Intentional visual design and reducing generic AI aesthetics |

Install counts were checked on skills.sh: [React](https://skills.sh/vercel-labs/agent-skills/react-best-practices), [UI review](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines), [shadcn](https://skills.sh/shadcn/ui/shadcn), and [frontend design](https://skills.sh/anthropics/skills/frontend-design). Repository stars were checked through GitHub's API.

Upstream skill contents are preserved with their references, assets, and included licenses. Learnly-specific adaptations live in rules so upstream updates remain reviewable.

### Using the skills together

- **Frontend design** guides visual decisions: establish a direction from the product, create hierarchy, use real content, then critique the result. It is the primary anti-slop design skill.
- **shadcn** guides component implementation. Use existing Radix wrappers and the installed CLI before following newer upstream examples.
- **Web design guidelines** checks usability and accessibility. It fetches Vercel's current checklist when invoked; report limitations when the network is unavailable.
- **React best practices** supports implementation quality. Load relevant references instead of the entire compiled guide for every task.

The frontend skill uses a design-studio framing. It does not mean Learnly has actually rejected a proposal, and it does not authorize an unsolicited rebrand. The known brief is already a calm personal learning library. Focused polish should preserve its identity while improving execution.

The shadcn skill includes a showcase script and examples for newer CLI releases. Do not run showcase tooling for unrelated work or upgrade dependencies just to match an example. Use `pnpm exec shadcn` and inspect the installed APIs.

Skill examples are reference material. `.cursor` is excluded from TypeScript and ESLint checks, and `@source not "../.cursor"` in `app/globals.css` prevents Tailwind from generating CSS from example classes.

## Project rules

| File | Scope |
| --- | --- |
| `rules/00-project.mdc` | Every chat: project context, skill selection, language, pnpm, completion checks |
| `rules/10-nextjs.mdc` | App Router/React files and Next config: installed docs, async params, rendering behavior |
| `rules/20-ui.mdc` | Pages, components, CSS: existing theme, Tailwind v4, Radix, accessibility |
| `rules/25-design-quality.mdc` | Visual design: known brief, intentional hierarchy, anti-slop checks, rendered verification |
| `rules/30-learning-data.mdc` | Content, creator, progress: stable IDs, duration units, YouTube IDs, localStorage |

The generated Next.js block in `AGENTS.md` remains intact. Installed Next.js docs, project rules, and the user's brief take priority over incompatible generic skill examples.

## Reusable commands

| Command | Example |
| --- | --- |
| `/learnly-review` | `/learnly-review Check this diff for bugs, accessibility, and hydration issues` |
| `/learnly-check` | `/learnly-check Run lint/build and verify the affected flows` |
| `/learnly-add-collection` | `/learnly-add-collection Add a collection using these video links ...` |
| `/learnly-design-review` | `/learnly-design-review Review the home page for AI slop and suggest three concrete improvements` |

Review commands report findings by default. Include "implement the improvements" when you want edits too. For collection additions, supply the title, description, category, video links, and available durations. The agent must not fabricate video IDs or unverifiable metadata.

The existing checks are `pnpm lint` and `pnpm build`; there is no configured automated test suite. Reports must distinguish checks actually run from flows still requiring browser verification.

## Anti-slop research and tradeoffs

Two prominent options were compared:

| Candidate | Strength | Decision |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Compact, official guidance for a product-specific direction, hierarchy, typography, content, and self-critique | Installed, with Learnly-specific rules |
| [Taste Skill](https://github.com/leonxlnx/taste-skill) | Extensive art-direction library and browser inspection; skills.sh showed roughly 650K installs and GitHub about 100K stars | Deferred: its current house rules ban indigo, ordinary card grids, and other patterns that can serve this library |

Taste Skill now includes the former `redesign-existing-projects` workflow within `design-taste-frontend`; the old separate skill is no longer present in the current repository. This was checked against the [upstream README](https://github.com/leonxlnx/taste-skill#moved-skills), not just directory search results.

For Learnly, anti-slop means choosing each element for a learning task. It does not mean banning useful collection grids or lesson numbering, changing Geist merely because it is common, or replacing the current palette with another fashionable template.

## Other deferred tooling

- **Old `next-best-practices`:** [upstream moved reference knowledge](https://github.com/vercel-labs/next-skills/blob/main/README.md) into bundled docs and generated agent rules for Next.js 16.3+, which this project already has.
- **Database/auth/payment/deployment skills:** the current app has no corresponding requirement.
- **New test framework, MCP, or automatic hooks:** existing tooling is sufficient for this setup. Add these when a concrete task requires them.

## Maintenance

Check `skills-sources.json` for repository paths, exact commits, licenses, and `SKILL.md` hashes before updating. Review changes to the skill and its supporting files, then update the manifest. Do not silently move to `latest`.

After adding example code, confirm it remains outside application compilation, linting, and Tailwind scanning. Start a new Agent chat to discover updated skills.

References: [Cursor skills](https://cursor.com/docs/skills), [Cursor rules](https://cursor.com/docs/rules), [Cursor commands](https://docs.cursor.com/en/agent/chat/commands), [shadcn skills](https://ui.shadcn.com/docs/skills).
