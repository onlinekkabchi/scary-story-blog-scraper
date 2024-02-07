import axios from "axios";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

axios
  .get("https://www.reddit.com/r/TwoSentenceHorror/top/")
  .then(function (res) {
    const dom = new JSDOM(res.data);
    [...dom.window.document.querySelectorAll("a")].forEach((el) =>
      el.href.includes("comment") ? console.log(el.href) : ""
    );
  });
