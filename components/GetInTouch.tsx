"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GetInTouch.module.css";

export default function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [fillProgress, setFillProgress] = useState(0);

  // Scroll-based fill effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect reduced motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFillProgress(1);
      return;
    }

    const handleScroll = () => {
      const titleEl = titleRef.current;
      if (!titleEl) return;

      const rect = titleEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Check if we're at the bottom of the page
      const atBottom = scrollTop + windowHeight >= docHeight - 5;
      if (atBottom) {
        setFillProgress(1);
        return;
      }

      // Fill starts when title enters viewport (your setting)
      // Fill completes when title is ~30% from top — long, smooth animation
      const triggerStart = windowHeight * 0.95;
      const triggerEnd = windowHeight * 0.5;

      const progress = (triggerStart - rect.top) / (triggerStart - triggerEnd);
      setFillProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.querySelectorAll(".reveal").forEach((child) => child.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <p className={`${styles.subtitle} reveal`}>Have a project in mind?</p>

        <div ref={titleRef} className={styles.titleWrap}>
          {/* Base layer: ghosted/light text */}
          <h2 className={styles.titleBase} aria-label="Let's Talk!">
            Let&apos;s <span className={styles.talkBase}>Talk</span>!
          </h2>
          {/* Fill layer: solid text, revealed via clip-path */}
          <h2
            className={styles.titleFill}
            aria-hidden="true"
            style={{
              clipPath: `inset(0 ${(1 - fillProgress) * 100}% 0 0)`,
            }}
          >
            Let&apos;s <span className={styles.talkFill}>Talk</span>!
          </h2>
        </div>

        <div className={`${styles.channels} reveal`}>
          <a
            href="https://www.linkedin.com/in/joris-strakeljahn/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn<span className="sr-only"> (opens in new tab)</span>
          </a>

          <a
            href="https://x.com/jstrakeljahnx"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
            aria-label="X (Twitter) (opens in new tab)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="https://github.com/jorisstrakeljahn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub<span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
