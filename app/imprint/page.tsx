import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Imprint — Joris Strakeljahn",
};

export default function ImprintPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "60vh", padding: "8rem 0 4rem" }}>
        <div className="container">
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, marginBottom: "var(--space-6)", color: "var(--color-text)" }}>
            Imprint
          </h1>
          <div style={{ maxWidth: 640, color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
            <p style={{ marginBottom: "var(--space-4)" }}>
              <strong style={{ color: "var(--color-text)" }}>Joris Strakeljahn</strong><br />
              Your Street 123<br />
              12345 City, Germany
            </p>
            <p style={{ marginBottom: "var(--space-4)" }}>
              Email: your.email@example.com
            </p>
            <p style={{ marginBottom: "var(--space-4)" }}>
              This is a placeholder. Replace with your full legal imprint as required by applicable laws (e.g., § 5 TMG for Germany).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
