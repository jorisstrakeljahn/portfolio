import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import Section from "@/components/Section";
import Philosophy from "@/components/Philosophy";
import ProjectsSection from "@/components/ProjectsSection";
import GetInTouch from "@/components/GetInTouch";
import Footer from "@/components/Footer";

import cvData from "@/content/experience.json";
import projectsData from "@/content/projects.json";
import styles from "./page.module.css";

type ProjectStatus = "Shipped" | "Coming soon" | "Confidential";

interface ProjectLinks {
  github?: string;
  website?: string;
}

interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  stack: string[];
  links: ProjectLinks;
}

const typedProjects: Project[] = projectsData as Project[];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Joris Strakeljahn",
      url: "https://jorisstrakeljahn.de",
      description:
        "Personal portfolio of Joris Strakeljahn — indie hacker, freelancer, and student building products on the internet.",
    },
    {
      "@type": "Person",
      name: "Joris Strakeljahn",
      url: "https://jorisstrakeljahn.de",
      jobTitle: "Full-Stack Developer & Indie Hacker",
      email: "joris.strakeljahn@web.de",
      image: "https://jorisstrakeljahn.de/images/portrait.png",
      sameAs: [
        "https://github.com/jorisstrakeljahn",
        "https://www.linkedin.com/in/joris-strakeljahn/",
        "https://x.com/jstrakeljahnx",
      ],
      knowsAbout: [
        "React",
        "TypeScript",
        "Next.js",
        "Web Development",
        "Software Engineering",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main-content" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />

        <ExperienceSection
          experience={cvData.experience}
          education={cvData.education}
        />

        <Section id="philosophy">
          <Philosophy />
        </Section>

        <div className={styles.whiteZone}>
          <div className={styles.transition} aria-hidden="true">
            <div className={styles.transitionBg} />
            <div className={styles.transitionBlur} />
            <div className={styles.transitionFade} />
          </div>

          {/* Floating islands — light section decoration */}
          <img
            src="/images/island-light-1.png"
            alt=""
            aria-hidden="true"
            className={`${styles.floatingIsland} ${styles.islandLight1}`}
            draggable={false}
          />
          <img
            src="/images/island-light-2.png"
            alt=""
            aria-hidden="true"
            className={`${styles.floatingIsland} ${styles.islandLight2}`}
            draggable={false}
          />

          <Section id="projects" light className={styles.projectsSection}>
            <div className={styles.projectsHeader}>
              <h2 className={styles.projectsTitle}>
                My <span className={styles.projectsAccent}>Projects</span>
              </h2>
              <p className={styles.projectsSubtitle}>
                Things I&apos;ve built, am building, or exploring.
              </p>
            </div>
            <ProjectsSection projects={typedProjects} />
          </Section>

          <GetInTouch />
          <Footer />
        </div>
      </main>
    </>
  );
}
