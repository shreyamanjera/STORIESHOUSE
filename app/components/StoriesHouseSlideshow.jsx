"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/stories-house-slides/optimized/welcome-haldi-landscape.jpg", position: "center" },
  { src: "/stories-house-slides/optimized/ceremony.jpg", position: "center 58%" },
  { src: "/stories-house-slides/optimized/floral-ceremony.jpg", position: "center" },
  { src: "/stories-house-slides/optimized/rings.jpg", position: "center" },
  { src: "/stories-house-slides/optimized/couple-outdoors.jpg", position: "center" }
];

export default function StoriesHouseSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);

  useEffect(() => {
    slides.slice(1).forEach(({ src }) => {
      const image = new window.Image();
      image.src = src;
    });

    const timer = window.setInterval(() => {
      setActiveSlide((current) => {
        setPreviousSlide(current);
        return (current + 1) % slides.length;
      });
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (previousSlide === null) return;
    const timer = window.setTimeout(() => setPreviousSlide(null), 950);
    return () => window.clearTimeout(timer);
  }, [previousSlide]);

  return (
    <div className="stories-house-slides" aria-hidden="true">
      {slides.map((slide, index) => {
        const visible = activeSlide === index || previousSlide === index;

        return (
          <span className={`stories-house-slide${activeSlide === index ? " is-active" : ""}`} key={slide.src}>
            {visible && <Image src={slide.src} alt="" fill priority={index === 0} unoptimized sizes="100vw" style={{ objectPosition: slide.position }} />}
          </span>
        );
      })}
    </div>
  );
}
