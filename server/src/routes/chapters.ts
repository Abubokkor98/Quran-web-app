import { Hono } from "hono";
import { getAllChapters, getChapterById } from "../services/quran.service";

const TOTAL_CHAPTERS = 114;

const chaptersRoute = new Hono();

// Get all chapters
chaptersRoute.get("/chapters", (context) => {
  const chapters = getAllChapters();
  return context.json({ chapters });
});

// Get a single chapter by ID
chaptersRoute.get("/chapters/:id", (context) => {
  const id = Number(context.req.param("id"));

  if (isNaN(id) || id < 1 || id > TOTAL_CHAPTERS) {
    return context.json({ error: "Invalid chapter ID. Must be 1-114." }, 400);
  }

  const lang = context.req.query("lang");
  const chapter = getChapterById(id, lang);

  if (!chapter) {
    return context.json({ error: "Chapter not found." }, 404);
  }

  return context.json({ chapter });
});

export default chaptersRoute;
