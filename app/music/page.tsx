import type { Metadata } from "next";
import MusicSite from "@/components/music/MusicSite";

export const metadata: Metadata = {
  title: "Anas Music — Stream, discover, and play",
  description: "A Spotify-style music experience built by Anas.",
};

export default function MusicPage() {
  return <MusicSite />;
}
