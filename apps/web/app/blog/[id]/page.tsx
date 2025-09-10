import { fetchPost } from '../../lib/api';

type Props = { params: { id: string } };

export default async function BlogPostPage({ params }: Props) {
  const post = await fetchPost(params.id);
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-neutral-400 mb-8">{new Date(post.createdAt).toLocaleString()}</div>
      <div className="space-y-4 text-neutral-200 leading-7 whitespace-pre-wrap">{post.content}</div>
      <div className="mt-8 flex gap-2">
        {post.tags?.map((t: string) => <span key={t} className="badge">{t}</span>)}
      </div>
    </article>
  );
}

