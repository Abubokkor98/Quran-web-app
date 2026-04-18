import app from "./index";

const SERVER_PORT = 3001;

console.log(`🕌 Quran API running at http://localhost:${SERVER_PORT}`);

// Bun server config for local development
export default {
  port: SERVER_PORT,
  fetch: app.fetch,
};
