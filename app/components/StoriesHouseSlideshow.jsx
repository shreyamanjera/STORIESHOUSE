"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/stories-house-welcome-haldi.jpg", position: "center 60%" },
  { src: "/stories-house-slides/ceremony-clean.png", position: "center 58%" },
  { src: "/stories-house-slides/floral-ceremony-clean.png", position: "center" },
  { src: "/stories-house-slides/rings-clean.png", position: "center" },
  { src: "/stories-house-slides/couple-outdoors-clean.png", position: "center" }
];

export default function StoriesHouseSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => {
        setPreviousSlide(current);
        return (current + 1) % slides.length;
      });
    }, 6000);

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
            {visible && <Image src={slide.src} alt="" fill priority={index === 0} sizes="100vw" style={{ objectPosition: slide.position }} />}
          </span>
        );
      })}
    </div>
  );
}
