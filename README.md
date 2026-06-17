# Vite Fullstack SPA

- **Single build command** — Vite builds the whole app in one go
- **Single output directory** — the fullstack app is emitted to `dist/`
- **Any server framework** — use whatever you like
  - [Express](packages/express)
  - [Hono](packages/hono)
  - [Generic adapter](packages/generic)
  - Fastify _(Coming soon…)_
  - Koa _(Coming soon…)_

## Example project structure

```txt
/
├── src/
│   ├── client/
│   │   ├── index.html
│   │   └── main.tsx
│   └── server/
│       └── index.ts
└── dist/
    ├── server.js (preconfigured to serve the frontend artifacts)
    └── public/ (frontend bundle + static files)
```

## Getting started

**vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fullstack from "@vite-fullstack/plugin";

export default defineConfig({
  plugins: [fullstack(), react()],
});
```

**server/index.ts**

```typescript
import { Hono } from "hono";
import { serve, HttpBindings } from "@hono/node-server";
import { viteMiddleware } from "@vite-fullstack/hono";

const app = new Hono<{ Bindings: HttpBindings }>();

app.get("/api/data", (c) => {
  return c.json({ message: "Hello from the API!" });
});

app.use(viteMiddleware());

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server is running on http://localhost:3000");
```

## Example Projects

- [Hono example](examples/hono)
- [Express example](examples/express)

## Philosophy / Motivations

> [!NOTE]
> This section is mostly the maintainer's opinions and motivations. Most of this is subjective, and you are free to disagree.

Most of the projects I build need both a backend and a frontend. That backend is usually a Node server, and the frontend is usually a SPA built with Vite. Setting up the frontend is easy, and the developer experience is excellent. But when it is time to add the backend, things get messy.

_Do I need to run two separate processes in development? Okay, then Vite listens on a different port than the server. Should I proxy API requests through the Vite dev server to the backend port? Then I need two separate build commands. Okay, the server build goes to `server/dist` and the client build goes to `client/dist`. Now I need to serve `../../client/dist` from the server, and then, when building the Docker image, I have to copy both outputs, but the server still needs node_modules... WHY CAN'T I JUST USE VITE FOR ALL OF THIS???_

That's usually me when I have to set up a new project. So I built this project to simplify all of it.

Why not just use...

- **Next.js**
  - It's a backend-for-frontend framework. The two pieces don't feel equal. If you're building a client and need to add a server to it, then great, but it is not the best tool for building a traditional API.
  - Forces you to use Next-specific conventions and ✨magic✨ (file naming conventions)
- **TanStack Start**
  - It allows more flexibility than Next and has less ✨magic✨, but it is still a backend-for-frontend framework. The two halves don't feel equal.
- **Hono with Client components**
  - It's the opposite of Next. It's frontend-for-backend. If you are already building an API in Hono and need some client interactivity, then it is good. But the two halves are not equal.
  - Doesn't feel fully baked at the time of writing this.
  - Only works with Hono.
- **@fastify/vite**
  - Honestly, this is a pretty good solution and it's maintained by a trusted team, but it's specifically made for Fastify.
- **Nitro**
  - Nitro is similar to this project but it approaches the problem differently: you give your server to Nitro and it will "put it behind your frontend". But what if you want your server to listen on multiple ports? What if you want to log something after the server starts to listen to requests? Since your code is not the one actually starting the server, you can't. This project takes a different approach and gives you a middleware that serves your frontend. The rest is your job here.

## FAQ

<details>
<summary>The setup is simple. What complexity does this hide under the hood?</summary>

The project has two components, each hiding different complexity:

- Vite plugin: Orchestrates the build of both the client and the server.
- Server adapter middleware: During development, the middleware starts a Vite dev server, just like the `vite` command would. After build, the same middleware serves the frontend bundle.
</details>

<details>
<summary>What are the trade-offs?</summary>

1. This only works with Node. No support for Bun, Deno, or other runtimes currently.
2. No SSR. If you need SSR, this project is not for you (at least in its current form).
3. For a simple setup, the dependencies and the tsconfig are shared between the frontend and the backend. Other frameworks also do this (e.g. Next.js), but if you need stronger separation between backend and frontend, this can be trickier to configure.
</details>
