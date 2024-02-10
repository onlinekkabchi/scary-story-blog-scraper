import axios from "axios";
import jsdom from "jsdom";
import express from "express";

const { JSDOM } = jsdom;
const app = express();
const port = 3001;

const main = async () => {
  let length = 0;
  let aTags = [];
  try {
    await axios
      .get("https://www.reddit.com/r/TwoSentenceHorror/top/")
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
  main();
  res.send("hi");
});

app.listen(port, () => {
  console.log(`litsening ${port}`);
});
