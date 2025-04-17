# 🛠️ Installation Guide

This guide provides step-by-step instructions for setting up and running the Hono.js CQRS User Service project on your local machine. The process is generally consistent across macOS, Windows, and Linux.

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Node.js:** Version 18 or later is recommended. Node.js includes `npm` (Node Package Manager).
    *   **Download:** [https://nodejs.org/](https://nodejs.org/)
    *   **Verification:** Open your terminal or command prompt and run:
        ```bash
        node -v
        npm -v
        ```
        You should see the installed versions printed.

2.  **Git:** Required for cloning the repository.
    *   **Download:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
    *   **Verification:** Open your terminal or command prompt and run:
        ```bash
        git --version
        ```

## ⚙️ Setup Steps

1.  **Clone the Repository:**
    Open your terminal or command prompt, navigate to the directory where you want to store the project, and run the following command (replace `<repository-url>` with the actual URL):
    ```bash
    git clone <repository-url>
    ```
    This will create a new directory (usually `honojs-typescript` or similar, based on the repository name) containing the project files.

2.  **Navigate to Project Directory:**
    Change into the newly created project directory:
    ```bash
    cd honojs-typescript # Or the actual directory name
    ```

3.  **Install Dependencies:**
    Install all the necessary project dependencies defined in `package.json`:
    ```bash
    npm install
    ```
    This command downloads and installs the required libraries (like Hono, TypeScript, Jest, etc.) into the `node_modules` folder.

4.  **Run the Development Server:**
    Start the application in development mode. This usually includes features like automatic reloading on code changes:
    ```bash
    npm run dev
    ```
    If successful, you should see output indicating the server has started, typically listening on `http://localhost:3000` or `http://0.0.0.0:3000`.

    ```
    > honojs-typescript@1.0.0 dev
    > ts-node-dev --respawn --transpile-only src/index.ts

    [INFO] Starting server on port 3000
    [INFO] Server is running on http://0.0.0.0:3000
    ```
    *(Actual output might vary slightly)*

## 🖥️ Operating System Specific Notes

*   **macOS:** The steps above should work directly in the default Terminal application or other terminal emulators like iTerm2.
*   **Windows:**
    *   Use Command Prompt (cmd.exe), PowerShell, or Windows Terminal. Git Bash (installed with Git for Windows) is also a good option as it provides a Linux-like environment.
    *   The commands (`git`, `npm`, `node`) should work identically if Node.js and Git are correctly installed and added to your system's PATH environment variable (which the installers usually handle).
*   **Linux (Ubuntu, Debian, Fedora, etc.):**
    *   Use your distribution's default terminal emulator.
    *   Ensure Node.js and Git are installed using your package manager (e.g., `apt` for Debian/Ubuntu, `dnf` for Fedora) or by downloading from the official websites. The commands are the same.

## 🎉 Success!

The server should now be running! You can proceed to the [User Manual](USER_MANUAL.md) or [API Documentation](API.md) to learn how to interact with the service.

To stop the development server, go back to the terminal where it's running and press `Ctrl + C`.