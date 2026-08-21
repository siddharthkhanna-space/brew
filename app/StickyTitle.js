"use client";

import { useEffect, useState } from "react";

export default function StickyTitle({ className }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".hero-title");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky-title${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="sticky-title-inner">
        <a className={`sticky-brand ${className}`} href="#top">
          brew my coffee
        </a>
        <a className="button button-small button-primary" href="#start">
          Start brewing
        </a>
      </div>
    </header>
  );
}
