import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  CREATE_AUTH_COOKIE,
  isCreatorAccessConfigured,
  isCreatorAuthorized,
} from "@/lib/create-access";
import {
  fetchPlaylistEntries,
  parsePlaylistId,
} from "@/lib/youtube-playlist";

/**
 * GET /api/youtube-playlist?id=PLxxx or ?url=https://youtube.com/playlist?list=...
 * Public playlists only; uses YouTube's RSS feed (no API key).
 */
export async function GET(request: Request) {
  if (isCreatorAccessConfigured()) {
    const store = await cookies();
    if (!isCreatorAuthorized(store.get(CREATE_AUTH_COOKIE)?.value)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  const urlParam = searchParams.get("url");

  const playlistId =
    (idParam && parsePlaylistId(idParam)) ||
    (urlParam && parsePlaylistId(urlParam));

  if (!playlistId) {
    return NextResponse.json(
      { error: "Provide a valid playlist id or URL (list=PL…)." },
      { status: 400 }
    );
  }

  try {
    const entries = await fetchPlaylistEntries(playlistId);
    return NextResponse.json({ entries });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to load playlist.";
    const status = message.includes("not found") ? 404 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
