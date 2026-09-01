import Link from 'next/link';
import Image from 'next/image';

export const metadata = { title: 'StoriesHouse' };

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header className="contact-topbar"><Link className="wordmark" href="/"><Image className="brand-logo" src="/storieshouse-red-cropped.png" alt="Stories House" width={160} height={69} priority /></Link><Link className="contact-back" href="/">← BACK TO HOME</Link></header>
      <section className="contact-hero">
        <div className="contact-hero-copy"><p className="eyebrow">LET&apos;S CREATE SOMETHING BEAUTIFUL</p><h1>Tell me about<br /><em>your love story.</em></h1><p>Share the celebration you are dreaming about. I&apos;ll be in touch within two working days with availability and a tailored collection.</p><div className="contact-details"><a href="mailto:mail.storieshouse@gmail.com">mail.storieshouse@gmail.com</a><span>·</span><a href="tel:+916205392670">+91 62053 92670</a></div></div>
      </section>
      <section className="contact-form-section">
        <div><p className="eyebrow">ENQUIRY FORM</p><h2>A few lovely<br />details.</h2></div>
        <form className="contact-form">
          <label>Your name<input name="name" type="text" placeholder="Your full name" required /></label>
          <label>Email address<input name="email" type="email" placeholder="mail.storieshouse@gmail.com" required /></label>
          <label>Phone number<input name="phone" type="tel" placeholder="+91" /></label>
          <label>Wedding date<input name="date" type="date" /></label>
          <label>Wedding location<input name="location" type="text" placeholder="City and venue, if known" /></label>
          <label className="contact-form-wide">Tell us a little more<textarea name="details" rows="4" placeholder="Venue, guest count, your ideas, or anything else you would like us to know…" /></label>
          <button type="submit">SEND MY ENQUIRY <span>↗</span></button>
        </form>
      </section>
    </main>
  );
}
