import { convertFileContent } from "./common.js";
import { writeFileSync } from "fs";
import { basename } from "path";

const LIGHTHOUSE_PATH = "apps/gh-pages/assets/lighthouse.json";

export const lighthouse = async (url, date) => {
  const outputObj = convertFileContent("./results.json");
  const lighthouseData = convertFileContent(LIGHTHOUSE_PATH);
  for (const output of outputObj) {
    output.localReport = basename(output.localReport);
  }
  lighthouseData.push({ actionUrl: url, date, data: outputObj });
  writeFileSync(LIGHTHOUSE_PATH, JSON.stringify(lighthouseData, null, 2));
};
