import { Clock } from "lucide-react";

export function LessonComingSoon({ title }: { title: string }) {
  return (
    <div
      className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl bg-muted px-6 text-center ring-1 ring-foreground/10"
      role="status"
    >
      <Clock className="size-10 text-muted-foreground" aria-hidden />
      <p className="text-lg font-medium text-balance">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">
        This lesson is not available yet. Check back after the clip is uploaded
        to YouTube.
      </p>
    </div>
  );
}
