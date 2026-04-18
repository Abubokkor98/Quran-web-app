import app from "./index";

const DEFAULT_PORT = 3001;
const SERVER_PORT = Number(process.env.SERVER_PORT) || DEFAULT_PORT;

console.log(`🕌 Quran API running at http://localhost:${SERVER_PORT}`);

// Bun server config for local development
const server = {
  port: SERVER_PORT,
  fetch: app.fetch,
};

export default server;
