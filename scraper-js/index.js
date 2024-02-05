import axios from "axios";
import cheerio from "cheerio";
// import fs from "node:fs/promises";
// import jsdom from "jsdom";

// const { JSDOM } = jsdom;
const url = "https://www.reddit.com/r/TwoSentenceHorror/top/";

async function main() {
  try {
    // await axios.get(url).then(function (res) {
    //   let urlList = [];
    //   const loader = cheerio.load(res.data);
    //   const articleList = loader("article");

    //   articleList.forEach((el) => {
    //     console.log(el);
    //   });
    // });

    const response = await axios.get(url);
    const $ = await cheerio.load(response.data);
    const articleList = $("article");

    articleList.each((index, element) => {
      const anchorTag = $(element).find("a");
      const href = anchorTag.attr("href");
      const ariaLabel = anchorTag.attr("aria-label");
      const text = anchorTag.text().trim();

      console.log("Href:", href);
      console.log("Text:", text);
      console.log("Aria-Label", ariaLabel);
      console.log("-------------");
    });

    console.log(articleList.length);

    // const firstArticle = $("article").first();

    // const anchorTag = firstArticle.find("a[slot='full-post-link']");
    // const href = anchorTag.attr("href");
    // const ariaLabel = anchorTag.attr("aria-label");
    // const text = anchorTag.text().trim();

    // console.log("Href:", href);
    // console.log("Text:", text);
    // console.log("Aria-Label:", ariaLabel);
  } catch (e) {
    console.log(e);
  }
}

main();
