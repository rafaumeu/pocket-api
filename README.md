# InOrbit API

REST API for a weekly goal tracker built with Fastify and Drizzle ORM.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Fastify** | 5.x | HTTP framework with Zod type provider |
| **Drizzle ORM** | 0.38.x | PostgreSQL query builder |
| **PostgreSQL** | — | Relational database |
| **Zod** | 3.x | Schema validation |
| **TypeScript** | 5.x | Type safety |

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/goals` | Create a new weekly goal |
| `POST` | `/completions` | Mark a goal as completed for the day |
| `GET` | `/pending-goals` | Get pending goals for the current week |
| `GET` | `/summary` | Get weekly completion summary |

## Database Schema

- **goals** — `id`, `title`, `desiredWeeklyFrequency`, `createdAt`
- **goalCompletions** — `id`, `goalId` (FK → goals), `createdAt`

## Getting Started

```bash
git clone https://github.com/rafaumeu/inorbit-api.git
cd inorbit-api
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/inorbit
```

```bash
# Run database migrations
npx drizzle-kit migrate

# Seed with sample data
npm run seed

# Start development server
npm run dev
```

The server runs on `http://localhost:3000`.

## Project Structure

```
src/
├── db/          # Database connection, schema, and seed
├── functions/   # Business logic (create goal, create completion, queries)
├── http/
│   ├── routes/  # Route handlers
│   └── server.ts
└── env.ts       # Environment variable validation
```

## License

ISC
