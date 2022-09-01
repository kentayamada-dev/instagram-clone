const Mustache = require("mustache");
const fs = require("fs");

const MUSTACHE_MAIN_DIR = "./main.mustache";

const DATA = {
  GITHUB_ACTION_URL: process.env["GITHUB_ACTION_URL"]
};

const generateReadMe = () => {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync("../../../README.md", output);
  });
};

generateReadMe();
