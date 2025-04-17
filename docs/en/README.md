# Hono.js CQRS User Service 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-v4.x-orange.svg)](https://hono.dev/)
[![Node.js](https://img.shields.io/badge/Node.js->=18-green.svg)](https://nodejs.org/)

## 📖 Overview

This project demonstrates a simple User CRUD (Create, Read, Update, Delete) service built with [Hono.js](https://hono.dev/), TypeScript, and implementing the **Command Query Responsibility Segregation (CQRS)** pattern within a **Layered Architecture**.

It provides a clear example of separating write operations (Commands) from read operations (Queries) for better maintainability, scalability, and organization.

**Key Features:**

*   RESTful API for User management.
*   CQRS pattern implementation.
*   Layered Architecture (Presentation, Application, Domain, Infrastructure).
*   Dependency Injection for decoupling (using interfaces like `UserRepository`).
*   In-memory data storage (via `InMemoryUserRepository`).
*   Basic JWT authentication for protected routes.
*   Structured logging with Pino.

## ✨ Quick Start

Follow these steps to get the project running locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd honojs-typescript # Or your project directory name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start, typically on `http://localhost:3000`.

4.  **Interact with the API:** Use tools like `curl`, Postman, or Insomnia to send requests to the endpoints (see [API Documentation](API.md) for details). You'll need to obtain a JWT token from the `/users/login` endpoint first for accessing protected routes.

## 🗺️ Repository Navigation

```
.
├── docs/                  # Documentation (This folder!)
│   ├── en/                # English Documentation
│   │   ├── README.md      # This file
│   │   ├── ARCHITECTURE.md # System architecture overview
│   │   ├── INSTALLATION.md # Installation guide
│   │   ├── USER_MANUAL.md  # How to use the API features
│   │   └── API.md         # Detailed API endpoint documentation
│   └── pt-br/             # Portuguese Documentation (Similar structure)
├── src/                   # Source Code
│   ├── application/       # Application Layer (Use Cases, Services, CQRS Handlers)
│   │   ├── command/       # Command Handlers & Command Objects
│   │   ├── query/         # Query Handlers & Query Objects
│   │   ├── __tests__/     # Application layer tests
│   │   └── user.service.ts # Main application service orchestrator
│   ├── domain/            # Domain Layer (Core Entities, Value Objects)
│   │   └── user.ts        # User domain entity definition
│   ├── infrastructure/    # Infrastructure Layer (Data Persistence, External Services)
│   │   └── user.repository.ts # In-memory implementation of UserRepository
│   ├── presentation/      # Presentation Layer (API Routes, Controllers)
│   │   └── user.routes.ts # Hono routes for user endpoints
│   └── index.ts           # Application entry point (Hono server setup)
├── coverage/              # Code coverage reports
├── .gitignore             # Git ignore rules
├── biome.json             # Biome linter/formatter config
├── jest.config.js         # Jest test runner config
├── package-lock.json      # Exact dependency versions
├── package.json           # Project metadata and dependencies
└── tsconfig.json          # TypeScript compiler options
```

## 📚 Further Documentation

*   **[Architecture Overview](ARCHITECTURE.md):** Understand the system's design and components.
*   **[Installation Guide](INSTALLATION.md):** Detailed setup instructions.
*   **[User Manual](USER_MANUAL.md):** Learn how to use the API features.
*   **[API Documentation](API.md):** Explore the available API endpoints.