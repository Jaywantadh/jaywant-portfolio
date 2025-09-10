const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
  return res.json();
}

export async function fetchBlog() {
  const res = await fetch(`${API_BASE}/blog`, { next: { revalidate: 60 } });
  return res.json();
}

export async function fetchPost(id: string) {
  const res = await fetch(`${API_BASE}/blog/${id}`, { next: { revalidate: 300 } });
  return res.json();
}

export async function fetchResume() {
  const res = await fetch(`${API_BASE}/users`, { next: { revalidate: 300 } });
  return res.json();
}

