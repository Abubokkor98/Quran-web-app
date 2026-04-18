import { Hono } from "hono";
import { cors } from "hono/cors";
import chaptersRoute from "./routes/chapters";
import searchRoute from "./routes/search";

const SERVER_PORT = 3001;

const app = new Hono();

// Enable CORS
app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
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

console.log(`🕌 Quran API running at http://localhost:${SERVER_PORT}`);

// Bun server configuration
const serverConfig = {
  port: SERVER_PORT,
  fetch: app.fetch,
};

export default serverConfig;
