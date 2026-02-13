"use client";

import { useEffect, useRef } from "react";
import styles from "./ExperienceSection.module.css";

interface ExperienceEntry {
  id: string;
  date: string;
  now: boolean;
  role: string;
  company: string;
  location: string;
  description: string;
  tech: string[];
}

interface EducationEntry {
  id: string;
  date: string;
  now: boolean;
  title: string;
  institution: string;
  detail: string | null;
}

interface Props {
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

export default function ExperienceSection({ experience, education }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const revealClass = styles.reveal;
    const visibleClass = styles.visible;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.querySelectorAll(`.${revealClass}`).forEach((child) => {
        child.classList.add(visibleClass);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    el.querySelectorAll(`.${revealClass}`).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className={styles.section}>
      <div className="container">
        {/* ===== BIG HEADING: Experience ===== */}
        <div className={`${styles.bigHeading} ${styles.reveal}`}>
          <h2 className={styles.bigTitle}>
            Over <span className={styles.accent}>3&nbsp;years</span> of
            <br />
            building real things
          </h2>
        </div>

        {/* ===== TIMELINE ===== */}
        <div className={styles.timeline}>
          {experience.map((entry) => (
            <div key={entry.id} className={`${styles.entry} ${styles.reveal}`}>
              <div className={styles.entryLeft}>
                <span className={styles.entryDate}>
                  {entry.now && <span className={styles.nowDot} aria-label="Current" />}
                  {entry.date}
                </span>
              </div>
              <div className={styles.entryLine} aria-hidden="true">
                <div className={styles.entryDot} />
              </div>
              <div className={styles.entryRight}>
                <h3 className={styles.entryRole}>{entry.role}</h3>
                <p className={styles.entryCompany}>{entry.company}</p>
                {entry.description && <p className={styles.entryDesc}>{entry.description}</p>}
                {entry.tech.length > 0 && (
                  <div className={styles.entryChips}>
                    {entry.tech.map((t) => (
                      <span key={t} className={styles.chip}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ===== BIG HEADING: Education ===== */}
        <div className={`${styles.bigHeading} ${styles.reveal} ${styles.eduHeading}`}>
          <h2 className={styles.bigTitle}>
            Always <span className={styles.accent}>learning</span>,
            <br />
            always shipping
          </h2>
        </div>

        {/* ===== EDUCATION GRID ===== */}
        <div className={styles.eduGrid}>
          {education.map((entry) => (
            <div key={entry.id} className={`${styles.eduCard} ${styles.reveal}`}>
              <span className={styles.eduDate}>
                {entry.now && <span className={styles.nowDot} aria-label="Current" />}
                {entry.date}
              </span>
              <h3 className={styles.eduTitle}>{entry.title}</h3>
              <p className={styles.eduInstitution}>{entry.institution}</p>
              {entry.detail && <p className={styles.eduDetail}>{entry.detail}</p>}
            </div>
          ))}
        </div>

        {/* ===== CV Download ===== */}
        <div className={`${styles.cvDownload} ${styles.reveal}`}>
          <p className={styles.cvText}>Want the full picture?</p>
          <a href="/cv.pdf" download className={styles.cvButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
