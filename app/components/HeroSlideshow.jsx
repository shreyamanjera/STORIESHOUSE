"use client";

import { useEffect, useState } from "react";

const slides = [
  { className: "landing-slide-01", src: "/landing-slides/current/slide-01.jpg", mobileSrc: "/landing-slides/mobile/slide-01-replacement.jpg" },
  { className: "landing-slide-02", src: "/landing-slides/current/slide-02.jpg", mobileSrc: "/landing-slides/mobile/slide-02.jpg" },
  { className: "landing-slide-03", src: "/landing-slides/current/slide-03.jpg", mobileSrc: "/landing-slides/mobile/slide-03.jpg" },
  { className: "landing-slide-04", src: "/landing-slides/current/slide-04.jpg", mobileSrc: "/landing-slides/mobile/slide-04.jpg" },
  { className: "landing-slide-05", src: "/landing-slides/current/slide-05.jpg", mobileSrc: "/landing-slides/mobile/slide-05.jpg" },
  { className: "landing-slide-06", src: "/landing-slides/current/slide-06.jpg", mobileSrc: "/landing-slides/mobile/slide-06.jpg" }
];

export default function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero-background hero-slides" aria-hidden="true">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;

          return <span key={slide.className} className={`hero-slide ${slide.className}${isActive ? " is-active" : ""}`} style={index === 0 ? { backgroundImage: `url('${slide.src}')` } : undefined}><picture className="hero-slide-picture"><source media="(max-width: 720px)" srcSet={slide.mobileSrc} /><img className="hero-slide-image" src={slide.src} alt="" loading="eager" decoding="sync" fetchPriority={index === 0 ? "high" : "auto"} /></picture></span>;
        })}
      </div>
    </>
  );
}
