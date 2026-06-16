import type { RequestHandler } from "express";
import express from "express";
import { createViteMiddleware } from "@vite-fullstack/generic-adapter";

export interface ViteMiddlewareOptions {
  expressStaticOptions?: Parameters<typeof express.static>[1];
}

/**
 * Returns an Express middleware that:
 * - In development: lazily starts a Vite dev server and proxies requests through it.
 * - In production: serves the pre-built static assets with `express.static`.
 *
 * @example
 * ```ts
 * app.use(viteMiddleware())
 * ```
 */
export function viteMiddleware(options: ViteMiddlewareOptions = {}): RequestHandler {
  return createViteMiddleware({
    dev: (getViteServer) => async (req, res, next) => {
      const vite = await getViteServer();
      vite.middlewares(req, res, next);
    },
    prod: (assetsDir) => express.static(assetsDir, options.expressStaticOptions),
  });
}
