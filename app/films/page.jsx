import Image from "next/image";
import Link from "next/link";
import MacbookFilmsShowcase from "../components/MacbookFilmsShowcase";

export const metadata = {
  title: "Films | Stories House",
  description: "Wedding films by Stories House."
};

export default function FilmsPage() {
  return <main className="films-page"><header className="inner-topbar"><Link className="wordmark" href="/"><Image className="brand-logo" src="/storieshouse-black-cropped.png" alt="Stories House" width={160} height={69} priority /></Link><Link className="contact-back" href="/stories-house">← BACK TO WELCOME</Link></header><section className="films-intro films-hero"><Image src="/films-hero.jpg" alt="A couple celebrating their wedding surrounded by roses" fill priority sizes="100vw" /><div className="films-hero-copy"><p className="eyebrow">WEDDING FILMS</p><h1>Stories House<br /><em>Films.</em></h1><p>From quiet glances to joyful celebrations, our films preserve the movement, sound, and emotion of your day—so every return feels beautifully familiar.</p></div></section><MacbookFilmsShowcase /></main>;
}
