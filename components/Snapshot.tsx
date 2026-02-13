import styles from "./Snapshot.module.css";

const CARDS = [
  {
    icon: "📍",
    label: "Location",
    value: "Germany",
  },
  {
    icon: "🎯",
    label: "Current Focus",
    value: "Building products & freelancing",
  },
  {
    icon: "✅",
    label: "Availability",
    value: "Open to projects",
  },
  {
    icon: "🛠",
    label: "Main Stack",
    value: "React · TypeScript · Next.js · Node",
  },
];

export default function Snapshot() {
  return (
    <div className={styles.grid}>
      {CARDS.map((card) => (
        <div key={card.label} className={`${styles.card} reveal`}>
          <span className={styles.icon} aria-hidden="true">{card.icon}</span>
          <p className={styles.label}>{card.label}</p>
          <p className={styles.value}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
