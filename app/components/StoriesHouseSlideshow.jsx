"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/stories-house-slides/current/slide-01.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-02.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-03.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-04.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-05.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-06.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-07.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-08.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-09.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-10.jpg", position: "center" },
  { src: "/stories-house-slides/current/slide-11.jpg", position: "center" }
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
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (previousSlide === null) return;
    const timer = window.setTimeout(() => setPreviousSlide(null), 350);
    return () => window.clearTimeout(timer);
  }, [previousSlide]);

  return (
    <div className="stories-house-slides" aria-hidden="true">
      {slides.map((slide, index) => {
        return (
          <span className={`stories-house-slide${activeSlide === index ? " is-active" : ""}`} key={slide.src}>
            <Image src={slide.src} alt="" fill preload={index === 0} loading={index === 0 ? undefined : "eager"} decoding="sync" unoptimized sizes="100vw" style={{ objectPosition: slide.position }} />
          </span>
        );
      })}
    </div>
  );
}
