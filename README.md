# VFSPA

VFSPA stands for Vite Fullstack SPA.

VFSPA is a way to build full-stack single-page apps with Vite, where:

- the client is built by Vite
- the server is built by Vite
- framework adapters (for example Hono or Express) hide the dev/prod middleware setup

If you want to use VFSPA in your app, start with the plugin and then pick an adapter.

## Package Docs

- [@vfspa/plugin](packages/plugin/README.md)
- [@vfspa/generic-adapter](packages/generic-adapter/README.md)
- [@vfspa/hono-adapter](packages/hono-adapter/README.md)
- [@vfspa/express-adapter](packages/express-adapter/README.md)

## Quick Start

1. Add the VFSPA plugin in your Vite config.
2. Attach an adapter middleware to your server app.

See the package docs above for framework-specific examples.
