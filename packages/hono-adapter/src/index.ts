import { serveStatic } from "@hono/node-server/serve-static";
import type { HttpBindings } from "@hono/node-server";
import type { MiddlewareHandler } from "hono";
import { createViteMiddleware } from "@vfspa/generic-adapter";

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
  _options: ViteMiddlewareOptions = {},
): MiddlewareHandler<{ Bindings: HttpBindings }> {
  return createViteMiddleware({
    dev: (getViteServer) => async (c, _next) => {
      const vite = await getViteServer();
      const req = c.env.incoming;
      const res = c.env.outgoing;

      return new Promise<void>((resolve, reject) => {
        vite.middlewares(req, res, (err?: Error) => {
          if (err) reject(err);
          else resolve();
        });
      });
    },
    prod: (assetsDir) => serveStatic({ root: assetsDir }),
  });
}
