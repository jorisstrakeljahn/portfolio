import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.header}>
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.filename}>philosophy.ts</span>
      </div>
      <pre className={styles.code}>
        <code>{`const philosophy = {
  code: "Clean, readable, and maintainable.",
  approach: "Ship incrementally, learn continuously.",
  tools: "Pick the right tool, not the trendy one.",
  teams: "Great software is built by great teams.",
  users: "Every line of code serves a person.",
};

// I believe in writing software that is
// honest in its simplicity and generous
// in its accessibility. The best code is
// the code that doesn't need explaining.

export default philosophy;`}</code>
      </pre>
    </div>
  );
}
