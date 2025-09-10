import { fetchProjects } from '../lib/api';

const categories = ['All', 'Full Stack', 'DevOps', 'AI', 'Low-level'];

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold glow-text">Projects Portfolio</h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          A collection of {projects.length} projects spanning full-stack development, DevOps, AI/ML, and systems programming.
        </p>
      </div>
      
      <CategoryFilters />
      <ProjectsGrid projects={projects} />
    </div>
  );
}

function CategoryFilters() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((c, i) => (
        <span 
          key={c} 
          className="badge cursor-pointer hover:bg-accent/20 hover:text-accent hover:scale-110 transition-all duration-200 pulse-glow"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function ProjectsGrid({ projects }: { projects: any[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p, index) => (
        <div 
          key={p.id} 
          className="card group hover:scale-105 transition-all duration-300"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="badge pulse-glow group-hover:bg-accent/20 group-hover:text-accent transition-all duration-200">
              {p.category}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs text-neutral-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-200 mb-3">
            {p.title}
          </h3>
          
          <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-3">
            {p.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {p.techStack?.slice(0,6).map((t: string, i: number) => (
              <span 
                key={t} 
                className="badge hover:bg-accent/20 hover:text-accent hover:scale-105 transition-all duration-200"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {t}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            {p.link ? (
              <a 
                href={p.link} 
                target="_blank" 
                className="text-sm text-neutral-300 hover:text-accent transition-colors flex items-center gap-1 group"
              >
                <span>Visit Project</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            ) : (
              <span className="text-xs text-neutral-500">Private Repository</span>
            )}
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent/20 to-white/20 group-hover:from-accent/40 group-hover:to-white/40 transition-all duration-300 flex items-center justify-center">
              <span className="text-xs">🚀</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

