import scrapeIt from "scrape-it";
import { Article } from "../types";

export async function scrape() {
  const { data } = await scrapeIt<{ articles: Article[] }>(
    "https://www.digi24.ro/ultimele-stiri",
    {
      articles: {
        listItem: "article.article",
        data: {
          title: "h2.article-title",
          source: { convert: () => "www.digi24.ro" },
          url: {
            selector: ".article-thumb > a",
            attr: "href",
            convert: val => `https://www.digi24.ro${val}`,
          },
          createdOn: {
            selector: ".article-date time",
            attr: "datetime",
            convert: val => new Date(val),
          },
        },
      },
    },
  );

  return data.articles;
}
