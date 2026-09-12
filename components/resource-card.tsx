import {
  ArrowUpRight,
  Code2,
  FileText,
  FolderOpen,
  Link2,
  MonitorPlay,
  Newspaper,
  Presentation,
} from "lucide-react";
import type { ResourceType } from "@/data/types";

const icons: Record<ResourceType, typeof Link2> = {
  pdf: FileText,
  slides: Presentation,
  link: Link2,
  code: Code2,
  drive: FolderOpen,
  article: Newspaper,
  video: MonitorPlay,
};

const typeLabels: Record<ResourceType, string> = {
  pdf: "PDF",
  slides: "Slides",
  link: "Link",
  code: "Code",
  drive: "Drive",
  article: "Article",
  video: "Video",
};

export function ResourceCard({
  label,
  url,
  type = "link",
}: {
  label: string;
  url: string;
  type?: ResourceType;
}) {
  const Icon = icons[type] ?? Link2;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">
          {typeLabels[type]}
        </span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden
      />
    </a>
  );
}
