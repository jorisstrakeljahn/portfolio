import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import Section from "@/components/Section";
import Philosophy from "@/components/Philosophy";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import cvData from "@/content/experience.json";
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

        <ExperienceSection
          experience={cvData.experience}
          education={cvData.education}
        />

        <Section id="philosophy">
          <Philosophy />
        </Section>

        <Section id="projects" title="Projects" subtitle="Things I've built, am building, or exploring.">
          <ProjectsSection projects={typedProjects} />
        </Section>

        <Section id="contact" title="Get in Touch" subtitle="Have a project in mind? Let's talk." dark>
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </>
  );
}
