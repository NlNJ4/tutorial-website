/**
 * Import public YouTube playlists via the Atom RSS feed (no API key).
 * Only works for public playlists; durations are not included in the feed.
 */

const MAX_PLAYLIST_ENTRIES = 50;
const PLAYLIST_ID_RE = /^[A-Za-z0-9_-]{10,}$/;

export interface PlaylistEntry {
  videoId: string;
  title: string;
}

/** Extract playlist ID from a URL or bare PL… / UU… style id. */
export function parsePlaylistId(urlOrId: string): string | null {
  const value = urlOrId.trim();
  if (!value) return null;

  if (PLAYLIST_ID_RE.test(value) && !value.includes("/") && !value.includes("?")) {
    return value;
  }

  try {
    const url = new URL(value);
    const list = url.searchParams.get("list");
    if (list && PLAYLIST_ID_RE.test(list)) return list;
  } catch {
    // Not a URL — fall through.
  }

  const listMatch = value.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (listMatch?.[1]) return listMatch[1];

  return null;
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function parsePlaylistFeedXml(xml: string): PlaylistEntry[] {
  const entries: PlaylistEntry[] = [];
  const entryBlocks = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  for (const block of entryBlocks) {
    const videoMatch =
      block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ??
      block.match(/<media:content[^>]+url="[^"]*\/vi\/([^/"]+)\//);
    const titleMatch = block.match(/<title>([^<]*)<\/title>/);
    if (!videoMatch || !titleMatch) continue;

    const videoId = videoMatch[1].trim();
    const title = decodeXmlEntities(titleMatch[1].trim());
    if (videoId.length === 11) {
      entries.push({ videoId, title });
    }
  }

  return entries;
}

/** Newest-first in the feed; reverse so lesson 1 matches playlist order. */
export async function fetchPlaylistEntries(
  playlistId: string
): Promise<PlaylistEntry[]> {
  if (!PLAYLIST_ID_RE.test(playlistId)) {
    throw new Error("Invalid playlist ID.");
  }

  const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`;
  const res = await fetch(feedUrl, {
    headers: { Accept: "application/atom+xml,text/xml,*/*" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? "Playlist not found or not public."
        : "Could not load playlist from YouTube."
    );
  }

  const xml = await res.text();
  const parsed = parsePlaylistFeedXml(xml);
  if (parsed.length === 0) {
    throw new Error("No videos found in this playlist.");
  }

  return parsed.slice(0, MAX_PLAYLIST_ENTRIES).reverse();
}
