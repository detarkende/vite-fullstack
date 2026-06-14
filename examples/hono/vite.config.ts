import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fullstack from "@vfspa/plugin";

export default defineConfig({
  plugins: [fullstack(), react()],
});
