"use client";

import { useCallback, useRef } from "react";
import DepthCarousel from "./DepthCarousel";

const photoPool = ["/package-complete-wedding.jpg", "/client-story-ceremony.jpg", "/client-story-hands.jpg", "/package-reception.jpg", "/package-engagement.jpg", "/package-haldi-new.jpg", "/package-sangeet.jpg", "/package-pre-wedding.jpg", "/venue.jpg"];
const couples = [
  { name: "Anwita & Ashish", photos: ["/stories/thumbs/anwita-ashish/anwita-ashish-01.jpg", "/stories/thumbs/anwita-ashish/anwita-ashish-02.jpg", "/stories/thumbs/anwita-ashish/anwita-ashish-03.jpg", "/stories/thumbs/anwita-ashish/anwita-ashish-04.jpg", "/stories/thumbs/anwita-ashish/anwita-ashish-05.jpg"] },
  { name: "Mansi & Abhijeet", photos: ["/stories/thumbs/mansi-abhijeet/mansi-abhijeet-01.jpg", "/stories/thumbs/mansi-abhijeet/mansi-abhijeet-02.jpg", "/stories/thumbs/mansi-abhijeet/mansi-abhijeet-03.jpg", "/stories/thumbs/mansi-abhijeet/mansi-abhijeet-04.jpg", "/stories/thumbs/mansi-abhijeet/mansi-abhijeet-05.jpg"] },
  { name: "Tanishq & Ashi", photos: ["/stories/thumbs/tanishq-ashi/tanishq-ashi-01.jpg", "/stories/thumbs/tanishq-ashi/tanishq-ashi-02.jpg", "/stories/thumbs/tanishq-ashi/tanishq-ashi-03.jpg", "/stories/thumbs/tanishq-ashi/tanishq-ashi-04.jpg", "/stories/thumbs/tanishq-ashi/tanishq-ashi-05.jpg"] },
  { name: "Sushma & Vishal", photos: ["/stories/thumbs/sushma-vishal/sushma-vishal-01.jpg", "/stories/thumbs/sushma-vishal/sushma-vishal-02.jpg", "/stories/thumbs/sushma-vishal/sushma-vishal-03.jpg", "/stories/thumbs/sushma-vishal/sushma-vishal-04.jpg", "/stories/thumbs/sushma-vishal/sushma-vishal-05.jpg"] },
  { name: "Yukti & Bal", photos: ["/stories/thumbs/yukti-bal/yukti-bal-01.jpg", "/stories/thumbs/yukti-bal/yukti-bal-16.jpg", "/stories/thumbs/yukti-bal/yukti-bal-17.jpg", "/stories/thumbs/yukti-bal/yukti-bal-04.jpg", "/stories/thumbs/yukti-bal/yukti-bal-05.jpg"] }
];

const fivePhotosFor = (offset, name, photos) => (photos || Array.from({ length: 5 }, (_, index) => photoPool[(offset + index * 2) % photoPool.length])).map((image, index) => ({ image, alt: `${name} wedding moment ${index + 1}`, title: name }));

export default function StoriesCardRow() {
  const rowRef = useRef(null);
  const scrollStories = useCallback((direction) => {
    const row = rowRef.current;
    const firstCard = row?.querySelector(".stories-depth-card");
    if (!row || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(row).gap) || 0;
    row.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  }, []);

  return <div className="stories-carousel-shell"><div className="stories-card-row" ref={rowRef} aria-label="Featured client stories">{couples.map((couple, index) => <article className="stories-motion-card stories-depth-card" key={couple.name}><DepthCarousel items={fivePhotosFor(index, couple.name, couple.photos)} depth={35} spread={14} stackOffset={0} tilt={0} tiltDirection="right" perspective={950} visibleCards={4} falloff={0.04} blur={0} autoplay={false} loop cardWidth={360} cardHeight={512} radius={30} tint="#43000f" duration={700} ease="power3.out" autoplayDelay={3200} fitPadding={0} showControls={false} showIndicators={false} advanceOnCardClick /></article>)}</div><div className="stories-carousel-navigation" aria-label="Story carousel navigation"><button type="button" aria-label="Previous stories" onClick={() => scrollStories(-1)}>←</button><button type="button" aria-label="Next stories" onClick={() => scrollStories(1)}>→</button></div></div>;
}
