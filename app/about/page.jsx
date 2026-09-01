import Image from "next/image";
import BackLink from "../components/BackLink";

export const metadata = {
  title: "About Stories House",
  description: "Meet the photographer and discover the Stories House approach."
};

export default function AboutPage() {
  return (
    <main className="about-page about-stories-page">
      <BackLink />
      <section className="about-home" aria-labelledby="about-home-title">
        <div className="about-home-image"><Image src="/about-pratik-singh.png" alt="Pratik Singh reviewing footage with a camera" fill priority sizes="(max-width: 720px) 100vw, 50vw" /><p className="about-home-image-note">A storyteller at heart</p></div>
        <div className="about-home-copy"><p className="eyebrow">ABOUT THE PHOTOGRAPHER</p><h1 id="about-home-title">Pratik <em>Singh.</em></h1><p className="about-home-role">FOUNDER &amp; LEAD PHOTOGRAPHER · STORIES HOUSE</p><p>With over 8 years behind the lens, Pratik has learned that the most powerful images are rarely planned. They live in the gentle pause before a ceremony, the warmth of a parent&apos;s embrace and the laughter shared after a long day.</p><div className="about-home-details"><div><p className="about-detail-title">THE PHILOSOPHY</p><p>Honest photographs over perfect poses. Every celebration should feel like yours—not a performance for the camera.</p></div><div><p className="about-detail-title">THE STORIES HOUSE WAY</p><p>A calm, observant presence that gives you room to be fully present, while no meaningful detail goes unseen.</p></div><div><p className="about-detail-title">WHERE WE TRAVEL</p><p>Mumbai · Delhi · Jaipur · Udaipur · Goa · Bengaluru · and celebrations across India.</p></div></div><div className="about-home-signoff"><Image className="about-home-signoff-logo" src="/storieshouse-black-cropped.png" alt="Stories House" width={170} height={73} /><small>WEDDING PHOTOGRAPHY</small></div></div>
      </section>
      <section className="studio-experience" aria-labelledby="studio-experience-title">
        <div className="studio-experience-intro"><p className="eyebrow">THE STORIES HOUSE DIFFERENCE</p><h2 id="studio-experience-title">Years of instinct,<br />held in every <em>frame.</em></h2><p>For us, the best photographs are not manufactured moments. They are a careful, joyful record of the day as it truly unfolds.</p></div>
        <div className="studio-experience-stats"><div><strong>300<span>+</span></strong><p>WEDDINGS DOCUMENTED</p></div><div><strong>20<span>+</span></strong><p>CITIES CELEBRATED</p></div><div><strong>8<span>+</span></strong><p>YEARS OF EXPERIENCE</p></div></div>
      </section>
    </main>
  );
}
