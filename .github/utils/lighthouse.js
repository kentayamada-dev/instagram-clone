import { convertFileContent } from "./common.js";

const getContent = (val) => (val < 0 ? `(🟢 +${Math.abs(val)})` : val > 0 ? `(🔴 -${Math.abs(val)})` : "");
const diff = (prev, current) => Number(prev) - Number(current);

export const lighthouse = async (core) => {
  const outputObj = convertFileContent("./results.json");
  const prevOutputObj = convertFileContent("lighthouse/results.json");
  const stringifiedOutputObj = JSON.stringify(outputObj, null, 2);
  const tds = outputObj
    .map((output) => {
      const url = new URL(output.url);
      const outputScores = output.scores;
      let prevOutputScores = {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0,
        progressiveWebApp: 0
      };
      if (prevOutputObj) {
        const foundPrevOutputObj = prevOutputObj.find(
          (x) => x.url === output.url && x.emulatedFormFactor === output.emulatedFormFactor
        ).scores;
        if (foundPrevOutputObj) {
          prevOutputScores = foundPrevOutputObj;
        }
      }
      const performanceDiff = diff(prevOutputScores.performance, outputScores.performance);
      const accessibilityDiff = diff(prevOutputScores.accessibility, outputScores.accessibility);
      const bestPracticesDiff = diff(prevOutputScores.bestPractices, outputScores.bestPractices);
      const seoDiff = diff(prevOutputScores.seo, outputScores.seo);
      const pwaDiff = diff(prevOutputScores.progressiveWebApp, outputScores.progressiveWebApp);
      return `\n| <a href=${output.url}>${url.pathname}</a> | ${output.emulatedFormFactor} | ${
        outputScores.performance
      } ${getContent(performanceDiff)} | ${outputScores.accessibility} ${getContent(accessibilityDiff)} | ${
        outputScores.bestPractices
      } ${getContent(bestPracticesDiff)} | ${outputScores.seo} ${getContent(seoDiff)} | ${
        outputScores.progressiveWebApp
      } ${getContent(pwaDiff)} |`;
    })
    .join("");
  const result = `## Lighthouse Results\n\nPath | Device | Performance | Accessibility | Best Practices | SEO | PWA |\n|---|---|---|---|---|---|---|${tds}\n<details>\n\n\`\`\`json\n${stringifiedOutputObj}\n\`\`\`\n\n</details>`;
  await core.summary.addRaw(result).write();
};
