## Hono.js User Management API

This project implements a basic user management API using Hono.js, following a layered architecture.

### Project Structure

The project is structured into four main layers:

*   **Presentation Layer:** Handles HTTP requests and responses (routes).
*   **Application Layer:** Contains the business logic and use cases (service).
*   **Domain Layer:** Defines the core entities and interfaces (e.g., User, UserRepository).
*   **Infrastructure Layer:** Provides implementations for data access and other external concerns (e.g., in-memory repository).

### Running the Application

1.  **Install dependencies:**
    
