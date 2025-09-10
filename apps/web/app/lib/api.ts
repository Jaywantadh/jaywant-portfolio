import { projectsData, blogData, userData } from './static-data';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

// Use static data for Vercel deployment, API for local development
const USE_STATIC_DATA = process.env.NODE_ENV === 'production' || !process.env.NEXT_PUBLIC_API_BASE;

export async function fetchProjects() {
  if (USE_STATIC_DATA) {
    return Promise.resolve(projectsData);
  }
  const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
  return res.json();
}

export async function fetchBlog() {
  if (USE_STATIC_DATA) {
    return Promise.resolve(blogData);
  }
  const res = await fetch(`${API_BASE}/blog`, { next: { revalidate: 60 } });
  return res.json();
}

export async function fetchPost(id: string) {
  if (USE_STATIC_DATA) {
    const post = blogData.find(p => p.id === id);
    return Promise.resolve(post || null);
  }
  const res = await fetch(`${API_BASE}/blog/${id}`, { next: { revalidate: 300 } });
  return res.json();
}

export async function fetchResume() {
  if (USE_STATIC_DATA) {
    return Promise.resolve(userData);
  }
  const res = await fetch(`${API_BASE}/users`, { next: { revalidate: 300 } });
  return res.json();
}

