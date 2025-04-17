# 🔌 API Documentation

This document provides detailed specifications for each endpoint available in the Hono.js CQRS User Service API.

**Base URL:** `http://localhost:3000` (when running locally)

**Authentication:** All endpoints under `/users` (except `/users/login`) require a `Bearer` token in the `Authorization` header. Obtain the token via the `/users/login` endpoint.

---

## Authentication

### Login

*   **Endpoint:** `POST /users/login`
*   **Description:** Authenticates a user and returns a JWT token.
*   **Authentication:** None required.
*   **Request Body:**
    *   **Content-Type:** `application/json`
    *   **Schema:**
        ```json
        {
          "username": "string (required)",
          "password": "string (required)"
        }
        ```
    *   **Example:**
        ```json
        {
          "username": "roo",
          "password": "roo"
        }
        ```
*   **Responses:**
    *   **`200 OK`**: Authentication successful.
        *   **Content-Type:** `application/json`
        *   **Body:**
            ```json
            {
              "token": "string (JWT)"
            }
            ```
        *   **Example:**
            ```json
            {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb28iLCJuYW1lIjoiUm9vIiwiaWF0IjoxNTE2MjM5MDIyfQ.some_signature_here"
            }
            ```
    *   **`401 Unauthorized`**: Invalid credentials.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Unauthorized`

---

## User Management

### Create User

*   **Endpoint:** `POST /users`
*   **Description:** Creates a new user.
*   **Authentication:** Bearer Token required.
*   **Request Body:**
    *   **Content-Type:** `application/json`
    *   **Schema:**
        ```json
        {
          "name": "string (required)",
          "email": "string (required, valid email format)"
        }
        ```
    *   **Example:**
        ```json
        {
          "name": "Jane Doe",
          "email": "jane.doe@example.com"
        }
        ```
*   **Responses:**
    *   **`201 Created`**: User created successfully.
        *   **Content-Type:** `application/json`
        *   **Body:** The created User object.
            ```json
            {
              "id": "string (ULID)",
              "name": "string",
              "email": "string"
            }
            ```
        *   **Example:**
            ```json
            {
              "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
              "name": "Jane Doe",
              "email": "jane.doe@example.com"
            }
            ```
    *   **`401 Unauthorized`**: Missing or invalid token.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Unauthorized`
    *   **`500 Internal Server Error`**: Server error during creation (e.g., validation failed in handler, repository error).
        *   **Content-Type:** `text/plain`
        *   **Body:** `Error creating user`

### List Users

*   **Endpoint:** `GET /users`
*   **Description:** Retrieves a list of all users.
*   **Authentication:** Bearer Token required.
*   **Request Body:** None.
*   **Responses:**
    *   **`200 OK`**: Successfully retrieved the list.
        *   **Content-Type:** `application/json`
        *   **Body:** An array of User objects.
            ```json
            [
              {
                "id": "string (ULID)",
                "name": "string",
                "email": "string"
              },
              // ... more users
            ]
            ```
        *   **Example:**
            ```json
            [
              {
                "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
                "name": "Jane Doe",
                "email": "jane.doe@example.com"
              }
            ]
            ```
    *   **`401 Unauthorized`**: Missing or invalid token.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Unauthorized`
    *   **`500 Internal Server Error`**: Server error during retrieval.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Error fetching users`

### Get User by ID

*   **Endpoint:** `GET /users/:id`
*   **Description:** Retrieves a single user by their unique ID.
*   **Authentication:** Bearer Token required.
*   **URL Parameters:**
    *   `id` (string, required): The ULID of the user to retrieve.
*   **Request Body:** None.
*   **Responses:**
    *   **`200 OK`**: User found and retrieved.
        *   **Content-Type:** `application/json`
        *   **Body:** The requested User object.
            ```json
            {
              "id": "string (ULID)",
              "name": "string",
              "email": "string"
            }
            ```
        *   **Example:**
            ```json
            {
              "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
              "name": "Jane Doe",
              "email": "jane.doe@example.com"
            }
            ```
    *   **`401 Unauthorized`**: Missing or invalid token.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Unauthorized`
    *   **`404 Not Found`**: No user found with the specified ID.
        *   **Content-Type:** `text/plain`
        *   **Body:** `User not found`
    *   **`500 Internal Server Error`**: Server error during retrieval.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Error fetching user`

### Update User

*   **Endpoint:** `PUT /users/:id`
*   **Description:** Updates an existing user's details.
*   **Authentication:** Bearer Token required.
*   **URL Parameters:**
    *   `id` (string, required): The ULID of the user to update.
*   **Request Body:**
    *   **Content-Type:** `application/json`
    *   **Schema:**
        ```json
        {
          "name": "string (required)",
          "email": "string (required, valid email format)"
        }
        ```
    *   **Example:**
        ```json
        {
          "name": "Jane Smith",
          "email": "jane.smith@example.com"
        }
        ```
*   **Responses:**
    *   **`200 OK`**: User updated successfully.
        *   **Content-Type:** `application/json`
        *   **Body:** The updated User object.
            ```json
            {
              "id": "string (ULID)",
              "name": "string",
              "email": "string"
            }
            ```
        *   **Example:**
            ```json
            {
              "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
              "name": "Jane Smith",
              "email": "jane.smith@example.com"
            }
            ```
    *   **`401 Unauthorized`**: Missing or invalid token.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Unauthorized`
    *   **`404 Not Found`**: No user found with the specified ID to update.
        *   **Content-Type:** `text/plain`
        *   **Body:** `User not found`
    *   **`500 Internal Server Error`**: Server error during update (e.g., validation failed, repository error).
        *   **Content-Type:** `text/plain`
        *   **Body:** `Error updating user`

### Delete User

*   **Endpoint:** `DELETE /users/:id`
*   **Description:** Deletes a user by their unique ID.
*   **Authentication:** Bearer Token required.
*   **URL Parameters:**
    *   `id` (string, required): The ULID of the user to delete.
*   **Request Body:** None.
*   **Responses:**
    *   **`200 OK`**: User deleted successfully (or request acknowledged).
        *   **Content-Type:** `text/plain`
        *   **Body:** `User deleted`
    *   **`401 Unauthorized`**: Missing or invalid token.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Unauthorized`
    *   **`500 Internal Server Error`**: Server error during deletion.
        *   **Content-Type:** `text/plain`
        *   **Body:** `Error deleting user`
        *(Note: A 404 might not be explicitly returned if the user doesn't exist, depending on repository implementation.)*