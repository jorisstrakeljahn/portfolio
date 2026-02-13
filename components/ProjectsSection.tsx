import ProjectCard from "./ProjectCard";
import styles from "./ProjectsSection.module.css";

interface ProjectLinks {
  github?: string;
  website?: string;
}

interface Project {
  id: string;
  title: string;
  status: "Shipped" | "Coming soon" | "Confidential";
  description: string;
  stack: string[];
  links: ProjectLinks;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div className={`${styles.grid} reveal`}>
      {projects.map((p) => (
        <ProjectCard key={p.id} data={p} />
      ))}
    </div>
  );
}
