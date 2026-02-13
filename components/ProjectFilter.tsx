"use client";

import styles from "./ProjectFilter.module.css";

const STATUSES = ["All", "Shipped", "In progress", "R&D"];

interface ProjectFilterProps {
  active: string;
  tags: string[];
  activeTag: string;
  onStatusChange: (status: string) => void;
  onTagChange: (tag: string) => void;
}

export default function ProjectFilter({
  active,
  tags,
  activeTag,
  onStatusChange,
  onTagChange,
}: ProjectFilterProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.group}>
        <span className={styles.label}>Status:</span>
        <div className={styles.chips} role="radiogroup" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button
              key={s}
              className={`${styles.chip} ${active === s ? styles.active : ""}`}
              onClick={() => onStatusChange(s)}
              role="radio"
              aria-checked={active === s}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.group}>
        <span className={styles.label}>Tech:</span>
        <div className={styles.chips} role="radiogroup" aria-label="Filter by technology">
          <button
            className={`${styles.chip} ${activeTag === "All" ? styles.active : ""}`}
            onClick={() => onTagChange("All")}
            role="radio"
            aria-checked={activeTag === "All"}
            type="button"
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              className={`${styles.chip} ${activeTag === t ? styles.active : ""}`}
              onClick={() => onTagChange(t)}
              role="radio"
              aria-checked={activeTag === t}
              type="button"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
