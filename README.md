<div align="center">

<img src="assets/logo.svg" alt="InOrbit Logo" width="150" height="150" />

# InOrbit

A modern TypeScript habit tracking API powered by Fastify and PostgreSQL.

[![GitHub stars](https://img.shields.io/github/stars/rafaumeu/pocket-api?style=for-the-badge&logo=github)](https://github.com/rafaumeu/pocket-api/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/rafaumeu/pocket-api?style=for-the-badge&logo=github)](https://github.com/rafaumeu/pocket-api/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/rafaumeu/pocket-api?style=for-the-badge&logo=github)](https://github.com/rafaumeu/pocket-api/commits/main)
[![CI Status](https://img.shields.io/github/actions/workflow/status/rafaumeu/pocket-api/ci.yml?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/rafaumeu/pocket-api/actions)
[![codecov](https://codecov.io/gh/rafaumeu/pocket-api/branch/v2/graph/badge.svg?token=ISQBZ49D6E)](https://codecov.io/gh/rafaumeu/pocket-api)
---

## 📖 Table of Contents

| [⚡ Tech Stack](#⚡-tech-stack) | [🛠 Development Tools](#🛠-development-tools) | [🚀 Features](#🚀-features) |
|--------------------------------|-----------------------------------------------|----------------------------|
| [📦 Prerequisites](#📦-prerequisites) | [🛠️ Setup](#🛠️-setup) | [🎯 API Endpoints](#🎯-api-endpoints) |
| [🏗️ Project Structure](#🏗️-project-structure) | [🧪 Running Tests](#🧪-running-tests) | [📚 API Documentation](#📚-api-documentation) |
| [🛡️ License](#🛡️-license) | [🤝 Contributing](#🤝-contributing) | [🔧 Environment Variables](#🔧-environment-variables) |

---

### ⚡ Tech Stack

[![TypeScript](https://img.shields.io/github/package-json/dependency-version/rafaumeu/pocket-api/dev/typescript?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/github/package-json/dependency-version/rafaumeu/pocket-api/fastify?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/github/package-json/dependency-version/rafaumeu/pocket-api/postgres?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
![Node.js](https://img.shields.io/badge/Node.js->=16.0.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
---

### 🛠 Development Tools

[![Drizzle ORM](https://img.shields.io/github/package-json/dependency-version/rafaumeu/pocket-api/drizzle-orm?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2Z&label=Drizzle%20ORM)](https://orm.drizzle.team/)
[![Zod](https://img.shields.io/github/package-json/dependency-version/rafaumeu/pocket-api/dev/zod?style=for-the-badge&logo=zod&logoColor=white)](https://github.com/colinhacks/zod)
![Vitest](https://img.shields.io/badge/Vitest-^3.0.2-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
[![Day.js](https://img.shields.io/github/package-json/dependency-version/rafaumeu/pocket-api/dayjs?style=for-the-badge&logo=javascript&logoColor=white)](https://day.js.org/)
![JWT](https://img.shields.io/badge/JWT-^9.0.3-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
---

</div>

### 🚀 Features

- **Modern TypeScript**: Built with the latest TypeScript features for type-safe development
- **High Performance**: Powered by Fastify, one of the fastest web frameworks for Node.js
- **Database Integration**: PostgreSQL with Drizzle ORM for efficient data management
- **Docker Ready**: Containerized setup for consistent development and deployment
- **Developer Experience**: Configured with Biome for linting and formatting
- **ID Generation**: Utilizes CUID2 for unique identifier generation
- **Date Handling**: Efficient date manipulation with Day.js
- **Database Seeding**: Built-in seeding functionality for development and testing
- **Schema Validation**: Request/Response validation with Zod and JSON Schema generation
- **GitHub Authentication**: OAuth integration with GitHub for user authentication
- **JWT Authentication**: Secure route protection with JSON Web Tokens
- **Goals Management**: Complete system for creating and tracking goals with completion status
- **CORS Support**: Enabled with `@fastify/cors` for cross-origin requests
- **Pending Goals and Summaries**: Retrieve and summarize goals for the current week
- **Gamification System**: Experience points and leveling system for user engagement
- **Comprehensive Testing**: Full test suite using Vitest with factories and utilities
- **Swagger Documentation**: Interactive API documentation with OpenAPI/Swagger
- **CI/CD Pipeline**: GitHub Actions workflow for continuous integration and code coverage reporting

---

## 📦 Prerequisites

- Node.js (Latest LTS version)
- Docker and Docker Compose
- Yarn package manager
- GitHub OAuth App credentials

---

## 🛠️ Setup

> 🚨 **Important:** Ensure Docker is running before proceeding.

1. Clone the repository:

```bash
git clone https://github.com/rafaumeu/pocket-api.git
cd pocket-api
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

6. Run database seed (optional):

```bash
yarn seed
```

7. Start the development server:

```bash
yarn dev
```

---

## 🎯 API Endpoints

### Authentication

- `POST /auth/github` - Authenticate user with GitHub OAuth code
- `GET /profile` - Get authenticated user's profile

### Goals

- `POST /goals` - Create a new goal
- `GET /pending-goals` - Get pending goals for the current week
- `POST /completions` - Mark a goal as completed
- `GET /summary` - Get weekly goal summary

### Gamification

- `GET /profile/gamification` - Get user's level and experience points

---

## 🏗️ Project Structure

```
src/
├── db/          # Database configuration and schemas
│   ├── index.ts  # Database initialization
│   ├── schema.ts # Database schema definitions
│   └── seed.ts   # Database seeding functionality
├── functions/   # Business logic
│   ├── authenticate-from-github-code.ts
│   ├── create-goal.ts
│   ├── get-week-pending-goals.ts
│   ├── create-completion.ts
│   ├── get-week-summary.ts
│   └── get-user-level-and-experience.ts
├── http/       # HTTP server and routes
│   ├── routes/ # Route handlers
├── modules/    # Shared modules
│   ├── auth.ts
│   └── gamification.ts
└── env.ts      # Environment configuration
```

---

## 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode
yarn test:watch
```

---

## 📚 API Documentation

API documentation is available at `http://localhost:3000/docs` when running the development server. The documentation includes:

- Request/response schemas
- Authentication requirements
- Example requests and responses
- Interactive Swagger UI for testing endpoints

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/inorbit
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/inorbit-test

# Server
PORT=3000

# Authentication
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
JWT_SECRET=your_jwt_secret
```

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

<div align="center">
Made with ❤️ by Rafael Dias Zendron
</div>

<div align="center">
<img src="https://github.com/rafaumeu.png" width="100" height="100" style="border-radius: 50%;">

### Built with 💜 by Rafael Zendron

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-dias-zendron-528290132/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rafaumeu)

</div>
