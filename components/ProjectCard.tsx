import styles from "./ProjectCard.module.css";

interface ProjectLinks {
  github?: string;
  demo?: string;
  readme?: string;
  available_on_request?: boolean;
}

interface ProjectData {
  id: string;
  title: string;
  status: "Shipped" | "In progress" | "R&D";
  description: string;
  stack: string[];
  links: ProjectLinks;
}

function statusClass(status: string): string {
  if (status === "Shipped") return styles.shipped;
  if (status === "In progress") return styles.inProgress;
  return styles.rd;
}

export default function ProjectCard({ data }: { data: ProjectData }) {
  return (
    <article className={`${styles.card} reveal`}>
      <div className={styles.top}>
        <span className={`${styles.status} ${statusClass(data.status)}`}>
          {data.status}
        </span>
      </div>
      <h3 className={styles.title}>{data.title}</h3>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.chips}>
        {data.stack.map((t) => (
          <span key={t} className={styles.chip}>{t}</span>
        ))}
      </div>
      <div className={styles.links}>
        {data.links.github && (
          <a href={data.links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
            GitHub
          </a>
        )}
        {data.links.demo && (
          <a href={data.links.demo} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Demo
          </a>
        )}
        {data.links.readme && (
          <a href={data.links.readme} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Readme
          </a>
        )}
        {data.links.available_on_request && (
          <span className={styles.onRequest}>Available on request</span>
        )}
      </div>
    </article>
  );
}
