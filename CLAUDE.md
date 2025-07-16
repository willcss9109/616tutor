### 🔄 Project Awareness & Context
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.
- **You should always firstly identify the app you are working on** (mobile app, backend, or admin panel) and follow the specific guidelines in the corresponding `CLAUDE.md` file.

### 🧱 Code Structure & Modularity
**For app-specific guidelines, refer to the CLAUDE.md file in the relevant app directory:**
- **Mobile App:** `apps/mobile-app/CLAUDE.md`
- **Backend:** `apps/backend/CLAUDE.md`
- **Admin Panel:** `apps/admin-panel/CLAUDE.md`

**General project-wide rules:**
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
- **Use clear, consistent imports** (prefer relative imports within packages).

### 🧪 Testing & Reliability
**For app-specific testing guidelines, refer to the CLAUDE.md file in the relevant app directory:**
- **Mobile App:** `apps/mobile-app/CLAUDE.md`
- **Backend:** `apps/backend/CLAUDE.md`
- **Admin Panel:** `apps/admin-panel/CLAUDE.md`

**General project-wide rules:**
- **Always create appropriate unit tests for new features** (functions, classes, routes, etc).
- **After updating any logic**, check whether existing unit tests need to be updated. If so, do it.

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a “Discovered During Work” section.

### 📎 Style & Conventions
**For app-specific style guidelines, refer to the CLAUDE.md file in the relevant app directory:**
- **Mobile App:** `apps/mobile-app/CLAUDE.md`
- **Backend:** `apps/backend/CLAUDE.md`
- **Admin Panel:** `apps/admin-panel/CLAUDE.md`

**General project-wide rules:**
- **Follow consistent coding standards** as defined in each app's CLAUDE.md file.
- **Use appropriate formatters and linters** (e.g., eslint + prettier for TypeScript, black for Python).
- **Use type hints and strict typing** where applicable.

### 📚 Documentation & Explainability
**For app-specific documentation guidelines, refer to the CLAUDE.md file in the relevant app directory:**
- **Mobile App:** `apps/mobile-app/CLAUDE.md`
- **Backend:** `apps/backend/CLAUDE.md`
- **Admin Panel:** `apps/admin-panel/CLAUDE.md`

**General project-wide rules:**
- **Update README.md** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add inline comments** explaining the why, not just the what.

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use known, verified Python packages.
- **Always confirm file paths and module names** exist before referencing them in code or tests.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.