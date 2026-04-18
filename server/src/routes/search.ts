import { Hono } from "hono";
import { searchVerses } from "../services/quran.service";

const searchRoute = new Hono();

// Search for verses by keyword
searchRoute.get("/search", (context) => {
  const query = context.req.query("q") ?? "";

  if (query.trim().length < 2) {
    return context.json(
      { error: "Query must be at least 2 characters." },
      400
    );
  }

  const results = searchVerses(query);

  return context.json({
    query,
    totalResults: results.length,
    results,
  });
});

export default searchRoute;
