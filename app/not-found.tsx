import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

export const metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={`container ${styles.content}`}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>
            Page not <span className={styles.accent}>found</span>
          </h1>
          <p className={styles.description}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <a href="/" className={styles.button}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </a>
        </div>
      </main>
      <div className={styles.footerWrap}>
        <Footer />
      </div>
    </>
  );
}
