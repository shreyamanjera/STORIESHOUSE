"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./AccordionGallery.module.css";

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = "hover",
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  grayscale = true,
  showLabels = true,
  showAllLabels = false,
  labelsOnHoverOnly = false,
  centerLabels = false,
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  height = 460,
  gap = 10,
  radius = 16
}) {
  const root = useRef(null);
  const panels = useRef([]);
  const media = useRef([]);
  const labels = useRef([]);
  const [activeIndex, setActiveIndex] = useState(Math.min(defaultIndex, items.length - 1));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useLayoutEffect(() => {
    const inactiveGrow = 1;
    const expandedGrow = Math.max(1.5, (expandRatio / (1 - expandRatio)) * Math.max(1, items.length - 1));
    const context = gsap.context(() => {
      panels.current.forEach((panel, index) => {
        const isActive = index === activeIndex;
        const direction = index < activeIndex ? -1 : 1;
        gsap.to(panel, {
          flexGrow: isActive ? expandedGrow : inactiveGrow,
          rotateY: isActive ? 0 : direction * tilt,
          duration,
          ease,
          delay: Math.abs(index - activeIndex) * stagger
        });
        gsap.to(media.current[index], {
          xPercent: isActive ? 0 : direction * parallax * -28,
          filter: grayscale ? `grayscale(${isActive ? 0 : 1})` : "grayscale(0)",
          duration,
          ease,
          delay: Math.abs(index - activeIndex) * stagger
        });
        gsap.to(labels.current[index], {
          autoAlpha: showLabels && (showAllLabels || (labelsOnHoverOnly ? hoveredIndex === index : isActive)) ? 1 : 0,
          y: showLabels && (showAllLabels || (labelsOnHoverOnly ? hoveredIndex === index : isActive)) ? 0 : 12,
          duration: duration * 0.72,
          ease
        });
      });
    }, root);
    return () => context.revert();
  }, [activeIndex, duration, ease, expandRatio, grayscale, hoveredIndex, items.length, labelsOnHoverOnly, parallax, showAllLabels, showLabels, stagger, tilt]);

  const activate = (index) => setActiveIndex(index);
  const galleryStyle = {
    "--ag-accent": accentColor,
    "--ag-overlay": overlayColor,
    "--ag-text": textColor,
    "--ag-gap": `${gap}px`,
    "--ag-radius": `${radius}px`,
    height: `${height}px`
  };

  return <div className={`${styles.gallery}${centerLabels ? ` ${styles.centeredLabels}` : ""}`} ref={root} style={galleryStyle} aria-label="Wedding stories gallery">
    {items.map((item, index) => <a
      className={styles.panel}
      href={item.link || "#"}
      key={item.label}
      ref={(element) => { panels.current[index] = element; }}
      aria-label={`View ${item.label}'s story`}
      onClick={(event) => { activate(index); if (!item.link) event.preventDefault(); }}
      onMouseEnter={trigger === "hover" ? () => { setHoveredIndex(index); activate(index); } : undefined}
      onMouseLeave={labelsOnHoverOnly ? () => setHoveredIndex(null) : undefined}
      onFocus={() => { setHoveredIndex(index); activate(index); }}
      onBlur={labelsOnHoverOnly ? () => setHoveredIndex(null) : undefined}
    >
      <span className={styles.frame}>
        <span className={styles.media} ref={(element) => { media.current[index] = element; }}>
          <img src={item.image} alt={item.label} loading="eager" decoding="sync" />
        </span>
        <span className={styles.overlay} />
      </span>
      {showLabels && <span className={styles.label} ref={(element) => { labels.current[index] = element; }}>
        <span className={styles.bar} />
        <span className={styles.text}>{item.label}</span>
      </span>}
    </a>)}
  </div>;
}
