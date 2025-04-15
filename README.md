## Hono.js User Management API 🇺🇸 [🇧🇷](README-pt-br.md)


This project implements a basic user management API using Hono.js, following a layered architecture.

### Project Structure

The project is structured into four main layers:

*   **Presentation Layer:** Handles HTTP requests and responses (routes).
*   **Application Layer:** Contains the business logic and use cases (service).
*   **Infrastructure Layer:** Provides implementations for data access and other external concerns (e.g., in-memory repository).
*   **Domain Layer:** Defines the core entities and interfaces (e.g., User, UserRepository).
The `application` folder contains the application logic, including command and query handlers.

### CQRS Implementation

This project utilizes the Command Query Responsibility Segregation (CQRS) pattern to separate the handling of commands (actions that change the system state) and queries (requests for data). This separation enhances scalability, maintainability, and flexibility.

**Commands** are actions that modify data, such as creating, updating, or deleting a user. In this project, command handlers are located in the `<CODE_BLOCK> src/application/command </CODE_BLOCK>` directory. For example, `<CODE_BLOCK> CreateUserHandler.ts </CODE_BLOCK>` is responsible for handling the user creation command.

**Queries** are requests for reading data without modifying it, such as retrieving a user or listing all users. Query handlers are found in the `<CODE_BLOCK> src/application/query </CODE_BLOCK>` directory. For instance, `<CODE_BLOCK> GetUserHandler.ts </CODE_BLOCK>` handles requests to retrieve a specific user.

The **Presentation Layer**, specifically the routes defined in `<CODE_BLOCK> src/presentation/user.routes.ts </CODE_BLOCK>`, interacts with the Application Layer to dispatch commands and queries. When a request is received, the appropriate command or query is sent to the corresponding handler in the Application Layer. The Application Layer then processes the request, potentially interacting with the **Domain** and **Infrastructure Layers** to fulfill the operation.

This separation ensures a clear distinction between read and write operations, allowing for independent scaling and optimization of each.


### Folder Structure

This project follows a structured organization to separate concerns and improve maintainability. Here's an overview of the key folders:

- `src`: Contains the main source code of the application.
  - `application`:  Handles application logic, commands, and queries.
    - `command`: Contains command handlers.
    - `query`: Contains query handlers.
  - `domain`: Defines core business entities and logic.
  - `infrastructure`: Implements data access and external integrations.
  - `presentation`: Manages API routes and request handling.
- `tests`: Contains unit and integration tests.


### Running the Application (Local Development)

To run the project locally, follow these steps:

1.  **Install dependencies:**
    <CODE_BLOCK> npm install </CODE_BLOCK> or if you use yarn: <CODE_BLOCK> yarn install </CODE_BLOCK>
2.  **Start the development server:**
    <CODE_BLOCK> npm run start </CODE_BLOCK> or with yarn: <CODE_BLOCK> yarn start </CODE_BLOCK>



1.  **Install dependencies:**
    
