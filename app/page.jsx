import Image from "next/image";
import Link from "next/link";
import HeroSlideshow from "./components/HeroSlideshow";
import SocialLinks from "./components/SocialLinks";

export default function Home() {
  return (
    <>
      <main id="home">
        <section className="hero hero-slideshow" style={{ backgroundImage: "url('/landing-slides/optimized/landing-01.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}>
          <HeroSlideshow />
          <SocialLinks className="hero-social-links" />
          <div className="hero-copy"><Image className="hero-stories-logo" src="/storieshouse-white-cropped.png" alt="Stories House" width={160} height={69} priority /><h1><span className="landing-headline-line">Every love story </span><br className="landing-headline-break" /><span className="landing-headline-line">deserves to be beautifully captured.</span></h1><p className="hero-description">Capturing your forever, one frame at a time.</p><Link className="ios-cta" href="/stories-house">Enter Stories House World <span>→</span></Link></div>
        </section>
      </main>
    </>
  );
}
