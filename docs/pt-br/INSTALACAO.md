# 🛠️ Guia de Instalação

Este guia fornece instruções passo a passo para configurar e executar o projeto Hono.js CQRS User Service em sua máquina local. O processo é geralmente consistente entre macOS, Windows e Linux.

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema:

1.  **Node.js:** Versão 18 ou posterior é recomendada. O Node.js inclui o `npm` (Node Package Manager).
    *   **Download:** [https://nodejs.org/](https://nodejs.org/)
    *   **Verificação:** Abra seu terminal ou prompt de comando e execute:
        ```bash
        node -v
        npm -v
        ```
        Você deve ver as versões instaladas impressas.

2.  **Git:** Necessário para clonar o repositório.
    *   **Download:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
    *   **Verificação:** Abra seu terminal ou prompt de comando e execute:
        ```bash
        git --version
        ```

## ⚙️ Passos de Configuração

1.  **Clone o Repositório:**
    Abra seu terminal ou prompt de comando, navegue até o diretório onde deseja armazenar o projeto e execute o seguinte comando (substitua `<url-do-repositorio>` pela URL real):
    ```bash
    git clone <url-do-repositorio>
    ```
    Isso criará um novo diretório (geralmente `honojs-typescript` ou similar, baseado no nome do repositório) contendo os arquivos do projeto.

2.  **Navegue até o Diretório do Projeto:**
    Mude para o diretório do projeto recém-criado:
    ```bash
    cd honojs-typescript # Ou o nome real do diretório
    ```

3.  **Instale as Dependências:**
    Instale todas as dependências necessárias do projeto definidas no `package.json`:
    ```bash
    npm install
    ```
    Este comando baixa e instala as bibliotecas necessárias (como Hono, TypeScript, Jest, etc.) na pasta `node_modules`.

4.  **Execute o Servidor de Desenvolvimento:**
    Inicie a aplicação em modo de desenvolvimento. Isso geralmente inclui recursos como recarregamento automático em alterações de código:
    ```bash
    npm run dev
    ```
    Se bem-sucedido, você deverá ver uma saída indicando que o servidor foi iniciado, tipicamente escutando em `http://localhost:3000` ou `http://0.0.0.0:3000`.

    ```
    > honojs-typescript@1.0.0 dev
    > ts-node-dev --respawn --transpile-only src/index.ts

    [INFO] Starting server on port 3000
    [INFO] Server is running on http://0.0.0.0:3000
    ```
    *(A saída real pode variar ligeiramente)*

## 🖥️ Notas Específicas do Sistema Operacional

*   **macOS:** Os passos acima devem funcionar diretamente no aplicativo Terminal padrão ou em outros emuladores de terminal como o iTerm2.
*   **Windows:**
    *   Use o Prompt de Comando (cmd.exe), PowerShell ou Windows Terminal. O Git Bash (instalado com o Git para Windows) também é uma boa opção, pois fornece um ambiente semelhante ao Linux.
    *   Os comandos (`git`, `npm`, `node`) devem funcionar de forma idêntica se o Node.js e o Git estiverem corretamente instalados e adicionados à variável de ambiente PATH do seu sistema (o que os instaladores geralmente fazem).
*   **Linux (Ubuntu, Debian, Fedora, etc.):**
    *   Use o emulador de terminal padrão da sua distribuição.
    *   Certifique-se de que o Node.js e o Git estejam instalados usando o gerenciador de pacotes da sua distribuição (ex: `apt` para Debian/Ubuntu, `dnf` para Fedora) ou baixando dos sites oficiais. Os comandos são os mesmos.

## 🎉 Sucesso!

O servidor deve estar rodando agora! Você pode prosseguir para o [Manual do Usuário](MANUAL_USUARIO.md) ou a [Documentação da API](API.md) para aprender como interagir com o serviço.

Para parar o servidor de desenvolvimento, volte ao terminal onde ele está rodando e pressione `Ctrl + C`.