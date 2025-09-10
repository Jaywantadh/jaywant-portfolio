import './globals.css';
import Link from 'next/link';
import AnimatedBackground from './components/AnimatedBackground';
import FloatingElements from './components/FloatingElements';

export const metadata = {
  title: 'Jaywant Adhau — Portfolio',
  description: 'Developer in Golang, AI enthusiast, footballer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnimatedBackground />
        <FloatingElements />
        
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-neutral-800/50">
          <nav className="container flex items-center justify-between h-16">
            <Link href="/" className="font-bold tracking-wide text-xl glow-text">JA</Link>
            <div className="flex gap-6 text-sm text-neutral-300">
              <Link href="/" className="hover:text-accent transition-colors duration-200 hover:glow-text">Home</Link>
              <Link href="/projects" className="hover:text-accent transition-colors duration-200 hover:glow-text">Projects</Link>
              <Link href="/blog" className="hover:text-accent transition-colors duration-200 hover:glow-text">Blog</Link>
              <Link href="/resume" className="hover:text-accent transition-colors duration-200 hover:glow-text">Resume</Link>
              <Link href="/contact" className="hover:text-accent transition-colors duration-200 hover:glow-text">Contact</Link>
            </div>
          </nav>
        </header>
        
        <main className="container py-12 relative z-20">{children}</main>
        
        <footer className="border-t border-neutral-800/50 py-8 text-center text-neutral-500 relative z-20 backdrop-blur-sm">
          <div className="glow-text">© {new Date().getFullYear()} Jaywant Adhau</div>
          <div className="mt-2 text-xs opacity-70">Built with ⚡ and ✨</div>
        </footer>
      </body>
    </html>
  );
}

