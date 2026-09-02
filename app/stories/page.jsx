import Image from "next/image";
import Link from "next/link";
import StoriesAccordionGallery from "../components/StoriesAccordionGallery";

export const metadata = {
  title: "Stories | Stories House",
  description: "A collection of wedding stories by Stories House."
};

export default function StoriesPage() {
  return <main className="stories-index-page"><header className="inner-topbar"><Link className="wordmark" href="/"><Image className="brand-logo" src="/storieshouse-black-cropped.png" alt="Stories House" width={160} height={69} priority /></Link><Link className="contact-back" href="/stories-house">← BACK TO WELCOME</Link></header><section className="stories-index-intro stories-index-hero"><Image src="/stories-index-hero.jpg" alt="A groom sharing an emotional embrace with family" fill priority sizes="100vw" /><div className="stories-index-hero-copy"><h1>STORIES</h1><p>Walking you through the journey of each couple.</p></div></section><section className="stories-index-collection stories-accordion-collection" aria-label="Interactive wedding stories"><StoriesAccordionGallery /></section></main>;
}
