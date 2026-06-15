# Vite Fullstack SPA

- **Single build command** — Vite builds the whole app in one go
- **Single output directory** — the fullstack app is emitted to `dist/`
- **Any server framework** — use whatever you like
  - [Express](packages/express-adapter)
  - [Hono](packages/hono-adapter)
  - [Generic adapter](packages/generic-adapter)
  - Fastify _(Coming soon…)_
  - Koa _(Coming soon…)_

## Example project structure

```txt
.
├── client/
│   ├── index.html
│   └── main.tsx
├── server/
│   └── index.ts
└── dist/
    ├── server.js (preconfigured to serve the frontend artifacts)
    └── public/ (frontend bundle)
```

## Example Projects

- [Hono example](examples/hono)
- [Express example](examples/express)

## Example usage

**vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fullstack from "@vite-fullstack-spa/plugin";

export default defineConfig({
  plugins: [fullstack(), react()],
});
```

**server/index.ts**

```typescript
import { Hono } from "hono";
import { serve, HttpBindings } from "@hono/node-server";
import { viteMiddleware } from "@vite-fullstack-spa/hono-adapter";

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
