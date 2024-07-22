import scrapeIt from "scrape-it";
import { Article } from "../types";

const months = {
  ian: 0,
  feb: 1,
  mart: 2,
  apr: 3,
  mai: 4,
  iun: 5,
  iul: 6,
  aug: 7,
  sept: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export async function scrape() {
  const { data } = await scrapeIt<{ articles: Article[] }>(
    "https://www.b1tv.ro/ultimele-stiri",
    {
      articles: {
        listItem: ".article",
        data: {
          title: "h2.article__title",
          source: { convert: () => "www.b1tv.ro" },
          url: {
            selector: ".article__media > a",
            attr: "href",
          },
          createdOn: {
            selector: ".article__eyebrow > span",
            convert: val => {
              const arr = val.trim().split(" ");
              const day = arr[0];
              const year = arr[2];
              let month = new Date().getMonth();
              const monthStr = val[1].split(".")[0];
              if (val[1] in months) month = parseInt(monthStr);

              return new Date(year, month, day);
            },
          },
        },
      },
    },
  );

  return data.articles;
}
