## API de Gerenciamento de Usuários com Hono.js 🇺🇸 [🇧🇷](README-pt-br.md)

Este projeto implementa uma API básica de gerenciamento de usuários usando Hono.js, seguindo uma arquitetura em camadas.

### Project Structure

O projeto é estruturado em quatro camadas principais:

*   **Presentation Layer:** Handles HTTP requests and responses (routes).
*   **Camada de Apresentação:** Lida com requisições e respostas HTTP (rotas).
*   **Camada de Aplicação:** Contém a lógica de negócios e casos de uso (serviço).
*   **Camada de Infraestrutura:** Fornece implementações para acesso a dados e outras preocupações externas (por exemplo, repositório em memória).
*   **Camada de Domínio:** Define as entidades e interfaces principais (por exemplo, Usuário, RepositórioDeUsuário).
A pasta `application` contém a lógica da aplicação, incluindo os handlers de comando e consulta.

### Estrutura de Pastas

+ `src`: Contém o código-fonte principal da aplicação.
  - `application`: Lida com a lógica da aplicação, comandos e consultas.
    - `command`: Contém os handlers de comando.
    - `query`: Contém os handlers de consulta.
  - `domain`: Define as entidades e a lógica de negócios principal.
  - `infrastructure`: Implementa o acesso a dados e integrações externas.
  - `presentation`: Gerencia as rotas da API e o tratamento de requisições.
+ `tests`: Contém testes unitários e de integração (a serem implementados).

### Implementação do CQRS 🧩

Esta aplicação implementa o padrão CQRS (Command Query Responsibility Segregation) para separar as operações de leitura (queries) das operações de escrita (commands). Essa separação promove melhor escalabilidade, flexibilidade e manutenibilidade do sistema.

- **Comandos:** Representam ações que modificam o estado do sistema, como criar, atualizar ou excluir um usuário. Os handlers de comando estão localizados na pasta `src/application/command` e são responsáveis por executar a lógica de negócios associada a cada comando.
- **Consultas:** Representam operações de leitura que buscam informações do sistema, como obter um usuário específico ou listar todos os usuários. Os handlers de consulta estão localizados na pasta `src/application/query` e são otimizados para realizar leituras de forma eficiente.

A camada de apresentação, especificamente o arquivo `src/presentation/user.routes.ts`, define as rotas da API e interage com a camada de aplicação para despachar comandos e consultas. Por exemplo, quando uma requisição para criar um usuário é recebida, a rota correspondente envia um comando para o handler `CreateUserHandler`. Da mesma forma, uma requisição para obter um usuário envia uma consulta para o handler `GetUserHandler`.

Essa separação clara entre comandos e consultas permite que cada tipo de operação seja otimizado de forma independente. As consultas podem ser direcionadas para réplicas de leitura do banco de dados, enquanto os comandos são processados pelo banco de dados principal, garantindo a consistência dos dados.

### Executando a Aplicação

1.  **Instale as dependências:**

    <CODE_BLOCK>
    npm install
    </CODE_BLOCK>

2.  **Inicie o servidor de desenvolvimento:**

    <CODE_BLOCK>
    npm run dev
    </CODE_BLOCK>