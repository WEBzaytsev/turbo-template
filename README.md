# Turborepo Monorepo Template

A modern monorepo template built with [Turborepo](https://turborepo.org/) for full-stack TypeScript applications.

## Using this template

To create a new project using this template, use [`create-turbo`](https://turborepo.com/docs/getting-started/examples) with the GitHub repository URL:

```sh
# Using npm
npx create-turbo@latest --example https://github.com/WEBzaytsev/turbo-template-zbn

# Using pnpm
pnpm dlx create-turbo@latest --example https://github.com/WEBzaytsev/turbo-template-zbn

# Using yarn
yarn dlx create-turbo@latest --example https://github.com/WEBzaytsev/turbo-template-zbn

# Using bun
bunx create-turbo@latest --example https://github.com/WEBzaytsev/turbo-template-zbn
```

This will create a new directory with your project name and bootstrap it with this template.

### Alternative: Use as GitHub Template

1. Click the **"Use this template"** button on GitHub
2. Create a new repository from this template
3. Clone your new repository:
   ```sh
   git clone https://github.com/username/your-repo-name.git
   cd your-repo-name
   npm install
   ```

### After Creating Your Project

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Update project metadata:**
   - Update `package.json` with your project name and details
   - Update `README.md` with your project information
   - Update workspace package names in `apps/*/package.json` and `packages/*/package.json`

3. **Configure environment variables:**
   - Create `.env` files for each app if needed
   - Update `turbo.json` with your environment variables

4. **Start developing:**
   ```sh
   npm run dev
   ```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `api`: a [NestJS](https://nestjs.com/) backend application
- `web`: a [Next.js](https://nextjs.org/) frontend application

### Packages

- `@repo/eslint-config`: shared ESLint configurations (includes Next.js, NestJS, and Prettier configs)
- `@repo/typescript-config`: shared `tsconfig.json` configurations used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has the following tools already configured:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting with multiple plugins
- [Knip](https://knip.dev/) for finding unused files, dependencies, and exports
- [Turborepo](https://turborepo.org/) for monorepo task orchestration

## Getting Started

### Install Dependencies

```sh
npm install
```

### Build

To build all apps and packages, run the following command:

```sh
npm run build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```sh
npm run build -- --filter=api
npm run build -- --filter=web
```

### Develop

To develop all apps and packages, run the following command:

```sh
npm run dev
```

You can develop a specific package by using a filter:

```sh
npm run dev -- --filter=web
npm run dev -- --filter=api
```

### Lint

To lint all apps and packages:

```sh
npm run lint
```

To lint and auto-fix:

```sh
npm run lint:fix
```

### Type Check

To check types across all apps and packages:

```sh
npm run check-types
```

### Find Unused Code

To find unused files, dependencies, and exports:

```sh
npm run knip
```

### Format Code

To format all code with Prettier:

```sh
npm run format
```

## Project Structure

```
turbo-template-zbn/
├── apps/
│   ├── api/          # NestJS backend application
│   └── web/          # Next.js frontend application
├── packages/
│   ├── eslint-config/      # Shared ESLint configurations
│   └── typescript-config/  # Shared TypeScript configurations
├── package.json
├── turbo.json
└── knip.json
```

## Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```sh
# Authenticate with Vercel
npx turbo login

# Link your Turborepo to Remote Cache
npx turbo link
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview) and link your Turborepo to Remote Cache.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
