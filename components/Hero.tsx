"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TiltCard from "./TiltCard";
import styles from "./Hero.module.css";

// Birthday: January 11, 2004
const BIRTHDAY = new Date("2004-01-11T00:00:00Z");

function getYearsSince(start: Date): string {
  const now = Date.now();
  const diff = now - start.getTime();
  const years = diff / (365.25 * 24 * 60 * 60 * 1000);
  return years.toFixed(9);
}

export default function Hero() {
  const [years, setYears] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const rafRef = useRef<number>(undefined);

  useEffect(() => {
    const onVisibility = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const update = useCallback(() => {
    setYears(getYearsSince(BIRTHDAY));
    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setYears(getYearsSince(BIRTHDAY));
      const interval = setInterval(() => setYears(getYearsSince(BIRTHDAY)), 1000);
      return () => clearInterval(interval);
    }

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, update]);

  return (
    <section className={styles.hero} id="about">
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.left}>
          <p className={styles.tagline}>indie hacker · freelancer · student</p>

          <h1 className={styles.headline}>
            Hi, I&apos;m <span className={styles.accent}>Joris</span>
          </h1>

          <p className={styles.subheadline}>
            A guy who builds stuff online.
          </p>

          <p className={styles.age}>
            Been here for{" "}
            <span className={styles.counter} aria-hidden="true">
              {years ?? "…"}
            </span>
            <span className="sr-only">
              {years ? `${Math.floor(parseFloat(years))}` : "22"} years
            </span>
            <span aria-hidden="true"> years</span>
          </p>

          <p className={styles.description}>
            I love turning ideas into real things on the internet
            — products, tools, and experiences that people actually use.
          </p>
        </div>

        <div className={styles.right}>
          <TiltCard />
        </div>
      </div>
    </section>
  );
}
