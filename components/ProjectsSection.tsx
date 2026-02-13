"use client";

import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import styles from "./ProjectsSection.module.css";

interface ProjectLinks {
  github?: string;
  demo?: string;
  readme?: string;
  available_on_request?: boolean;
}

interface Project {
  id: string;
  title: string;
  status: "Shipped" | "In progress" | "R&D";
  description: string;
  stack: string[];
  links: ProjectLinks;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.stack.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (tagFilter !== "All" && !p.stack.includes(tagFilter)) return false;
      return true;
    });
  }, [projects, statusFilter, tagFilter]);

  return (
    <div>
      <ProjectFilter
        active={statusFilter}
        tags={allTags}
        activeTag={tagFilter}
        onStatusChange={setStatusFilter}
        onTagChange={setTagFilter}
      />
      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProjectCard key={p.id} data={p} />
        ))}
        {filtered.length === 0 && (
          <p className={styles.empty}>No projects match the current filters.</p>
        )}
      </div>
    </div>
  );
}
