"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./StoryJourney.module.css";

export default function StoryPhotoWall({ storyName, photos }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const hasOpenPhoto = activeIndex !== null;

  const previous = () => setActiveIndex((index) => (index - 1 + photos.length) % photos.length);
  const next = () => setActiveIndex((index) => (index + 1) % photos.length);

  useEffect(() => {
    if (!hasOpenPhoto) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasOpenPhoto, photos.length]);

  return <>
    <div className={styles.photoWall}>
      {photos.map((image, index) => <article className={`${styles.moment} ${styles[`moment${(index % 6) + 1}`]}`} key={image}>
        <button className={styles.photoButton} type="button" onClick={() => setActiveIndex(index)} aria-label={`Open photo ${index + 1} of ${photos.length}`}>
          <span className={styles.photo}><Image src={image} alt={`${storyName} wedding moment ${index + 1}`} fill loading="eager" sizes="(max-width: 720px) 92vw, (max-width: 1100px) 44vw, 26vw" /></span>
        </button>
      </article>)}
    </div>
    {hasOpenPhoto && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${storyName} photo viewer`} onClick={() => setActiveIndex(null)}>
      <button className={`${styles.lightboxButton} ${styles.lightboxClose}`} type="button" onClick={() => setActiveIndex(null)} aria-label="Close photo viewer">×</button>
      <button className={`${styles.lightboxButton} ${styles.lightboxPrevious}`} type="button" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Previous photo">←</button>
      <div className={styles.lightboxImage} onClick={(event) => event.stopPropagation()}>
        <Image src={photos[activeIndex]} alt={`${storyName} wedding moment ${activeIndex + 1}`} fill sizes="100vw" priority />
      </div>
      <button className={`${styles.lightboxButton} ${styles.lightboxNext}`} type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next photo">→</button>
      <p className={styles.lightboxCount}>{activeIndex + 1} / {photos.length}</p>
    </div>}
  </>;
}
