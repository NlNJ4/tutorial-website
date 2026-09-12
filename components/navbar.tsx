"use client";

import { GraduationCap, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4" />
          </span>
          Learnly
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" asChild>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={cn(
                  isActive(pathname, link.href) && "bg-muted text-foreground"
                )}
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search the library" asChild>
            <Link href="/library#search">
              <Search className="size-4" />
            </Link>
          </Button>
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-base">
                  <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GraduationCap className="size-3.5" />
                  </span>
                  Learnly
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      isActive(pathname, link.href) && "bg-muted text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
