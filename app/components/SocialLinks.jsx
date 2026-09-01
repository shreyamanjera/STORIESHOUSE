export default function SocialLinks({ className = "" }) {
  return (
    <nav className={`social-links ${className}`.trim()} aria-label="Social media">
      <a href="https://instagram.com/storieshouse.official" target="_blank" rel="noreferrer" aria-label="Stories House on Instagram" title="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="social-links-dot" /></svg>
      </a>
      <a className="social-links-pinterest" href="https://pin.it/3QoNDdx1U" target="_blank" rel="noreferrer" aria-label="Stories House on Pinterest" title="Pinterest">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle className="pinterest-ring" cx="12" cy="12" r="10" /><path className="pinterest-p" d="M9.2 20l1.1-4.6m0 0c.7.9 1.7 1.4 2.9 1.4 2.5 0 4.3-2.1 4.3-5.1 0-2.8-2.2-4.8-5.2-4.8-3.3 0-5.5 2.3-5.5 5.1 0 1.1.4 2.1 1 2.7l.6-2.4c.2-1 .9-1.7 1.9-1.7 1 0 1.6.7 1.6 1.6 0 1.1-.7 2.6-.7 3.6" /></svg>
      </a>
    </nav>
  );
}
