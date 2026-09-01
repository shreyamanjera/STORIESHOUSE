import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./components/SocialLinks";

export const metadata = {
  title: "StoriesHouse",
  description: "Stories House wedding photography."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}<footer className="site-footer"><div className="site-footer-frame"><Link className="site-footer-logo" href="/"><Image src="/storieshouse-red-cropped.png" alt="Stories House" width={170} height={73} /></Link><div className="site-footer-contact"><a href="tel:+916205392670"><svg className="footer-social-icon footer-whatsapp-icon" viewBox="0 0 28 28" aria-hidden="true"><path d="M23 5A12.8 12.8 0 0 0 3.8 20.7L3 25l4.4-1.2A12.8 12.8 0 1 0 23 5ZM14 24a10 10 0 0 1-5.1-1.4l-.4-.2-2.6.7.7-2.5-.3-.4A10 10 0 1 1 14 24Zm5.5-7.2c-.3-.2-2-1-2.3-1.1s-.6-.1-.8.2-.8 1.1-1 1.3-.4.2-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.2 9.2 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.6l.5-.6c.2-.2.2-.4.3-.6s0-.4 0-.6l-1.1-2.6c-.3-.6-.5-.5-.7-.5h-.7c-.3 0-.6.1-.9.5s-1.1 1.1-1.1 2.7 1.1 3.2 1.2 3.4a12.5 12.5 0 0 0 4.8 4.6c.7.3 1.1.6 1.6.7.7.2 1.2.2 1.7.1.6-.1 2-.8 2.3-1.5s.2-1.4.2-1.5-.2-.3-.5-.4Z" /></svg>+91 62053 92670</a><a href="mailto:mail.storieshouse@gmail.com">mail.storieshouse@gmail.com</a></div><SocialLinks className="site-footer-socials" /><Link className="site-footer-book" href="/contact">BOOK YOUR DATE <span>↗</span></Link><p className="site-footer-credit">© {new Date().getFullYear()} STORIES HOUSE · ALL RIGHTS RESERVED</p></div></footer></body></html>;
}
