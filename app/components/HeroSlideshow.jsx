"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { className: "hero-slide-one", src: "/landing-slides/optimized/landing-01.jpg" },
  { className: "hero-slide-two", src: "/landing-slides/optimized/landing-02.jpg" },
  { className: "hero-slide-three", src: "/landing-slides/optimized/landing-03.jpg" },
  { className: "hero-slide-four", src: "/landing-slides/optimized/landing-04.jpg" },
  { className: "hero-slide-five", src: "/landing-slides/optimized/landing-05.jpg" },
  { className: "hero-slide-six", src: "/landing-slides/optimized/landing-06.jpg" }
];

export default function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState(() => new Set());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => {
        const next = (current + 1) % slides.length;
        return loadedSlides.has(next) ? next : current;
      });
    }, 6000);

    return () => window.clearInterval(timer);
  }, [loadedSlides]);

  return (
    <>
      <div className="hero-background hero-slides" aria-hidden="true">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;

          return <span key={slide.className} className={`hero-slide ${slide.className}${isActive ? " is-active" : ""}`}><Image className="hero-slide-image" src={slide.src} alt="" fill priority={index === 0} loading={index === 0 ? undefined : "eager"} sizes="100vw" onLoad={() => setLoadedSlides((current) => new Set(current).add(index))} /></span>;
        })}
      </div>
      <div className="slide-status" aria-label="Six wedding photographs rotate automatically">
        {slides.map((slide, index) => <span key={slide.className} className={activeSlide === index ? "is-active" : ""} />)}
      </div>
    </>
  );
}
