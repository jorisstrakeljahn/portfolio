import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Joris Strakeljahn",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "60vh", padding: "8rem 0 4rem" }}>
        <div className="container">
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, marginBottom: "var(--space-6)", color: "var(--color-text)" }}>
            Privacy Policy
          </h1>
          <div style={{ maxWidth: 640, color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-text)", marginBottom: "var(--space-3)", marginTop: "var(--space-6)" }}>
              1. Overview
            </h2>
            <p style={{ marginBottom: "var(--space-4)" }}>
              This is a placeholder privacy policy. Replace this content with your actual privacy policy as required by applicable data protection laws (e.g., GDPR, DSGVO).
            </p>

            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-text)", marginBottom: "var(--space-3)", marginTop: "var(--space-6)" }}>
              2. Data Collection
            </h2>
            <p style={{ marginBottom: "var(--space-4)" }}>
              The contact form collects your name, email address, and message. This data is used solely to respond to your inquiry.
            </p>

            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-text)", marginBottom: "var(--space-3)", marginTop: "var(--space-6)" }}>
              3. Contact
            </h2>
            <p style={{ marginBottom: "var(--space-4)" }}>
              For privacy-related questions, contact: your.email@example.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
