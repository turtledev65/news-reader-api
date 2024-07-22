import scrapeIt from "scrape-it";
import { Article } from "../types";

export async function scrape() {
  const { data } = await scrapeIt<{ articles: Article[] }>(
    "https://www.realitatea.net/ultimele-stiri",
    {
      articles: {
        listItem: `article[role="article"]`,
        data: {
          title: { selector: "figure a", attr: "title" },
          source: { convert: () => "www.realitatea.net" },
          url: {
            selector: "figure a",
            attr: "href",
            convert: val => `https://www.realitatea.net${val}`,
          },
          createdOn: {
            convert: () => new Date(),
          },
        },
      },
    },
  );

  return data.articles;
}
