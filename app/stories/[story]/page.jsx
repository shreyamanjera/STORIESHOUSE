import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "../../data/stories";
import styles from "./StoryJourney.module.css";

export default async function StoryPage({ params }) {
  const { story } = await params;
  const selectedStory = stories[story];
  if (!selectedStory) notFound();

  return <main className={`story-page ${styles.page}`}>
    <header className={styles.header}>
      <Link href="/stories" className={styles.back}>← BACK TO STORIES</Link>
      <p>STORIES HOUSE · CLIENT JOURNEY</p>
    </header>
    <section className={styles.intro}>
      <p className={styles.eyebrow}>A LOVE STORY</p>
      <h1>{selectedStory.name}</h1>
      <p>Every wedding unfolds in its own way. This is a collection of the moments, people, and feelings that made this day theirs.</p>
    </section>
    <section className={styles.journey} aria-label={`${selectedStory.name} photo journey`}>
      <div className={styles.photoWall}>
        {selectedStory.photos.map((image, index) => <article className={`${styles.moment} ${styles[`moment${(index % 6) + 1}`]}`} key={image}>
          <figure className={styles.photo}><Image src={image} alt={`${selectedStory.name} wedding moment ${index + 1}`} fill sizes="(max-width: 720px) 92vw, (max-width: 1100px) 44vw, 26vw" /></figure>
        </article>)}
      </div>
    </section>
    <footer className={styles.closing}>
      <Link href="/stories" className={styles.explore}>EXPLORE MORE STORIES <span>→</span></Link>
    </footer>
  </main>;
}
