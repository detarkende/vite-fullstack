import { serveStatic } from "@hono/node-server/serve-static";
import type { HttpBindings } from "@hono/node-server";
import type { MiddlewareHandler } from "hono";
import type { ViteDevServer } from "vite";
import path from "node:path";

// Injected at build time by @vfspa/plugin via Vite's `define`.
// Absent (undefined) when the server entry is run directly in dev (e.g. via tsx).
// Its presence/absence is therefore sufficient to distinguish dev from production.
declare global {
  interface ProcessEnv {
    __VITE_FULLSTACK_ASSETS_DIR__?: string;
  }
}

export interface ViteMiddlewareOptions {}

/**
 * Returns a Hono middleware that:
 * - In development: lazily starts a Vite dev server and proxies requests through it.
 * - In production: serves the pre-built static assets with `serveStatic`.
 *
 * @example
 * ```ts
 * app.use(viteMiddleware())
 * ```
 */
export function viteMiddleware(
  options: ViteMiddlewareOptions = {},
): MiddlewareHandler<{ Bindings: HttpBindings }> {
  if (process.env.__VITE_FULLSTACK_ASSETS_DIR__ === undefined) {
    let serverPromise: Promise<ViteDevServer> | null = null;

    const getViteServer = (): Promise<ViteDevServer> => {
      if (!serverPromise) {
        serverPromise = import("vite").then(({ createServer }) =>
          createServer({
            server: { middlewareMode: true },
            appType: "spa",
          }),
        );
      }
      return serverPromise;
    };

    return async (c, _next) => {
      const vite = await getViteServer();
      const req = c.env.incoming;
      const res = c.env.outgoing;

      return new Promise<void>((resolve, reject) => {
        vite.middlewares(req, res, (err?: Error) => {
          if (err) reject(err);
          else resolve();
        });
      });
    };
  } else {
    const frontendDir = path.join(
      import.meta.dirname,
      process.env.__VITE_FULLSTACK_ASSETS_DIR__,
    );

    return serveStatic({ root: frontendDir });
  }
}
