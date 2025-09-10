import Link from 'next/link';
import { fetchBlog } from '../lib/api';

export default async function BlogPage() {
  const posts = await fetchBlog();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <div className="grid gap-6">
        {posts.map((p: any) => (
          <Link href={`/blog/${p.id}`} key={p.id} className="card block">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-neutral-400 line-clamp-2">{p.content}</p>
            <div className="mt-3 flex gap-2">
              {p.tags?.slice(0,4).map((t: string) => <span key={t} className="badge">{t}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

