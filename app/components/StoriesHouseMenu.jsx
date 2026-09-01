"use client";

import Link from "next/link";
import { useState } from "react";

export default function StoriesHouseMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button className="stories-menu-button" type="button" aria-label="Open navigation menu" aria-expanded={isOpen} onClick={() => setIsOpen(true)}>
        <span /><span /><span />
      </button>
      <div className={`stories-menu-scrim${isOpen ? " is-open" : ""}`} onClick={closeMenu} aria-hidden="true" />
      <aside className={`stories-drawer${isOpen ? " is-open" : ""}`} aria-label="Stories House navigation">
        <button className="stories-drawer-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}>×</button>
        <nav>
          <Link href="/" onClick={closeMenu}><span aria-hidden="true">⌂</span>Home</Link>
          <Link href="/stories" onClick={closeMenu}><span aria-hidden="true">◇</span>Stories</Link>
          <Link href="/films" onClick={closeMenu}><span aria-hidden="true">▷</span>Films</Link>
          <Link className="stories-drawer-about" href="/about" onClick={closeMenu}><span aria-hidden="true">○</span>About</Link>
        </nav>
      </aside>
    </>
  );
}
