# Contributing to Shopifolio

Welcome to the Shopifolio codebase! This guide will help you understand the project structure, tech stack, and workflows.

## ⚡ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Testing**: [Playwright](https://playwright.dev/) (E2E)
- **Code Quality**: ESLint, Husky, Lint-Stage
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/shopifolio.git
    cd shopifolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Copy `.env.local.example` (if available) or ensure you have the required keys:
    - `NEXT_PUBLIC_SANITY_PROJECT_ID`
    - `NEXT_PUBLIC_SANITY_DATASET`
    - `RESEND_API_KEY` (for emails)

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── ui/              # Reusable UI primitives (Buttons, Inputs)
│   ├── sections/        # Page-specific sections (Hero, About)
│   └── analytics/       # Third-party tracking scripts
├── lib/                 # Utility functions and shared logic
├── sanity/              # Sanity Studio configuration and schemas
│   ├── schemas/         # Content definitions
│   └── lib/             # Sanity client helpers
├── styles/              # Global styles (globals.css)
└── types/               # TypeScript type definitions
```

## 🛠️ Development Workflow

### Committing Code (Husky & Lint-Staged)
We use **Husky** and **Lint-Staged** to enforce code quality.
- When you run `git commit`, `eslint --fix` will run automatically on your staged files.
- If there are errors that cannot be auto-fixed, the commit will be blocked.
- **Fix**: Resolve the errors shown in the terminal and commit again.

### Adding New Sections
1.  Create the component in `src/components/sections/`.
2.  If it needs content, define a new schema in `src/sanity/schemas/`.
3.  Import the schema in `src/sanity/schema.ts`.

### Sanity Studio
The studio is embedded at `/studio`. You can access it locally at `http://localhost:3000/studio`.
- **Updating Schema**: After changing a schema file, the Studio updates automatically.

## 🧪 Testing
- **E2E Tests**: Run `npm run test:e2e` to execute Playwright tests.
- **CI**: Tests run automatically on Pull Requests via GitHub Actions.

## 📦 Deployment
The project is optimized for deployment on **Vercel**. Pushing to the `main` branch triggers a production deployment.
