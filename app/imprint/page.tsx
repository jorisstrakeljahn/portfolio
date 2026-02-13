import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata = {
  title: "Imprint — Joris Strakeljahn",
  description: "Legal notice and imprint as required by German law (§ 5 DDG).",
};

export default function ImprintPage() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className="container">
            <a href="/" className={styles.backLink}>
              &larr; Back to Home
            </a>
            <h1 className={styles.title}>Imprint</h1>
            <div className={styles.content}>
              <h2>Information pursuant to § 5 DDG</h2>
              <p>
                <strong>Joris Strakeljahn</strong>
                <br />
                Strotheide 5a
                <br />
                33330 Gütersloh
                <br />
                Germany
              </p>

              <h2>Contact</h2>
              <p>
                Email:{" "}
                <a href="mailto:joris.strakeljahn@web.de">
                  joris.strakeljahn@web.de
                </a>
              </p>

              <h2>
                Responsible for content pursuant to § 18 (2) MStV
              </h2>
              <p>
                <strong>Joris Strakeljahn</strong>
                <br />
                Strotheide 5a
                <br />
                33330 Gütersloh
              </p>

              <h2>EU Dispute Resolution</h2>
              <p>
                The European Commission provides a platform for online
                dispute resolution (ODR):{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                .
              </p>
              <p>You can find my email address in the imprint above.</p>

              <h2>Consumer Dispute Resolution</h2>
              <p>
                I am not willing or obliged to participate in dispute
                resolution proceedings before a consumer arbitration board.
              </p>

              <h2>Liability for Content</h2>
              <p>
                As a service provider, I am responsible for my own content
                on these pages in accordance with general legislation
                pursuant to § 7 (1) DDG. However, according to §§ 8 to 10
                DDG, I am not obligated to monitor transmitted or stored
                third-party information or to investigate circumstances that
                indicate illegal activity.
              </p>
              <p>
                Obligations to remove or block the use of information under
                general law remain unaffected. However, liability in this
                regard is only possible from the point in time at which a
                concrete infringement of the law becomes known. If I become
                aware of any such infringements, I will remove this content
                immediately.
              </p>

              <h2>Liability for Links</h2>
              <p>
                My website contains links to external third-party websites
                over whose content I have no influence. Therefore, I cannot
                accept any liability for this third-party content. The
                respective provider or operator of the linked pages is
                always responsible for the content of the linked pages. The
                linked pages were checked for possible legal violations at
                the time of linking. Illegal content was not recognisable at
                the time of linking.
              </p>
              <p>
                However, permanent monitoring of the content of the linked
                pages is not reasonable without concrete evidence of a
                violation of the law. If I become aware of any
                infringements, I will remove such links immediately.
              </p>

              <h2>Copyright</h2>
              <p>
                The content and works created by the site operator on these
                pages are subject to German copyright law. The
                reproduction, editing, distribution, and any kind of
                exploitation outside the limits of copyright require the
                written consent of the respective author or creator.
                Downloads and copies of this site are only permitted for
                private, non-commercial use.
              </p>
              <p>
                Insofar as the content on this site was not created by the
                operator, the copyrights of third parties are respected. In
                particular, third-party content is identified as such.
                Should you nevertheless become aware of a copyright
                infringement, please inform me accordingly. If I become
                aware of any infringements, I will remove such content
                immediately.
              </p>

              <p className={styles.lastUpdated}>
                Last updated: February 2026
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
