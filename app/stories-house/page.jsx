import Image from "next/image";
import Link from "next/link";
import StoriesHouseMenu from "../components/StoriesHouseMenu";
import StoriesCardRow from "../components/StoriesCardRow";
import StoriesHouseSlideshow from "../components/StoriesHouseSlideshow";
import SocialLinks from "../components/SocialLinks";

export const metadata = {
  title: "Stories House | Wedding Photography",
  description: "A world of honest, artful wedding stories."
};

export default function StoriesHousePage() {
  return (
    <main className="stories-house-page">
      <header className="stories-house-nav">
        <StoriesHouseMenu />
        <Image className="stories-house-header-logo" src="/storieshouse-black-cropped.png" alt="Stories House" width={160} height={69} priority />
        <SocialLinks className="stories-house-social-links" />
      </header>
      <section className="stories-house-hero">
        <div className="stories-house-photo-frame" style={{ backgroundImage: "url('/stories-house-slides/optimized/welcome-haldi-landscape.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}>
          <StoriesHouseSlideshow />
        </div>
      </section>
      <section className="home-photographer" aria-labelledby="home-photographer-title">
        <div className="home-photographer-image"><Image src="/photographer/pratik-at-work.jpeg" alt="Pratik Singh photographing by the water" fill loading="eager" sizes="(max-width: 720px) 100vw, 42vw" /></div>
        <div className="home-photographer-copy"><p className="eyebrow">BEHIND THE LENS</p><h2 id="home-photographer-title">Pratik Singh.</h2><p>For over a decade, Pratik has documented the fleeting glances, laughter, and quiet in-between moments that make every celebration unmistakably yours.</p><Link className="home-photographer-link" href="/about">More about Pratik <span>→</span></Link></div>
      </section>
      <section className="gallery-showcase gallery-showcase-stories" aria-label="Featured client stories">
        <div className="gallery-showcase-content"><div className="gallery-showcase-heading"><p className="eyebrow">STORIES</p><h2>Love, in<br /><em>motion.</em></h2><p>Browse a small selection of celebrations we have had the honour of documenting.</p></div><StoriesCardRow /></div>
      </section>
      <section className="testimonials" aria-labelledby="testimonials-title">
        <div className="testimonials-heading"><p className="eyebrow">KIND WORDS</p><h2 id="testimonials-title">Loved by the<br /><em>people in the frame.</em></h2><p>Thoughtful images, an easy presence, and a record of the day that feels as personal as the memories themselves.</p></div>
        <div className="testimonials-grid">
          <figure><blockquote>“Had a great experience working with Stories House and team! From our pre-wedding shoot to our wedding, everything went so smoothly. They were professional, creative, and incredibly easy to work with from start to finish. They made us feel comfortable in front of the camera and knew exactly how to capture the perfect moments, both candid and posed. Thank you for capturing our memories so beautifully—we couldn&apos;t be happier!”</blockquote><figcaption>Mansi &amp; Abhijeet</figcaption></figure>
          <figure><blockquote>“We could be fully present with our people, knowing every beautiful detail was being quietly captured. Their calm direction made the whole experience feel effortless, natural, and truly ours.”</blockquote><figcaption>Deeksha &amp; Ujjwal</figcaption></figure>
          <figure><blockquote>“They made everyone feel immediately comfortable. Our photos are honest, elegant, and so full of warmth.”</blockquote><figcaption>Yukti &amp; Bal</figcaption></figure>
          <figure><blockquote>“These guys have the rare ability to make people comfortable in front of camera and it truly shows in the results. From creativity to editing to attention to detail, everything is just perfect. Incredible team and highly recommend.”</blockquote><figcaption>Devansh &amp; Kritika</figcaption></figure>
          <figure><blockquote>“A warm, thoughtful team that caught every feeling without ever making the day feel staged. We love every frame.”</blockquote><figcaption>Tanishq &amp; Ashi</figcaption></figure>
        </div>
        <div className="testimonials-contact"><span>Planning your own story?</span><a href="mailto:mail.storieshouse@gmail.com">mail.storieshouse@gmail.com</a><a href="tel:+916205392670">+91 62053 92670</a><a href="https://instagram.com/storieshouse.official" target="_blank" rel="noreferrer">@storieshouse.official ↗</a></div>
      </section>
      <section className="stories-house-note">
        <p className="eyebrow">OUR POINT OF VIEW</p>
        <h2>Love looks best<br />when it feels <em>like you.</em></h2>
        <p>From quiet glances to a room full of laughter, Stories House preserves the day exactly as it felt.</p>
      </section>
    </main>
  );
}
