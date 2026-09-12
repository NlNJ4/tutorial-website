import { GraduationCap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="size-3.5" />
            </span>
            Learnly
          </Link>
          <p className="text-sm text-muted-foreground">
            A personal place to organize what I know and share it with people I
            care about.
          </p>
        </div>

        <nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Footer">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/library" className="transition-colors hover:text-foreground">
            Library
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/create" className="transition-colors hover:text-foreground">
            Create
          </Link>
        </nav>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Learnly · Made to share what I learn.
        </p>
      </div>
    </footer>
  );
}
