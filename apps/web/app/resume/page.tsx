import { fetchResume } from '../lib/api';

export default async function ResumePage() {
  const user = await fetchResume();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Resume</h1>
        <p className="mt-2 text-neutral-300">{user?.name} — {user?.bio}</p>
        <div className="mt-2 space-x-4">
          {user?.github && <a href={user.github} className="text-sm text-neutral-400 hover:text-white">GitHub</a>}
          {user?.linkedin && <a href={user.linkedin} className="text-sm text-neutral-400 hover:text-white">LinkedIn</a>}
        </div>
      </header>

      <section className="card">
        <h2 className="text-xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user?.skills?.map((s: string) => (
            <span key={s} className="badge">{s}</span>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-3">Experience & Highlights</h2>
        <ul className="list-disc pl-5 text-neutral-300 space-y-2">
          <li>Full-stack development with Next.js and NestJS.</li>
          <li>DevOps tooling with Docker, Kafka, Prometheus/Grafana, and AWS.</li>
          <li>AI/ML case studies and systems, including RAG and Transformers.</li>
          <li>Low-level systems in C/C++/Go (HTTP server, shell, allocator, bootloader).</li>
        </ul>
      </section>
    </div>
  );
}

