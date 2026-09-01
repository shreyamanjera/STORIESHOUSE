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
  useEffect(() => {
    slides.slice(1).forEach(({ src }) => {
      const image = new window.Image();
      image.src = src;
    });

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero-background hero-slides" aria-hidden="true">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;

          return <span key={slide.className} className={`hero-slide ${slide.className}${isActive ? " is-active" : ""}`} style={index === 0 ? { backgroundImage: `url('${slide.src}')` } : undefined}><Image className="hero-slide-image" src={slide.src} alt="" fill priority={index === 0} loading={index === 0 ? undefined : "eager"} unoptimized sizes="100vw" /></span>;
        })}
      </div>
      <div className="slide-status" aria-label="Six wedding photographs rotate automatically">
        {slides.map((slide, index) => <span key={slide.className} className={activeSlide === index ? "is-active" : ""} />)}
      </div>
    </>
  );
}
