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
