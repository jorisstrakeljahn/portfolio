"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import styles from "./TiltCard.module.css";

const HEX_CODE = "#4A2F1B";

export default function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafId = useRef<number>(undefined);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const card = cardRef.current;
      if (!card) return;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateX = ((centerY - y) / centerY) * 15;

        setTransform(
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
        );

        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlare({ x: glareX, y: glareY, opacity: 0.15 });
      });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* 
        Hitbox: larger invisible area that catches mouse events.
        This prevents the jitter bug at card edges when the tilt
        moves the card out from under the cursor.
      */}
      <div
        className={styles.hitbox}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className={styles.card}
          style={{ transform }}
        >
          <div
            className={styles.glare}
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />

          <div className={styles.imageWrapper}>
            <img
              src="/images/portrait.png"
              alt="Joris Strakeljahn portrait illustration"
              className={styles.image}
              draggable={false}
            />
          </div>

          <div className={styles.bottom}>
            <span className={styles.name}>Joris Strakeljahn</span>
            <span className={styles.hex}>{HEX_CODE}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
