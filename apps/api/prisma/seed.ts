import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert User (Resume data)
  await prisma.user.upsert({
    where: { email: 'jaywant.adhau@example.com' },
    update: {},
    create: {
      name: 'Jaywant Adhau',
      bio: 'Developer in Golang, AI enthusiast, footballer.',
      skills: JSON.stringify(['Golang', 'React', 'Next.js', 'NestJS', 'Docker', 'Kafka', 'Prometheus', 'Grafana', 'AWS', 'C', 'C++', 'AI/ML']),
      github: 'https://github.com/jaywant-adhau',
      linkedin: 'https://www.linkedin.com/in/jaywant-adhau',
      email: 'jaywant.adhau@example.com'
    }
  });

  const projects = [
    // Full Stack
    { title: 'Personal Portfolio + Blog System', category: 'Full Stack', techStack: JSON.stringify(['Next.js','NestJS','PostgreSQL','Prisma','Tailwind']), description: 'A personal portfolio with integrated blog and CMS-like backend.' },
    { title: 'Real-time Chat App (Slack Lite)', category: 'Full Stack', techStack: JSON.stringify(['Next.js','NestJS','WebSocket','Redis']), description: 'Channels, DMs, presence, and message history.' },
    { title: 'E-commerce Mini App', category: 'Full Stack', techStack: JSON.stringify(['Next.js','NestJS','Stripe','PostgreSQL']), description: 'Products, cart, checkout, and orders.' },
    { title: 'Task Manager (Trello Lite)', category: 'Full Stack', techStack: JSON.stringify(['React','NestJS','DragDrop']), description: 'Boards, lists, cards with drag-and-drop.' },
    { title: 'SaaS Dashboard (Analytics)', category: 'Full Stack', techStack: JSON.stringify(['Next.js','NestJS','Charting']), description: 'KPIs, charts, and auth.' },

    // DevOps
    { title: 'Dockerized Full Stack App', category: 'DevOps', techStack: JSON.stringify(['Docker','Compose','Next.js','NestJS']), description: 'Containerized services with compose.' },
    { title: 'CI/CD with GitHub Actions', category: 'DevOps', techStack: JSON.stringify(['GitHub Actions','Docker','Node']), description: 'Build, test, and deploy pipelines.' },
    { title: 'Monitoring & Metrics (Prometheus + Grafana)', category: 'DevOps', techStack: JSON.stringify(['Prometheus','Grafana','Node Exporter']), description: 'Dashboards and alerts.' },
    { title: 'Kafka Event-Driven System', category: 'DevOps', techStack: JSON.stringify(['Kafka','NestJS','Docker']), description: 'Producers, consumers, and topics.' },
    { title: 'AWS Deployment (ECS + S3 + CloudFront)', category: 'DevOps', techStack: JSON.stringify(['AWS','ECS','S3','CloudFront']), description: 'Infra as code and deployment.' },

    // AI/ML
    { title: 'Transformer Case Study', category: 'AI', techStack: JSON.stringify(['Python','Transformers']), description: 'Attention mechanisms and architectures.' },
    { title: 'RAG Case Study', category: 'AI', techStack: JSON.stringify(['Python','LangChain','Vector DB']), description: 'Retrieval augmented generation pipeline.' },
    { title: 'GenAI Case Study', category: 'AI', techStack: JSON.stringify(['Python','LLMs']), description: 'Generative modeling and evaluation.' },
    { title: 'AI-Powered Resume Screener', category: 'AI', techStack: JSON.stringify(['Python','LLMs','Embeddings']), description: 'Screen resumes using semantic matching.' },
    { title: 'Image Caption Generator', category: 'AI', techStack: JSON.stringify(['Python','CNN','RNN']), description: 'Model to generate image captions.' },
    { title: 'AI Chatbot with Memory (RAG)', category: 'AI', techStack: JSON.stringify(['Python','LangChain','FAISS']), description: 'Chatbot with retrieval-based memory.' },

    // Low-level
    { title: 'File Compression Utility (C++)', category: 'Low-level', techStack: JSON.stringify(['C++']), description: 'Huffman/LZ compression tool.' },
    { title: 'HTTP Server in Go', category: 'Low-level', techStack: JSON.stringify(['Go']), description: 'From-scratch HTTP server with routing.' },
    { title: 'Simple Shell (C)', category: 'Low-level', techStack: JSON.stringify(['C']), description: 'Interactive shell supporting builtins.' },
    { title: 'Memory Allocator (C++)', category: 'Low-level', techStack: JSON.stringify(['C++']), description: 'Custom malloc/free implementation.' },
    { title: 'Mini Git (Go)', category: 'Low-level', techStack: JSON.stringify(['Go']), description: 'Content-addressable storage and commits.' },

    // Additional advanced projects listed
    { title: 'DisktroByte – P2P Distributed File System (Go)', category: 'Low-level', techStack: JSON.stringify(['Go','LZ4','ChaCha20-Poly1305']), description: 'P2P DFS with compression and encryption.' },
    { title: 'Universal Clipboard (Go, NextJS, Docker, MongoDB)', category: 'Full Stack', techStack: JSON.stringify(['Go','Next.js','Docker','MongoDB','S3']), description: 'Online clipboard with secure storage.' },
    { title: 'Clinic Management System (Go, NextJS, AWS, WebRTC, Redis)', category: 'Full Stack', techStack: JSON.stringify(['Go','Next.js','AWS','WebRTC','Redis']), description: 'Real-time queue and appointments.' },
    { title: 'Full-Text Search Engine (Go)', category: 'Low-level', techStack: JSON.stringify(['Go']), description: 'Concurrent indexing with microsecond queries.' },
    { title: 'File Encryption Tool (Go)', category: 'Low-level', techStack: JSON.stringify(['Go','AES-256']), description: 'CLI encryption/decryption utility.' },
    { title: 'Custom OS Bootloader (C/Assembly)', category: 'Low-level', techStack: JSON.stringify(['C','ASM']), description: '32-bit bootloader demo.' },
  ];

  // Insert projects (avoid duplicates by title)
  for (const p of projects) {
    await prisma.project.upsert({
      where: { title: p.title },
      update: {},
      create: {
        title: p.title,
        description: p.description,
        category: p.category,
        techStack: p.techStack,
      },
    });
  }

  // Sample blog posts
  const blogPosts = [
    { title: 'Building my portfolio stack', content: 'Here are my thoughts on building this portfolio using Next.js and NestJS...', tags: JSON.stringify(['Next.js','NestJS','Prisma']) },
    { title: 'From systems to AI', content: 'My journey from low-level systems programming to AI and machine learning...', tags: JSON.stringify(['AI','Go','C++']) }
  ];
  
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { title: post.title },
      update: {},
      create: post,
    });
  }
}

main()
  .then(() => console.log('Seed complete'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

