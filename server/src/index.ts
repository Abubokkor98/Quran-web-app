import { Hono } from "hono";
import { cors } from "hono/cors";
import chaptersRoute from "./routes/chapters";
import searchRoute from "./routes/search";

const app = new Hono();

// Enable CORS for local and production origins
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL ?? "",
    ].filter(Boolean),
    allowMethods: ["GET"],
  })
);

// API routes
app.route("/api", chaptersRoute);
app.route("/api", searchRoute);

// Root endpoint
app.get("/", (context) => {
  return context.json({
    name: "Quran API",
    version: "1.0.0",
    endpoints: [
      "GET /api/chapters",
      "GET /api/chapters/:id",
      "GET /api/search?q={query}",
    ],
  });
});

export default app;
