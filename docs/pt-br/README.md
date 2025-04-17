# Hono.js CQRS Serviço de Usuário 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-v4.x-orange.svg)](https://hono.dev/)
[![Node.js](https://img.shields.io/badge/Node.js->=18-green.svg)](https://nodejs.org/)

## 📖 Visão Geral

Este projeto demonstra um serviço simples de CRUD (Criar, Ler, Atualizar, Deletar) de Usuários construído com [Hono.js](https://hono.dev/), TypeScript, e implementando o padrão **Command Query Responsibility Segregation (CQRS)** dentro de uma **Arquitetura em Camadas**.

Ele fornece um exemplo claro de separação de operações de escrita (Comandos) de operações de leitura (Consultas) para melhor manutenibilidade, escalabilidade e organização.

**Principais Características:**

*   API RESTful para gerenciamento de Usuários.
*   Implementação do padrão CQRS.
*   Arquitetura em Camadas (Apresentação, Aplicação, Domínio, Infraestrutura).
*   Injeção de Dependência para desacoplamento (usando interfaces como `UserRepository`).
*   Armazenamento de dados em memória (via `InMemoryUserRepository`).
*   Autenticação JWT básica para rotas protegidas.
*   Logging estruturado com Pino.

## ✨ Início Rápido

Siga estes passos para executar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd honojs-typescript # Ou o nome do diretório do seu projeto
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor será iniciado, tipicamente em `http://localhost:3000`.

4.  **Interaja com a API:** Use ferramentas como `curl`, Postman ou Insomnia para enviar requisições aos endpoints (veja a [Documentação da API](API.md) para detalhes). Você precisará obter um token JWT do endpoint `/users/login` primeiro para acessar as rotas protegidas.

## 🗺️ Navegação do Repositório

```
.
├── docs/                  # Documentação (Esta pasta!)
│   ├── en/                # Documentação em Inglês
│   └── pt-br/             # Documentação em Português
│       ├── README.md      # Este arquivo
│       ├── ARQUITETURA.md # Visão geral da arquitetura do sistema
│       ├── INSTALACAO.md  # Guia de instalação
│       ├── MANUAL_USUARIO.md # Como usar as funcionalidades da API
│       └── API.md         # Documentação detalhada dos endpoints da API
├── src/                   # Código Fonte
│   ├── application/       # Camada de Aplicação (Casos de Uso, Serviços, Handlers CQRS)
│   │   ├── command/       # Handlers de Comando & Objetos de Comando
│   │   ├── query/         # Handlers de Consulta & Objetos de Consulta
│   │   ├── __tests__/     # Testes da camada de aplicação
│   │   └── user.service.ts # Orquestrador principal do serviço de aplicação
│   ├── domain/            # Camada de Domínio (Entidades Principais, Objetos de Valor)
│   │   └── user.ts        # Definição da entidade de domínio User
│   ├── infrastructure/    # Camada de Infraestrutura (Persistência de Dados, Serviços Externos)
│   │   └── user.repository.ts # Implementação em memória do UserRepository
│   ├── presentation/      # Camada de Apresentação (Rotas da API, Controladores)
│   │   └── user.routes.ts # Rotas Hono para os endpoints de usuário
│   └── index.ts           # Ponto de entrada da aplicação (configuração do servidor Hono)
├── coverage/              # Relatórios de cobertura de código
├── .gitignore             # Regras do Git ignore
├── biome.json             # Configuração do linter/formatter Biome
├── jest.config.js         # Configuração do executor de testes Jest
├── package-lock.json      # Versões exatas das dependências
├── package.json           # Metadados do projeto e dependências
└── tsconfig.json          # Opções do compilador TypeScript
```

## 📚 Documentação Adicional

*   **[Visão Geral da Arquitetura](ARQUITETURA.md):** Entenda o design e os componentes do sistema.
*   **[Guia de Instalação](INSTALACAO.md):** Instruções detalhadas de configuração.
*   **[Manual do Usuário](MANUAL_USUARIO.md):** Aprenda a usar as funcionalidades da API.
*   **[Documentação da API](API.md):** Explore os endpoints da API disponíveis.