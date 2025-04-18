# Middleware Documentation

This documentation provides a comprehensive overview of the middleware service.

## Project Overview

The middleware service is built using Fastify, a modern and fast web framework for Node.js, with TypeScript support. It serves as an intermediary layer handling various functionalities including database operations, request handling, and routing.

## Project Structure

```
middleware/
├── config/           # Configuration files
├── migrations/       # Database migration files
├── models/          # Database models
├── src/             # Source code
│   ├── db/         # Database related code
│   ├── handlers/   # Request handlers
│   ├── middleware/ # Custom middleware functions
│   ├── routes/     # API route definitions
│   ├── constants.ts
│   ├── index.ts    # Main application entry
│   └── logger.ts   # Logging configuration
├── package.json    # Project dependencies and scripts
└── tsconfig.json   # TypeScript configuration
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: SQLite with Sequelize ORM
- **Development Tools**: Nodemon, ts-node

## Key Dependencies

- `fastify`: Web framework
- `@fastify/cors`: CORS support
- `@fastify/session`: Session management
- `sequelize`: ORM for database operations
- `sqlite3`: Database engine
- `pino`: Logging library

## Development

To run the development server:

```bash
npm run dev
```

This will start the server using nodemon for automatic reloading during development.

## Documentation Structure

- [Database Models](./models.md)
- [API Routes](./routes.md)
- [Handlers](./handlers.md)
- [Database Operations](./database.md)
