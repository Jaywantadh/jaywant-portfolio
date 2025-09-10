// Static data for Vercel deployment (no backend needed)
export const userData = {
  id: "static-user",
  name: "Jaywant Adhau",
  bio: "Developer in Golang, AI enthusiast, footballer.",
  skills: ["Golang", "React", "Next.js", "NestJS", "Docker", "Kafka", "Prometheus", "Grafana", "AWS", "C", "C++", "AI/ML"],
  github: "https://github.com/jaywant-adhau",
  linkedin: "https://www.linkedin.com/in/jaywant-adhau",
  email: "jaywant.adhau@example.com"
};

export const projectsData = [
  // Full Stack
  { id: "1", title: "Personal Portfolio + Blog System", category: "Full Stack", techStack: ["Next.js","NestJS","PostgreSQL","Prisma","Tailwind"], link: null, description: "A personal portfolio with integrated blog and CMS-like backend.", createdAt: "2025-09-10T10:00:00Z" },
  { id: "2", title: "Real-time Chat App (Slack Lite)", category: "Full Stack", techStack: ["Next.js","NestJS","WebSocket","Redis"], link: null, description: "Channels, DMs, presence, and message history.", createdAt: "2025-09-09T10:00:00Z" },
  { id: "3", title: "E-commerce Mini App", category: "Full Stack", techStack: ["Next.js","NestJS","Stripe","PostgreSQL"], link: null, description: "Products, cart, checkout, and orders.", createdAt: "2025-09-08T10:00:00Z" },
  { id: "4", title: "Task Manager (Trello Lite)", category: "Full Stack", techStack: ["React","NestJS","DragDrop"], link: null, description: "Boards, lists, cards with drag-and-drop.", createdAt: "2025-09-07T10:00:00Z" },
  { id: "5", title: "SaaS Dashboard (Analytics)", category: "Full Stack", techStack: ["Next.js","NestJS","Charting"], link: null, description: "KPIs, charts, and auth.", createdAt: "2025-09-06T10:00:00Z" },

  // DevOps
  { id: "6", title: "Dockerized Full Stack App", category: "DevOps", techStack: ["Docker","Compose","Next.js","NestJS"], link: null, description: "Containerized services with compose.", createdAt: "2025-09-05T10:00:00Z" },
  { id: "7", title: "CI/CD with GitHub Actions", category: "DevOps", techStack: ["GitHub Actions","Docker","Node"], link: null, description: "Build, test, and deploy pipelines.", createdAt: "2025-09-04T10:00:00Z" },
  { id: "8", title: "Monitoring & Metrics (Prometheus + Grafana)", category: "DevOps", techStack: ["Prometheus","Grafana","Node Exporter"], link: null, description: "Dashboards and alerts.", createdAt: "2025-09-03T10:00:00Z" },
  { id: "9", title: "Kafka Event-Driven System", category: "DevOps", techStack: ["Kafka","NestJS","Docker"], link: null, description: "Producers, consumers, and topics.", createdAt: "2025-09-02T10:00:00Z" },
  { id: "10", title: "AWS Deployment (ECS + S3 + CloudFront)", category: "DevOps", techStack: ["AWS","ECS","S3","CloudFront"], link: null, description: "Infra as code and deployment.", createdAt: "2025-09-01T10:00:00Z" },

  // AI/ML
  { id: "11", title: "Transformer Case Study", category: "AI", techStack: ["Python","Transformers"], link: null, description: "Attention mechanisms and architectures.", createdAt: "2025-08-31T10:00:00Z" },
  { id: "12", title: "RAG Case Study", category: "AI", techStack: ["Python","LangChain","Vector DB"], link: null, description: "Retrieval augmented generation pipeline.", createdAt: "2025-08-30T10:00:00Z" },
  { id: "13", title: "GenAI Case Study", category: "AI", techStack: ["Python","LLMs"], link: null, description: "Generative modeling and evaluation.", createdAt: "2025-08-29T10:00:00Z" },
  { id: "14", title: "AI-Powered Resume Screener", category: "AI", techStack: ["Python","LLMs","Embeddings"], link: null, description: "Screen resumes using semantic matching.", createdAt: "2025-08-28T10:00:00Z" },
  { id: "15", title: "Image Caption Generator", category: "AI", techStack: ["Python","CNN","RNN"], link: null, description: "Model to generate image captions.", createdAt: "2025-08-27T10:00:00Z" },
  { id: "16", title: "AI Chatbot with Memory (RAG)", category: "AI", techStack: ["Python","LangChain","FAISS"], link: null, description: "Chatbot with retrieval-based memory.", createdAt: "2025-08-26T10:00:00Z" },

  // Low-level
  { id: "17", title: "File Compression Utility (C++)", category: "Low-level", techStack: ["C++"], link: null, description: "Huffman/LZ compression tool.", createdAt: "2025-08-25T10:00:00Z" },
  { id: "18", title: "HTTP Server in Go", category: "Low-level", techStack: ["Go"], link: null, description: "From-scratch HTTP server with routing.", createdAt: "2025-08-24T10:00:00Z" },
  { id: "19", title: "Simple Shell (C)", category: "Low-level", techStack: ["C"], link: null, description: "Interactive shell supporting builtins.", createdAt: "2025-08-23T10:00:00Z" },
  { id: "20", title: "Memory Allocator (C++)", category: "Low-level", techStack: ["C++"], link: null, description: "Custom malloc/free implementation.", createdAt: "2025-08-22T10:00:00Z" },
  { id: "21", title: "Mini Git (Go)", category: "Low-level", techStack: ["Go"], link: null, description: "Content-addressable storage and commits.", createdAt: "2025-08-21T10:00:00Z" },

  // Additional advanced projects
  { id: "22", title: "DisktroByte – P2P Distributed File System (Go)", category: "Low-level", techStack: ["Go","LZ4","ChaCha20-Poly1305"], link: null, description: "P2P DFS with compression and encryption.", createdAt: "2025-08-20T10:00:00Z" },
  { id: "23", title: "Universal Clipboard (Go, NextJS, Docker, MongoDB)", category: "Full Stack", techStack: ["Go","Next.js","Docker","MongoDB","S3"], link: null, description: "Online clipboard with secure storage.", createdAt: "2025-08-19T10:00:00Z" },
  { id: "24", title: "Clinic Management System (Go, NextJS, AWS, WebRTC, Redis)", category: "Full Stack", techStack: ["Go","Next.js","AWS","WebRTC","Redis"], link: null, description: "Real-time queue and appointments.", createdAt: "2025-08-18T10:00:00Z" },
  { id: "25", title: "Full-Text Search Engine (Go)", category: "Low-level", techStack: ["Go"], link: null, description: "Concurrent indexing with microsecond queries.", createdAt: "2025-08-17T10:00:00Z" },
  { id: "26", title: "File Encryption Tool (Go)", category: "Low-level", techStack: ["Go","AES-256"], link: null, description: "CLI encryption/decryption utility.", createdAt: "2025-08-16T10:00:00Z" },
  { id: "27", title: "Custom OS Bootloader (C/Assembly)", category: "Low-level", techStack: ["C","ASM"], link: null, description: "32-bit bootloader demo.", createdAt: "2025-08-15T10:00:00Z" }
];

export const blogData = [
  { id: "1", title: "Building my portfolio stack", content: "Here are my thoughts on building this portfolio using Next.js and NestJS...", tags: ["Next.js","NestJS","Prisma"], createdAt: "2025-09-10T10:00:00Z" },
  { id: "2", title: "From systems to AI", content: "My journey from low-level systems programming to AI and machine learning...", tags: ["AI","Go","C++"], createdAt: "2025-09-09T10:00:00Z" }
];
