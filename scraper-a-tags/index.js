import axios from "axios";
import jsdom from "jsdom";
import express from "express";
import webdriver, { By } from "selenium-webdriver";

const { JSDOM } = jsdom;
const app = express();
const port = 3001;

const url = "https://www.reddit.com/r/TwoSentenceHorror/top/";

const findAllATags = async () => {
  const driver = await new webdriver.Builder()
    .forBrowser(webdriver.Browser.CHROME)
    .build();

  try {
    await driver.get(url);
    // await driver.actions(10, 10, 0, 5000);

    let std = 0;

    while (std < 5) {
      let lastHeight = await driver.executeScript(
        "return document.body.scrollHeight"
      );

      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight);"
      );

      await driver.sleep(2000);

      let newHeight = await driver.executeScript(
        "return document.body.scrollHeight"
      );

      console.log(std);
      console.log(lastHeight, newHeight);
      std++;
    }

    const tags = await driver.findElements(By.css("a"));
    // let taglength = 0;

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

const main = async () => {
  let length = 0;
  let aTags = [];
  try {
    await axios
      .get(url)
      .then(function (res) {
        const dom = new JSDOM(res.data);
        [...dom.window.document.querySelectorAll("a")].forEach(
          (el) =>
            el.href.includes("comment") && aTags.push(el.outerHTML) && length++
        );
      })
      .then(function () {
        console.log(aTags);
        console.log(length);
      });
  } catch (err) {
    console.log(err);
  }
};

app.get("/", (req, res) => {
  // main();
  findAllATags();
  res.send("hi");
});

app.listen(port, () => {
  console.log(`litsening ${port}`);
});
