import { convertFileContent } from "./common.js";
import { renameSync } from "fs";
import { basename } from "path";

const getContent = (val) => (val < 0 ? `(🟢 +${Math.abs(val)})` : val > 0 ? `(🔴 -${Math.abs(val)})` : "");
const diff = (prev, current) => Number(prev) - Number(current);

export const lighthouse = async (core) => {
  const outputObj = convertFileContent("./results.json");
  const prevOutputObj = convertFileContent("lighthouse/results.json");
  const tds = outputObj
    .map((output) => {
      const urlString = output.url;
      const url = new URL(urlString);
      const pathname = url.pathname;
      const emulatedFormFactor = output.emulatedFormFactor;
      const modifiedPathname = pathname.replace(/\//g, "");
      const fileName = modifiedPathname === "" ? "root" : modifiedPathname;
      const filePath = basename(output.localReport);
      const fileNameWithExtension = `${fileName}_${emulatedFormFactor}.html`;
      const renamedFilePath = `lighthouseOutput/${fileNameWithExtension}`;
      renameSync(`lighthouseOutput/${filePath}`, renamedFilePath);
      output.localReport = renamedFilePath;
      const outputScores = output.scores;
      const foundPrevOutputObj = prevOutputObj?.find(
        (x) => x.url === urlString && x.emulatedFormFactor === emulatedFormFactor
      )?.scores;
      let prevPerformance = 0;
      let prevAccessibility = 0;
      let prevBestPractices = 0;
      let prevSeo = 0;
      let prevProgressiveWebApp = 0;
      if (foundPrevOutputObj) {
        prevPerformance = foundPrevOutputObj.performance;
        prevAccessibility = foundPrevOutputObj.accessibility;
        prevBestPractices = foundPrevOutputObj.bestPractices;
        prevSeo = foundPrevOutputObj.seo;
        prevProgressiveWebApp = foundPrevOutputObj.progressiveWebApp;
      }
      const performanceDiff = diff(prevPerformance, outputScores.performance);
      const accessibilityDiff = diff(prevAccessibility, outputScores.accessibility);
      const bestPracticesDiff = diff(prevBestPractices, outputScores.bestPractices);
      const seoDiff = diff(prevSeo, outputScores.seo);
      const pwaDiff = diff(prevProgressiveWebApp, outputScores.progressiveWebApp);
      return `\n| <a href=${urlString}>${pathname}</a> | ${emulatedFormFactor} | ${
        outputScores.performance
      } ${getContent(performanceDiff)} | ${outputScores.accessibility} ${getContent(accessibilityDiff)} | ${
        outputScores.bestPractices
      } ${getContent(bestPracticesDiff)} | ${outputScores.seo} ${getContent(seoDiff)} | ${
        outputScores.progressiveWebApp
      } ${getContent(
        pwaDiff
      )} | <a href=https://kentayamada-dev.github.io/instagram-clone/lighthouse/${fileNameWithExtension}>See more...</a> |`;
    })
    .join("");
  const result = `## Lighthouse Results\n\nPath | Device | Performance | Accessibility | Best Practices | SEO | PWA | Detail |\n|---|---|---|---|---|---|---|---|${tds}\n`;
  await core.summary.addRaw(result).write();
};
