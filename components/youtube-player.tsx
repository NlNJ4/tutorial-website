/**
 * Privacy-enhanced YouTube embed. Videos play directly inside Learnly —
 * users are not sent off to YouTube.
 */
export function YouTubePlayer({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-black ring-1 ring-foreground/10">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
