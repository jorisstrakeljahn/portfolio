import styles from "./ExperienceItem.module.css";

interface ExperienceData {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  bullets: string[];
  tech: string[];
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExperienceItem({ data }: { data: ExperienceData }) {
  return (
    <div className={`${styles.item} reveal`}>
      <div className={styles.marker} aria-hidden="true">
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.role}>{data.role}</h3>
          <p className={styles.meta}>
            {data.company} · {data.location}
          </p>
          <p className={styles.date}>
            {formatDate(data.startDate)} — {data.endDate ? formatDate(data.endDate) : "Present"}
          </p>
        </div>
        <ul className={styles.bullets}>
          {data.bullets.map((bullet, i) => (
            <li key={i} className={styles.bullet}>{bullet}</li>
          ))}
        </ul>
        <div className={styles.chips}>
          {data.tech.map((t) => (
            <span key={t} className={styles.chip}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
