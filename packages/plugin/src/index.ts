import type { Plugin } from "vite";
import { builtinModules } from "node:module";
import path from "node:path";

export interface FullstackPluginOptions {
  /**
   * Path to the server entry file, relative to project root.
   * @default './server/index.ts'
   */
  serverEntry?: string;
  /**
   * Path to the client directory (where index.html lives), relative to project root.
   * @default './client'
   */
  clientDir?: string;
  /**
   * Output directory for the built server bundle, relative to project root.
   * @default 'dist'
   */
  serverOutDir?: string;
  /**
   * Output directory for the built client assets, relative to project root.
   * @default 'dist/public'
   */
  clientOutDir?: string;
}

const defaultOptions: Required<FullstackPluginOptions> = {
  serverEntry: "./src/server/index.ts",
  clientDir: "./src/client",
  serverOutDir: "dist",
  clientOutDir: "dist/public",
};

export default function fullstackPlugin(userOptions: FullstackPluginOptions = {}): Plugin {
  const opts = { ...defaultOptions, ...userOptions };

  return {
    name: "vite-fullstack",

    config(config) {
      const projectRoot = config.root ? path.resolve(config.root) : process.cwd();

      const clientDir = path.resolve(projectRoot, opts.clientDir);
      const serverEntry = path.resolve(projectRoot, opts.serverEntry);
      const serverOutDir = path.resolve(projectRoot, opts.serverOutDir);
      const clientOutDir = path.resolve(projectRoot, opts.clientOutDir);

      return {
        root: clientDir,
        environments: {
          client: {
            build: {
              outDir: clientOutDir,
              rollupOptions: {
                input: path.join(clientDir, "index.html"),
              },
            },
          },
          server: {
            // Inject the client assets path (relative to the server outDir) so
            // adapters can resolve it via import.meta.dirname at runtime — works
            // regardless of where the build is deployed.
            // __VITE_FULLSTACK_DEV__ is frozen to false at build time so
            // bundlers dead-code-eliminate the dev branch without touching NODE_ENV.
            define: {
              "process.env.__VITE_FULLSTACK_ASSETS_DIR__": JSON.stringify(
                path.relative(serverOutDir, clientOutDir),
              ),
            },
            resolve: { noExternal: true },
            build: {
              outDir: serverOutDir,
              emptyOutDir: false,
              rollupOptions: {
                input: { server: serverEntry },
                external: [...builtinModules.flatMap((m) => [m, `node:${m}`]), "vite"],
                output: { format: "esm", entryFileNames: "[name].js" },
              },
            },
          },
        },
        builder: {
          sharedConfigBuild: true,
          async buildApp(builder) {
            await builder.build(builder.environments.client);
            await builder.build(builder.environments.server);
          },
        },
      };
    },
  };
}
