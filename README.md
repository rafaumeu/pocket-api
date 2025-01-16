<div align="center">

<img src="assets/logo.svg" alt="pocket-api Logo" width="150" height="150" />

# pocket-api

A modern TypeScript backend application powered by Fastify and PostgreSQL.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-Latest-green.svg)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-Latest-orange.svg)](https://orm.drizzle.team/)

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

## 📦 Prerequisites

- Node.js (Latest LTS version)
- Docker and Docker Compose
- Yarn package manager

## 🛠️ Setup

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

6. Seed the database (optional):

```bash
yarn seed
```

7. Start the development server:

```bash
yarn dev
```

## 🏗️ Project Structure

```
pocket-api/
├── assets/         # Project-related assets
├── src/
│   ├── db/        # Database configuration and schemas
│   │   ├── index.ts  # Database initialization
│   │   ├── schema.ts # Database schema definitions
│   │   └── seed.ts   # Database seeding functionality
│   ├── http/      # HTTP server and route handlers
│   └── env.ts     # Environment variable configuration
├── .migrations/   # Database migration files
├── logs.txt      # Application logs
├── drizzle.config.ts # Drizzle ORM configuration
├── biome.json    # Biome linting and formatting config
└── docker-compose.yml
```

## 🧪 Running Tests

```bash
yarn test
```

## 📚 API Documentation

API documentation is available at `http://localhost:3000/docs` when running the development server.

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

- We use Biome for code formatting and linting
- Database migrations are tracked in the `.migrations/` directory
- VSCode settings are configured for optimal development experience
- Database seeding is available for development and testing environments
- Day.js is used for consistent date manipulation across the application

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pocket-api
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

</div>
