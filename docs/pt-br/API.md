# 🔌 Documentação da API

Este documento fornece especificações detalhadas para cada endpoint disponível na API do Hono.js CQRS User Service.

**URL Base:** `http://localhost:3000` (ao executar localmente)

**Autenticação:** Todos os endpoints sob `/users` (exceto `/users/login`) requerem um token `Bearer` no cabeçalho `Authorization`. Obtenha o token através do endpoint `/users/login`.

---

## Autenticação

### Login

*   **Endpoint:** `POST /users/login`
*   **Descrição:** Autentica um usuário e retorna um token JWT.
*   **Autenticação:** Nenhuma necessária.
*   **Corpo da Requisição:**
    *   **Content-Type:** `application/json`
    *   **Schema:**
        ```json
        {
          "username": "string (obrigatório)",
          "password": "string (obrigatório)"
        }
        ```
    *   **Exemplo:**
        ```json
        {
          "username": "roo",
          "password": "roo"
        }
        ```
*   **Respostas:**
    *   **`200 OK`**: Autenticação bem-sucedida.
        *   **Content-Type:** `application/json`
        *   **Corpo:**
            ```json
            {
              "token": "string (JWT)"
            }
            ```
        *   **Exemplo:**
            ```json
            {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb28iLCJuYW1lIjoiUm9vIiwiaWF0IjoxNTE2MjM5MDIyfQ.alguma_assinatura_aqui"
            }
            ```
    *   **`401 Unauthorized`**: Credenciais inválidas.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Unauthorized`

---

## Gerenciamento de Usuários

### Criar Usuário

*   **Endpoint:** `POST /users`
*   **Descrição:** Cria um novo usuário.
*   **Autenticação:** Token Bearer obrigatório.
*   **Corpo da Requisição:**
    *   **Content-Type:** `application/json`
    *   **Schema:**
        ```json
        {
          "name": "string (obrigatório)",
          "email": "string (obrigatório, formato de email válido)"
        }
        ```
    *   **Exemplo:**
        ```json
        {
          "name": "Fulana de Tal",
          "email": "fulana.tal@exemplo.com"
        }
        ```
*   **Respostas:**
    *   **`201 Created`**: Usuário criado com sucesso.
        *   **Content-Type:** `application/json`
        *   **Corpo:** O objeto User criado.
            ```json
            {
              "id": "string (ULID)",
              "name": "string",
              "email": "string"
            }
            ```
        *   **Exemplo:**
            ```json
            {
              "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
              "name": "Fulana de Tal",
              "email": "fulana.tal@exemplo.com"
            }
            ```
    *   **`401 Unauthorized`**: Token ausente ou inválido.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Unauthorized`
    *   **`500 Internal Server Error`**: Erro no servidor durante a criação (ex: validação falhou no handler, erro no repositório).
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Error creating user`

### Listar Usuários

*   **Endpoint:** `GET /users`
*   **Descrição:** Recupera uma lista de todos os usuários.
*   **Autenticação:** Token Bearer obrigatório.
*   **Corpo da Requisição:** Nenhum.
*   **Respostas:**
    *   **`200 OK`**: Lista recuperada com sucesso.
        *   **Content-Type:** `application/json`
        *   **Corpo:** Um array de objetos User.
            ```json
            [
              {
                "id": "string (ULID)",
                "name": "string",
                "email": "string"
              },
              // ... mais usuários
            ]
            ```
        *   **Exemplo:**
            ```json
            [
              {
                "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
                "name": "Fulana de Tal",
                "email": "fulana.tal@exemplo.com"
              }
            ]
            ```
    *   **`401 Unauthorized`**: Token ausente ou inválido.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Unauthorized`
    *   **`500 Internal Server Error`**: Erro no servidor durante a recuperação.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Error fetching users`

### Obter Usuário por ID

*   **Endpoint:** `GET /users/:id`
*   **Descrição:** Recupera um único usuário pelo seu ID único.
*   **Autenticação:** Token Bearer obrigatório.
*   **Parâmetros de URL:**
    *   `id` (string, obrigatório): O ULID do usuário a ser recuperado.
*   **Corpo da Requisição:** Nenhum.
*   **Respostas:**
    *   **`200 OK`**: Usuário encontrado e recuperado.
        *   **Content-Type:** `application/json`
        *   **Corpo:** O objeto User solicitado.
            ```json
            {
              "id": "string (ULID)",
              "name": "string",
              "email": "string"
            }
            ```
        *   **Exemplo:**
            ```json
            {
              "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
              "name": "Fulana de Tal",
              "email": "fulana.tal@exemplo.com"
            }
            ```
    *   **`401 Unauthorized`**: Token ausente ou inválido.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Unauthorized`
    *   **`404 Not Found`**: Nenhum usuário encontrado com o ID especificado.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `User not found`
    *   **`500 Internal Server Error`**: Erro no servidor durante a recuperação.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Error fetching user`

### Atualizar Usuário

*   **Endpoint:** `PUT /users/:id`
*   **Descrição:** Atualiza os detalhes de um usuário existente.
*   **Autenticação:** Token Bearer obrigatório.
*   **Parâmetros de URL:**
    *   `id` (string, obrigatório): O ULID do usuário a ser atualizado.
*   **Corpo da Requisição:**
    *   **Content-Type:** `application/json`
    *   **Schema:**
        ```json
        {
          "name": "string (obrigatório)",
          "email": "string (obrigatório, formato de email válido)"
        }
        ```
    *   **Exemplo:**
        ```json
        {
          "name": "Fulana Silva",
          "email": "fulana.silva@exemplo.com"
        }
        ```
*   **Respostas:**
    *   **`200 OK`**: Usuário atualizado com sucesso.
        *   **Content-Type:** `application/json`
        *   **Corpo:** O objeto User atualizado.
            ```json
            {
              "id": "string (ULID)",
              "name": "string",
              "email": "string"
            }
            ```
        *   **Exemplo:**
            ```json
            {
              "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
              "name": "Fulana Silva",
              "email": "fulana.silva@exemplo.com"
            }
            ```
    *   **`401 Unauthorized`**: Token ausente ou inválido.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Unauthorized`
    *   **`404 Not Found`**: Nenhum usuário encontrado com o ID especificado para atualizar.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `User not found`
    *   **`500 Internal Server Error`**: Erro no servidor durante a atualização (ex: validação falhou, erro no repositório).
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Error updating user`

### Deletar Usuário

*   **Endpoint:** `DELETE /users/:id`
*   **Descrição:** Deleta um usuário pelo seu ID único.
*   **Autenticação:** Token Bearer obrigatório.
*   **Parâmetros de URL:**
    *   `id` (string, obrigatório): O ULID do usuário a ser deletado.
*   **Corpo da Requisição:** Nenhum.
*   **Respostas:**
    *   **`200 OK`**: Usuário deletado com sucesso (ou requisição reconhecida).
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `User deleted`
    *   **`401 Unauthorized`**: Token ausente ou inválido.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Unauthorized`
    *   **`500 Internal Server Error`**: Erro no servidor durante a exclusão.
        *   **Content-Type:** `text/plain`
        *   **Corpo:** `Error deleting user`
        *(Nota: Um 404 pode não ser explicitamente retornado se o usuário não existir, dependendo da implementação do repositório.)*