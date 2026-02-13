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

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
