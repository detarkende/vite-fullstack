import express from "express";
import { viteMiddleware } from "@vite-fullstack/express";

const app = express();

app.get("/api/data", (_req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use(viteMiddleware());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
