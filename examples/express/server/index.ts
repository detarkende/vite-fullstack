import express from "express";
import { viteMiddleware } from "@vfspa/express-adapter";

const app = express();

app.get("/api/data", (_req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.use(viteMiddleware());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
