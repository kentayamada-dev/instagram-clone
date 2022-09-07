import { convertFileContent } from "./common.js";
import { writeFileSync } from "fs";

const BUNDLE_PATH = "apps/gh-pages/src/assets/bundle.json";

export const analysis = async (url, date) => {
  const outputObj = convertFileContent("apps/frontend/dist/analyze/__bundle_analysis.json");
  const bundleData = convertFileContent(BUNDLE_PATH);
  bundleData.push({ actionUrl: url, date, data: outputObj });
  writeFileSync(BUNDLE_PATH, JSON.stringify(bundleData, null, 2));
};
