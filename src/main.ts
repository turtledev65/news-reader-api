import "dotenv/config";
import "./update-db";

import express from "express";
import cors from "cors";
import { db } from "./db";
import { Article } from "./db/schema";
import { gt, eq, sql, and, desc, SQLWrapper } from "drizzle-orm";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.post("/api/last-week", async (req, res) => {
  const { source } = req.body;

  const filters: SQLWrapper[] = [
    gt(Article.createdOn, sql`NOW() - INTERVAL '7 days'`),
  ];
  if (source) filters.push(eq(Article.source, source));

  const query = db
    .select()
    .from(Article)
    .where(and(...filters))
    .orderBy(desc(Article.createdOn));

  const out = await query;
  if (out.length > 0) res.send(out);
  else res.status(404).send("No news found");
});

app.post("/api/last-48h", async (req, res) => {
  const { source } = req.body;

  const filters: SQLWrapper[] = [
    gt(Article.createdOn, sql`NOW() - INTERVAL '2 days'`),
  ];
  if (source) filters.push(eq(Article.source, source));

  const query = db
    .select()
    .from(Article)
    .where(and(...filters))
    .orderBy(desc(Article.createdOn));

  const out = await query;
  if (out.length > 0) res.send(out);
  else res.status(404).send("No news found");
});

app.post("/api/last-24h", async (req, res) => {
  const { source } = req.body;

  const filters: SQLWrapper[] = [
    gt(Article.createdOn, sql`NOW() - INTERVAL '1 day'`),
  ];
  if (source) filters.push(eq(Article.source, source));

  const query = db
    .select()
    .from(Article)
    .where(and(...filters))
    .orderBy(desc(Article.createdOn));

  const out = await query;
  if (out.length > 0) res.send(out);
  else res.status(404).send("No news found");
});

app.post("/api/last-hour", async (req, res) => {
  const { source } = req.body;

  const filters: SQLWrapper[] = [
    gt(Article.createdOn, sql`NOW() - INTERVAL '1 hour'`),
  ];
  if (source) filters.push(eq(Article.source, source));

  const query = db
    .select()
    .from(Article)
    .where(and(...filters))
    .orderBy(desc(Article.createdOn));

  const out = await query;
  if (out.length > 0) res.send(out);
  else res.status(404).send("No news found");
});

app.listen(parseInt(process.env.PORT as string), () =>
  console.log(`Listening on port ${process.env.PORT}`),
);
