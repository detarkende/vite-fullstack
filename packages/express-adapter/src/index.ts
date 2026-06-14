import type { RequestHandler } from "express";
import type { ViteDevServer } from "vite";
import express from "express";
import path from "node:path";

// Injected at build time by @vfspa/plugin via Vite's `define`.
// Absent (undefined) when the server entry is run directly in dev (e.g. via tsx).
// Its presence/absence is therefore sufficient to distinguish dev from production.
declare global {
  interface ProcessEnv {
    __VITE_FULLSTACK_ASSETS_DIR__?: string;
  }
}

export interface ViteMiddlewareOptions {
  expressStaticOptions?: Parameters<typeof express.static>[1];
}

const defaultOptions: Required<ViteMiddlewareOptions> = {
  expressStaticOptions: {},
};

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
export function viteMiddleware(
  options: ViteMiddlewareOptions = {},
): RequestHandler {
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

    return async (req, res, next) => {
      const vite = await getViteServer();
      vite.middlewares(req, res, next);
    };
  } else {
    const frontendDir = path.join(
      import.meta.dirname,
      process.env.__VITE_FULLSTACK_ASSETS_DIR__,
    );

    return express.static(frontendDir, {
      ...defaultOptions.expressStaticOptions,
      ...options.expressStaticOptions,
    });
  }
}
