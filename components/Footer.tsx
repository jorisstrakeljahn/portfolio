import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Joris Strakeljahn. All rights reserved.
        </p>
        <nav className={styles.links} aria-label="Footer navigation">
          <a href="/imprint" className={styles.link}>Imprint</a>
          <a href="/privacy" className={styles.link}>Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}
