"use client";

import { MacbookScroll } from "../../components/ui/macbook-scroll";

export const youtubeFrames = [
  {
    id: "MyepuSiavqo",
    title: "Sarthak and Arushikha — Pre-wedding film",
    thumbnail: "/sarthak-arushikha-film-thumbnail.jpg"
  },
  { id: "4QLncYJ9jws", title: "Stories House wedding film 2" },
  { id: "Uf4GAb3bjTs", title: "Stories House wedding film 3" },
  { id: "gq8aej1i5h8", title: "Stories House wedding film 4" },
  { id: "taWSL_s1m0Y", title: "Stories House wedding film 5" },
  { id: "37X7fq2Q-IM", title: "Stories House wedding film 6" }
].map((frame) => ({
  ...frame,
  thumbnail: frame.thumbnail || `https://i.ytimg.com/vi/${frame.id}/hqdefault.jpg`,
  youtubeUrl: `https://www.youtube.com/watch?v=${frame.id}`
}));

export default function MacbookFilmsShowcase() {
  return <MacbookScroll src="/storieshouse-black-cropped.png" frames={youtubeFrames} showGradient={false} hideTitle mobileFilmLayout />;
}
