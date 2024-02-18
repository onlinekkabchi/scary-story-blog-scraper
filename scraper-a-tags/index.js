import express from "express";
import dotenv from "dotenv";
import webdriver, { By } from "selenium-webdriver";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const port = 3001;

const url = "https://www.reddit.com/r/TwoSentenceHorror/top/";
const uri = process.env.MONGO_URI;

const connectMongo = async () => {
  const client = new MongoClient(uri);

  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    const query = { title: "Back to the Future" };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    await client.close();
  }
};

const findAllATagsAfterInfiniteScroll = async () => {
  // const chrome = new ChromiumWebDriver();
  const driver = await new webdriver.Builder()
    .forBrowser(webdriver.Browser.CHROME)
    // .setChromeOptions()
    .build();

  try {
    await driver.get(url);

    let std = 0;

    while (std < 2) {
      // let lastHeight = await driver.executeScript(
      //   "return document.body.scrollHeight"
      // );
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight);"
      );
      await driver.sleep(2000);

      std++;
    }

    const tags = await driver.findElements(By.css("a"));
    const filterTags = [];

    for (let tag of tags) {
      const href = await tag.getAttribute("href");
      // const text = await tag.getText();
      // console.log(tag.getAttribute("href"));
      // href.includes("comment") ? taglength++ : "";
      // href.includes("comment") && filterTags.push(tag);
      // href.includes("comment") && filterTags.push({ href: href, text: text });
      const inner = await tag.getAttribute("innerHTML");
      const text = await tag.getText();
      href.includes("comment") &&
        filterTags.push({ href: href, innerHTML: inner, text: text });
    }

    // console.log(filterTags);
    return filterTags;
  } catch (err) {
    console.log(err);
  } finally {
  }
};

app.get("/connect", (req, res) => {
  connectMongo();
});

app.get("/tags", async (req, res) => {
  const result = await findAllATagsAfterInfiniteScroll();
  res.send(result);
});

app.get("/", (req, res) => {
  connectMongo();
  res.send("hi");
});

app.listen(port, () => {
  console.log(`litsening ${port}`);
});
