# Jaywant Adhau Portfolio Monorepo

Monorepo containing:
- Frontend: Next.js (TypeScript, Tailwind, App Router).
- Backend: NestJS (TypeScript, PostgreSQL, Prisma).

APIs:
- GET /projects
- GET /blog
- GET /blog/:id
- POST /contact

Run locally:
1. Install deps: `npm install`
2. Start Postgres (Docker recommended): `docker compose up -d db`
3. Set DATABASE_URL in apps/api/.env, then: `npm run db:migrate` and `npm run seed`
4. Dev servers: `npm run dev`

Docker all-in-one: `docker compose up --build`

