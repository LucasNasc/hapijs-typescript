# 🧑‍💻 User Manual

This manual guides you through using the features of the Hono.js CQRS User Service API.

## 🔑 Authentication

Most endpoints require authentication using a JSON Web Token (JWT).

**1. Obtain a Token:**

*   Send a `POST` request to the `/users/login` endpoint with a JSON body containing the username and password.
*   Currently, the valid credentials are hardcoded (for demonstration purposes):
    *   `username`: "roo"
    *   `password`: "roo"

**Example Request (`curl`):**

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "username": "roo",
  "password": "roo"
}'
```

**Example Response (Success):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb28iLCJuYW1lIjoiUm9vIiwiaWF0IjoxNTE2MjM5MDIyfQ.some_signature_here"
}
```

**Example Response (Failure):**

```
Unauthorized
```
*(Status Code: 401)*

**2. Use the Token:**

*   Copy the received `token` value.
*   For all subsequent requests to protected endpoints (all `/users` endpoints except `/login`), include an `Authorization` header with the value `Bearer <your_token>`.

**Example Header:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb28iLCJuYW1lIjoiUm9vIiwiaWF0IjoxNTE2MjM5MDIyfQ.some_signature_here
```

If you don't provide a valid token, you will receive a `401 Unauthorized` response.

## 👤 User Management Features

All user management endpoints are prefixed with `/users`. Remember to include the `Authorization` header obtained from `/login`.

### 1. Create a New User

*   **Endpoint:** `POST /users`
*   **Description:** Creates a new user record.
*   **Request Body:** JSON object with `name` (string, required) and `email` (string, required, valid format).
    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
*   **Response (Success - 201 Created):** JSON object representing the newly created user, including their unique `id`.
    ```json
    {
      "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV", // Example ULID
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
*   **Response (Error - 400/500):** Text message indicating the error (e.g., invalid email, missing name, server error).

### 2. List All Users

*   **Endpoint:** `GET /users`
*   **Description:** Retrieves a list of all existing users.
*   **Request Body:** None.
*   **Response (Success - 200 OK):** JSON array containing user objects.
    ```json
    [
      {
        "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
        "name": "Jane Doe",
        "email": "jane.doe@example.com"
      },
      {
        "id": "01BXQ4MDEPQSV5SSGGQ79H6GBW",
        "name": "John Smith",
        "email": "john.smith@sample.net"
      }
      // ... more users
    ]
    ```
*   **Response (Error - 500):** Text message indicating a server error.

### 3. Get a Single User by ID

*   **Endpoint:** `GET /users/:id`
*   **Description:** Retrieves a specific user based on their unique ID.
*   **URL Parameter:** Replace `:id` with the actual ID of the user you want to fetch.
*   **Request Body:** None.
*   **Response (Success - 200 OK):** JSON object representing the requested user.
    ```json
    {
      "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
*   **Response (Error - 404 Not Found):** Text message "User not found".
*   **Response (Error - 500):** Text message indicating a server error.

### 4. Update an Existing User

*   **Endpoint:** `PUT /users/:id`
*   **Description:** Updates the details (name and/or email) of an existing user.
*   **URL Parameter:** Replace `:id` with the actual ID of the user you want to update.
*   **Request Body:** JSON object with the fields to update (`name`, `email`). You must provide values for both, even if only one is changing.
    ```json
    {
      "name": "Jane Smith", // Updated name
      "email": "jane.smith@example.com" // Updated email
    }
    ```
*   **Response (Success - 200 OK):** JSON object representing the updated user.
    ```json
    {
      "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
      "name": "Jane Smith",
      "email": "jane.smith@example.com"
    }
    ```
*   **Response (Error - 404 Not Found):** Text message "User not found".
*   **Response (Error - 400/500):** Text message indicating validation or server error.

### 5. Delete a User

*   **Endpoint:** `DELETE /users/:id`
*   **Description:** Removes a user record from the system.
*   **URL Parameter:** Replace `:id` with the actual ID of the user you want to delete.
*   **Request Body:** None.
*   **Response (Success - 200 OK):** Text message "User deleted".
*   **Response (Error - 404 Not Found):** The current implementation might return a 200 OK even if the user didn't exist, as the delete operation might be idempotent depending on the repository logic. A 500 error could occur in case of server issues.
*   **Response (Error - 500):** Text message indicating a server error.

---

For more technical details on request/response formats and status codes, please refer to the [API Documentation](API.md).