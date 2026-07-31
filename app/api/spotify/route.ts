import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";

export const revalidate = 0; // Disable static caching

export async function GET() {
  const response = await getNowPlaying();

  // Helper to fetch and return recently played if nothing is currently playing
  const returnRecentlyPlayed = async () => {
    const recentlyPlayedRes = await getRecentlyPlayed();
    if (!recentlyPlayedRes || recentlyPlayedRes.status === 204 || recentlyPlayedRes.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }
    const recent = await recentlyPlayedRes.json();
    if (!recent.items || recent.items.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }
    const track = recent.items[0].track;
    return NextResponse.json({
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(", "),
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    });
  };

  if (!response || response.status === 204 || response.status > 400) {
    return await returnRecentlyPlayed();
  }

  const song = await response.json();

  if (song.item === null) {
    return await returnRecentlyPlayed();
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json({
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  });
}
