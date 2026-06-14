import type { ViteDevServer } from "vite";
import path from "node:path";

declare global {
  interface ProcessEnv {
    __VITE_FULLSTACK_ASSETS_DIR__?: string;
  }
}

export interface CreateViteMiddlewareHandlers<T> {
  /**
   * Called in dev mode. Receives a `getViteServer` getter that lazily creates
   * (and caches) a Vite dev server in middleware mode. Return the
   * framework-specific middleware.
   */
  dev: (getViteServer: () => Promise<ViteDevServer>) => T;
  /**
   * Called in production. Receives the resolved absolute path to the built
   * client assets directory. Return the framework-specific static middleware.
   */
  prod: (assetsDir: string) => T;
}

/**
 * Core helper for building vite-fullstack adapters.
 *
 * Handles dev/prod detection and the lazy Vite dev server singleton.
 * The return type `T` is inferred from your handler callbacks — no casting needed.
 *
 * @example
 * ```ts
 * // Custom adapter
 * import { createViteMiddleware } from "@vfspa/generic-adapter";
 *
 * export function myMiddleware() {
 *   return createViteMiddleware({
 *     dev: (getViteServer) => async (req, res, next) => {
 *       const vite = await getViteServer();
 *       vite.middlewares(req, res, next);
 *     },
 *     prod: (assetsDir) => myFramework.static(assetsDir),
 *   });
 * }
 * ```
 */
export function createViteMiddleware<T>(
  handlers: CreateViteMiddlewareHandlers<T>,
): T {
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

    return handlers.dev(getViteServer);
  } else {
    const assetsDir = path.join(
      import.meta.dirname,
      process.env.__VITE_FULLSTACK_ASSETS_DIR__,
    );

    return handlers.prod(assetsDir);
  }
}
