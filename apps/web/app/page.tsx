import Link from 'next/link';
import { fetchProjects } from './lib/api';

export default async function HomePage() {
  const projects = await fetchProjects();
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight glow-text animate-pulse">
              Jaywant Adhau
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="mt-4 text-neutral-300 max-w-prose text-lg leading-relaxed">
              Developer in <span className="text-accent font-semibold">Golang</span>, AI enthusiast, footballer. 
              Building systems, AI experiences, and elegant products that push boundaries.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Link href="/projects" className="btn-primary group">
              <span>View Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700 hover:border-accent text-neutral-300 hover:text-accent transition-all duration-300 hover:bg-accent/10">
              <span>Contact</span>
              <span className="text-lg">✨</span>
            </Link>
          </div>
        </div>
        
        <div className="card float pulse-glow">
          <div className="text-sm text-neutral-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            Featured Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {['Go','Next.js','NestJS','Postgres','Prisma','Docker','Kafka','Prometheus','Grafana','AWS'].map((t, i) => (
              <span 
                key={t} 
                className="badge hover:scale-110 transition-transform duration-200"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
            <div className="text-xs text-neutral-500 mb-2">Current Focus</div>
            <div className="text-sm text-neutral-300">Distributed Systems • AI/ML • System Programming</div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold glow-text">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-neutral-400 hover:text-accent transition-colors group">
            <span>See all</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform ml-1">→</span>
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p: any, index: number) => (
            <div 
              key={p.id} 
              className="card group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="badge pulse-glow">{p.category}</span>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-white opacity-60 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-200">{p.title}</h3>
              <p className="mt-3 text-sm text-neutral-400 line-clamp-3 leading-relaxed">{p.description}</p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {p.techStack?.slice(0,4).map((t: string) => (
                  <span key={t} className="badge hover:bg-accent/20 hover:text-accent transition-colors duration-200">{t}</span>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-800 text-right">
                <span className="text-xs text-neutral-500 group-hover:text-accent transition-colors">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
        {[
          { label: 'Projects', value: '26+', icon: '🚀' },
          { label: 'Technologies', value: '15+', icon: '⚙️' },
          { label: 'Experience', value: '3+ yrs', icon: '⭐' },
          { label: 'Coffee Cups', value: '∞', icon: '☕' }
        ].map((stat, i) => (
          <div key={stat.label} className="text-center card hover:scale-105 transition-transform" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-accent glow-text">{stat.value}</div>
            <div className="text-sm text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

