import { db } from "./db";
import { Article } from "./db/schema";
import { scrape as scrapeDigi24 } from "./scrappers/digi24";
import { scrape as scrapeB1 } from "./scrappers/b1";
import { scrape as scrapeRealitatea } from "./scrappers/realitate";
import { Article as ArticleType } from "./types";

function setUpdateInterval({
  scrapeFn,
  label,
  ms,
}: {
  scrapeFn: () => Promise<ArticleType[]>;
  label: string;
  ms: number;
}) {
  let prevArticles: ArticleType[] = [];
  setInterval(async () => {
    console.log(`Searching new articles for ${label}...`);
    const currentArticles = await scrapeFn();

    let idx = currentArticles.length;
    if (prevArticles.length > 0) {
      idx = currentArticles.findIndex(
        article => article.url === prevArticles[0].url,
      );
      if (idx < 0) return;
    }

    prevArticles = currentArticles;
    const newArticles = currentArticles.slice(0, idx);
    if (newArticles.length === 0) {
      console.log("No new articles found");
      return;
    }
    console.log(
      `Found ${newArticles.length} new articles from ${label}. Adding them to the db...`,
    );
    console.log(newArticles);

    try {
      await db.insert(Article).values(newArticles);
      console.log(`Added new articles to the DB for ${label}`);
    } catch (err) {
      console.error(err);
    }
  }, ms);
}

setUpdateInterval({
  scrapeFn: scrapeDigi24,
  ms: 10 * 60 * 1000,
  label: "Digi24",
});
setUpdateInterval({
  scrapeFn: scrapeRealitatea,
  ms: 20 * 60 * 1000,
  label: "Realitatea",
});
setUpdateInterval({ scrapeFn: scrapeB1, ms: 30 * 60 * 1000, label: "B1" });
