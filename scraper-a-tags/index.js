import axios from "axios";
import jsdom from "jsdom";
import express from "express";
import dotenv from "dotenv";
import webdriver, { By } from "selenium-webdriver";
import { MongoClient } from "mongodb";

dotenv.config();

const { JSDOM } = jsdom;
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
  const driver = await new webdriver.Builder()
    .forBrowser(webdriver.Browser.CHROME)
    .build();

  try {
    await driver.get(url);

    let std = 0;

    while (std < 5) {
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
      // console.log(tag.getAttribute("href"));
      // href.includes("comment") ? taglength++ : "";
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
};

app.get("/connect", (req, res) => {
  connectMongo();
});

app.get("/tags", (req, res) => {
  findAllATagsAfterInfiniteScroll();
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`litsening ${port}`);
});
