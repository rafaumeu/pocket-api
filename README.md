<div align="center">

<img src="assets/logo.svg" alt="InOrbit Logo" width="150" height="150" />

# InOrbit

A modern TypeScript backend application powered by Fastify and PostgreSQL.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-Latest-green.svg)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-Latest-orange.svg)](https://orm.drizzle.team/)

---

## 📖 Table of Contents

| [⚡ Tech Stack](#⚡-tech-stack) | [🛠 Development Tools](#🛠-development-tools) | [🚀 Features](#🚀-features) |
|--------------------------------|-----------------------------------------------|----------------------------|
| [📦 Prerequisites](#📦-prerequisites) | [🛠️ Setup](#🛠️-setup) | [🎯 API Endpoints](#🎯-api-endpoints) |
| [🏗️ Project Structure](#🏗️-project-structure) | [🧪 Running Tests](#🧪-running-tests) | [📚 API Documentation](#📚-api-documentation) |
| [🛡️ License](#🛡️-license) | [🤝 Contributing](#🤝-contributing) | [🔧 Environment Variables](#🔧-environment-variables) |

---

### ⚡ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

### 🛠 Development Tools

![Fastify](https://img.shields.io/badge/fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-4053D6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2Z)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)

---
</div>

## 🚀 Features

- **Modern TypeScript**: Built with the latest TypeScript features for type-safe development
- **High Performance**: Powered by Fastify, one of the fastest web frameworks for Node.js
- **Database Integration**: PostgreSQL with Drizzle ORM for efficient data management
- **Docker Ready**: Containerized setup for consistent development and deployment
- **Developer Experience**: Configured with Biome for linting and formatting
- **ID Generation**: Utilizes CUID2 for unique identifier generation
- **Date Handling**: Efficient date manipulation with Day.js
- **Database Seeding**: Built-in seeding functionality for development and testing
- **Schema Validation**: Request/Response validation with Zod and JSON Schema generation
- **Goals Management**: Complete system for creating and tracking goals with completion status

---

## 📦 Prerequisites

- Node.js (Latest LTS version)
- Docker and Docker Compose
- Yarn package manager

---

## 🛠️ Setup

> 🚨 **Important:** Ensure Docker is running before proceeding.

1. Clone the repository:

```bash
git clone https://github.com/rafaumeu/inorbit.git
cd inorbit
```

2. Install dependencies:

```bash
yarn install
```

3. Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

4. Set up your environment variables:

```bash
cp .env.example .env
```

5. Run database migrations:

```bash
yarn migration:run
```

6. Seed the database (optional):

```bash
yarn seed
```

7. Start the development server:

```bash
yarn dev
```

---

## 🎯 API Endpoints

### Goals

- `POST /goals` - Create a new goal
- `GET /pending-goals` - Retrieve pending goals for the current week
- `POST /goal-completions` - Mark a goal as completed

---

## 🏗️ Project Structure

```
inorbit/
├── assets/         # Project-related assets
├── src/
│   ├── db/        # Database configuration and schemas
│   │   ├── index.ts  # Database initialization
│   │   ├── schema.ts # Database schema definitions
│   │   └── seed.ts   # Database seeding functionality
│   ├── functions/ # Business logic
│   │   ├── create-goal.ts
│   │   ├── get-week-pending-goals.ts
│   │   └── create-goal-completion.ts
│   ├── http/      # HTTP server and route handlers
│   └── env.ts     # Environment variable configuration
├── .migrations/   # Database migration files
├── logs.txt      # Application logs
├── drizzle.config.ts # Drizzle ORM configuration
├── biome.json    # Biome linting and formatting config
└── docker-compose.yml
```

---

## 🧪 Running Tests

```bash
yarn test
```

---

## 📚 API Documentation

API documentation is available at `http://localhost:3000/docs` when running the development server. The documentation includes request/response schemas generated from Zod definitions.

---

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/inorbit
PORT=3000
```

---

<div align="center">
Made with ❤️ by Rafael Dias Zendron
</div>

<div align="center">
<img src="https://github.com/rafaumeu.png" width="100" height="100" style="border-radius: 50%;">

### Built with 💜 by Rafael Zendron

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-dias-zendron-528290132/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rafaumeu)

</div>
