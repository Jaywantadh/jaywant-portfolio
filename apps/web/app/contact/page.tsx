'use client';
import { useState } from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <ContactForm />
    </div>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    
    // For static deployment, just simulate form submission
    const isStatic = process.env.NODE_ENV === 'production' || !process.env.NEXT_PUBLIC_API_BASE;
    
    try {
      setLoading(true);
      setStatus(null);
      
      if (isStatic) {
        // Simulate API call for static deployment
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('Thanks for your message! This is a demo - please contact via LinkedIn or GitHub.');
        form.reset();
      } else {
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus('Message sent. Thank you!');
        form.reset();
      }
    } catch (e) {
      setStatus('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 card">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input name="name" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" name="email" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Message</label>
        <textarea name="message" rows={5} required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2" />
      </div>
      <button disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? 'Sending...' : 'Send message'}
      </button>
      {status && <p className="text-sm text-neutral-400">{status}</p>}
    </form>
  );
}

