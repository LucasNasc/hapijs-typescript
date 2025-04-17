# 🧑‍💻 Manual do Usuário

Este manual guia você através do uso das funcionalidades da API do Hono.js CQRS User Service.

## 🔑 Autenticação

A maioria dos endpoints requer autenticação usando um JSON Web Token (JWT).

**1. Obtenha um Token:**

*   Envie uma requisição `POST` para o endpoint `/users/login` com um corpo JSON contendo o nome de usuário e a senha.
*   Atualmente, as credenciais válidas estão fixas no código (para fins de demonstração):
    *   `username`: "roo"
    *   `password`: "roo"

**Exemplo de Requisição (`curl`):**

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "username": "roo",
  "password": "roo"
}'
```

**Exemplo de Resposta (Sucesso):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb28iLCJuYW1lIjoiUm9vIiwiaWF0IjoxNTE2MjM5MDIyfQ.alguma_assinatura_aqui"
}
```

**Exemplo de Resposta (Falha):**

```
Unauthorized
```
*(Código de Status: 401)*

**2. Use o Token:**

*   Copie o valor do `token` recebido.
*   Para todas as requisições subsequentes a endpoints protegidos (todos os endpoints `/users` exceto `/login`), inclua um cabeçalho `Authorization` com o valor `Bearer <seu_token>`.

**Exemplo de Cabeçalho:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb28iLCJuYW1lIjoiUm9vIiwiaWF0IjoxNTE2MjM5MDIyfQ.alguma_assinatura_aqui
```

Se você não fornecer um token válido, receberá uma resposta `401 Unauthorized`.

## 👤 Funcionalidades de Gerenciamento de Usuário

Todos os endpoints de gerenciamento de usuário são prefixados com `/users`. Lembre-se de incluir o cabeçalho `Authorization` obtido em `/login`.

### 1. Criar um Novo Usuário

*   **Endpoint:** `POST /users`
*   **Descrição:** Cria um novo registro de usuário.
*   **Corpo da Requisição:** Objeto JSON com `name` (string, obrigatório) e `email` (string, obrigatório, formato válido).
    ```json
    {
      "name": "Fulana de Tal",
      "email": "fulana.tal@exemplo.com"
    }
    ```
*   **Resposta (Sucesso - 201 Created):** Objeto JSON representando o usuário recém-criado, incluindo seu `id` único.
    ```json
    {
      "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV", // Exemplo de ULID
      "name": "Fulana de Tal",
      "email": "fulana.tal@exemplo.com"
    }
    ```
*   **Resposta (Erro - 400/500):** Mensagem de texto indicando o erro (ex: email inválido, nome faltando, erro no servidor).

### 2. Listar Todos os Usuários

*   **Endpoint:** `GET /users`
*   **Descrição:** Recupera uma lista de todos os usuários existentes.
*   **Corpo da Requisição:** Nenhum.
*   **Resposta (Sucesso - 200 OK):** Array JSON contendo objetos de usuário.
    ```json
    [
      {
        "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
        "name": "Fulana de Tal",
        "email": "fulana.tal@exemplo.com"
      },
      {
        "id": "01BXQ4MDEPQSV5SSGGQ79H6GBW",
        "name": "Ciclano Silva",
        "email": "ciclano.silva@amostra.net"
      }
      // ... mais usuários
    ]
    ```
*   **Resposta (Erro - 500):** Mensagem de texto indicando um erro no servidor.

### 3. Obter um Único Usuário por ID

*   **Endpoint:** `GET /users/:id`
*   **Descrição:** Recupera um usuário específico baseado em seu ID único.
*   **Parâmetro de URL:** Substitua `:id` pelo ID real do usuário que você deseja buscar.
*   **Corpo da Requisição:** Nenhum.
*   **Resposta (Sucesso - 200 OK):** Objeto JSON representando o usuário solicitado.
    ```json
    {
      "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
      "name": "Fulana de Tal",
      "email": "fulana.tal@exemplo.com"
    }
    ```
*   **Resposta (Erro - 404 Not Found):** Mensagem de texto "User not found".
*   **Resposta (Erro - 500):** Mensagem de texto indicando um erro no servidor.

### 4. Atualizar um Usuário Existente

*   **Endpoint:** `PUT /users/:id`
*   **Descrição:** Atualiza os detalhes (nome e/ou email) de um usuário existente.
*   **Parâmetro de URL:** Substitua `:id` pelo ID real do usuário que você deseja atualizar.
*   **Corpo da Requisição:** Objeto JSON com os campos a serem atualizados (`name`, `email`). Você deve fornecer valores para ambos, mesmo que apenas um esteja mudando.
    ```json
    {
      "name": "Fulana Silva", // Nome atualizado
      "email": "fulana.silva@exemplo.com" // Email atualizado
    }
    ```
*   **Resposta (Sucesso - 200 OK):** Objeto JSON representando o usuário atualizado.
    ```json
    {
      "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
      "name": "Fulana Silva",
      "email": "fulana.silva@exemplo.com"
    }
    ```
*   **Resposta (Erro - 404 Not Found):** Mensagem de texto "User not found".
*   **Resposta (Erro - 400/500):** Mensagem de texto indicando erro de validação ou do servidor.

### 5. Deletar um Usuário

*   **Endpoint:** `DELETE /users/:id`
*   **Descrição:** Remove um registro de usuário do sistema.
*   **Parâmetro de URL:** Substitua `:id` pelo ID real do usuário que você deseja deletar.
*   **Corpo da Requisição:** Nenhum.
*   **Resposta (Sucesso - 200 OK):** Mensagem de texto "User deleted".
*   **Resposta (Erro - 404 Not Found):** A implementação atual pode retornar 200 OK mesmo se o usuário não existir, pois a operação de exclusão pode ser idempotente dependendo da lógica do repositório. Um erro 500 pode ocorrer em caso de problemas no servidor.
*   **Resposta (Erro - 500):** Mensagem de texto indicando um erro no servidor.

---

Para mais detalhes técnicos sobre formatos de requisição/resposta e códigos de status, por favor consulte a [Documentação da API](API.md).