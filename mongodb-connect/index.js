import dotenv from "dotenv";
import webdriver, { By } from "selenium-webdriver";
import { MongoClient } from "mongodb";

dotenv.config();

const url = "https://www.reddit.com/r/TwoSentenceHorror/top/";
const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DATABASE;
const collectionName = process.env.MONGO_COLLECTION;

const connectMongo = async (data) => {
  const client = new MongoClient(uri);

  try {
    const db = await client.db(dbName);
    const col = await db.collection(collectionName);
    await col.insertMany(data);
  } finally {
    await client.close();
  }
};

const findAllATagsAfterInfiniteScroll = async () => {
  const driver = await new webdriver.Builder()
    .forBrowser(webdriver.Browser.CHROME)
    // .setChromeOptions()
    .build();

  try {
    await driver.get(url);

    let std = 0;

    while (std < 2) {
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
      const inner = await tag.getAttribute("innerHTML");
      const text = await tag.getText();
      href.includes("comment") &&
        filterTags.push({ href: href, innerHTML: inner, text: text });
    }

    return filterTags;
  } catch (err) {
    console.log(err);
  } finally {
  }
};

async function main() {
  try {
    const tags = await findAllATagsAfterInfiniteScroll();
    await connectMongo(tags);
    console.log("Data inserted into MongoDB successfully!");
  } catch (error) {
    console.error("Failed to insert data into MongoDB:", error);
  }
}

main();
