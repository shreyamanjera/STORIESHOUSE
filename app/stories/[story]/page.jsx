import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "../../data/stories";
import styles from "./StoryJourney.module.css";
import StoryPhotoWall from "./StoryPhotoWall";

export default async function StoryPage({ params }) {
  const { story } = await params;
  const selectedStory = stories[story];
  if (!selectedStory) notFound();

  return <main className={`story-page ${styles.page}`}>
    <header className={styles.header}>
      <Link href="/stories" className={styles.back}>← BACK TO STORIES</Link>
      <p>STORIES HOUSE · JOURNEY</p>
    </header>
    <section className={styles.intro}>
      <p className={styles.eyebrow}>A LOVE STORY</p>
      <h1>{selectedStory.name}</h1>
      <p>Every wedding unfolds in its own way. This is a collection of the moments, people, and feelings that made this day theirs.</p>
    </section>
    <section className={styles.journey} aria-label={`${selectedStory.name} photo journey`}>
      <StoryPhotoWall storyName={selectedStory.name} photos={selectedStory.photos} />
    </section>
    <footer className={styles.closing}>
      <Link href="/stories" className={styles.explore}>EXPLORE MORE STORIES <span>→</span></Link>
    </footer>
  </main>;
}
