"use client";

import dynamic from "next/dynamic";
import styles from "./StoriesLanyardRow.module.css";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false, loading: () => <div className={styles.loading} aria-hidden="true" /> });

const couples = [
  { name: "Anwita & Ashish", front: "/stories/anwita-ashish/anwita-ashish-01.jpg", back: "/stories/anwita-ashish/anwita-ashish-02.jpg" },
  { name: "Mansi & Abhijeet", front: "/stories/mansi-abhijeet/mansi-abhijeet-01.jpg", back: "/stories/mansi-abhijeet/mansi-abhijeet-02.jpg" },
  { name: "Tanishq & Ashi", front: "/stories/tanishq-ashi/tanishq-ashi-01.jpg", back: "/stories/tanishq-ashi/tanishq-ashi-02.jpg" },
  { name: "Sushma & Vishal", front: "/stories/sushma-vishal/sushma-vishal-01.jpg", back: "/stories/sushma-vishal/sushma-vishal-02.jpg" },
  { name: "Yukti & Bal", front: "/stories/yukti-bal/yukti-bal-01.jpg", back: "/stories/yukti-bal/yukti-bal-02.jpg" }
];

export default function StoriesLanyardRow() {
  return <div className={styles.gallery} aria-label="Interactive wedding story lanyards">
    {couples.map((couple) => <article className={styles.card} key={couple.name}>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} title={couple.name} frontImage={couple.front} backImage={couple.back} imageFit="cover" lanyardImage="/lanyard/lanyard.png" lanyardWidth={1} />
    </article>)}
  </div>;
}
