import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Snapshot from "@/components/Snapshot";
import ExperienceItem from "@/components/ExperienceItem";
import Philosophy from "@/components/Philosophy";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import experienceData from "@/content/experience.json";
import projectsData from "@/content/projects.json";

type ProjectStatus = "Shipped" | "In progress" | "R&D";

interface ProjectLinks {
  github?: string;
  demo?: string;
  readme?: string;
  available_on_request?: boolean;
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

        <Section id="snapshot" title="At a Glance" subtitle="A few quick facts about me.">
          <Snapshot />
        </Section>

        <Section id="experience" title="Experience" subtitle="Where I've been building things." dark>
          <div style={{ maxWidth: 640, marginInline: "auto" }}>
            {experienceData.map((exp) => (
              <ExperienceItem key={exp.id} data={exp} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <a
              href="/cv.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "var(--color-accent)",
                color: "#ffffff",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                transition: "background 150ms ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV (PDF)
            </a>
          </div>
        </Section>

        <Section id="philosophy" title="Philosophy" subtitle="How I think about building software.">
          <Philosophy />
        </Section>

        <Section id="projects" title="Projects" subtitle="Things I've built, am building, or exploring." dark>
          <ProjectsSection projects={typedProjects} />
        </Section>

        <Section id="contact" title="Get in Touch" subtitle="Have a project in mind? Let's talk.">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </>
  );
}
