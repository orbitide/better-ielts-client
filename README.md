# Better IELTS

A production-quality IELTS learning platform frontend built with Next.js 16. Uses mock/dummy data only — no backend, no database, no real API calls.

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16.2.7 (Turbopack, App Router) |
| UI | React 19, TypeScript, Tailwind v4, @base-ui/react |
| Charts | Recharts |
| State | Zustand |
| Icons | lucide-react |

## Architecture

- **`lib/mock/`** — typed static data (users, tests, courses, vocabulary, etc.)
- **`lib/data/`** — async `react.cache` wrappers over mock data; all pages import from here only
- **`lib/store/`** — Zustand stores for UI state, simulated auth, and active test session
- **`app/(marketing)/`** — public pages wrapped with `PublicNav` + `Footer`
- **`app/(app)/`** — authenticated pages wrapped with `AppSidebar` + `AppHeader`
- All `page.tsx` files are Server Components; interactive shells are Client Components

## Routes

### Marketing (public)

| Route | Page |
|---|---|
| `/` | Landing page |
| `/courses` | Course catalogue |
| `/practice` | Skill practice overview |
| `/mock-tests` | Mock test listing |
| `/vocabulary` | Vocabulary topics |
| `/blog` | Blog posts |
| `/pricing` | Pricing plans |
| `/about` | About page |

### App (simulated auth — always logged in)

| Route | Page |
|---|---|
| `/dashboard` | Dashboard with band scores and study plan |
| `/study-plan` | Weekly study plan |
| `/lesson/[id]` | Lesson player |
| `/reading/[testId]` | Reading test (timed, split-pane) |
| `/listening/[testId]` | Listening test with audio player |
| `/writing/[taskId]` | Writing editor with AI mock feedback |
| `/speaking/[sessionId]` | Speaking session with recording interface |
| `/mock-test/[id]` | Full 165-minute mock test |
| `/vocabulary/[topic]` | Flashcard deck + vocab quiz |
| `/community` | Community discussion board |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Key Patterns

**`params` / `searchParams` are Promises in Next.js 16** — always `await` them in page components:
```ts
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  ...
}
```

**`buttonVariants` for server components** — import from `@/components/ui/button-variants` (no `"use client"`), not from `@/components/ui/button`. Use `<Link className={buttonVariants({...})}>` instead of `<Button asChild><Link>` in server components to avoid hydration mismatches.
