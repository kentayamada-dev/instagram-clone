import { convertFileContent } from "./common.js";

const getContent = (val) => (val < 0 ? `(🟢 +${Math.abs(val)})` : val > 0 ? `(🔴 -${Math.abs(val)})` : "");
const diff = (prev, current) => Number(prev) - Number(current);

export async function lighthouse(core) {
  const outputObj = convertFileContent("./results.json");
  const prevOutputObj = convertFileContent("lighthouse/results.json");
  const stringifiedOutputObj = JSON.stringify(outputObj, null, 2);
  const tds = outputObj
    .map((output, index) => {
      const url = new URL(output.url);
      const outputScores = output.scores;
      let performanceDiff = 0;
      let accessibilityDiff = 0;
      let bestPracticesDiff = 0;
      let seoDiff = 0;
      let pwaDiff = 0;
      if (prevOutputObj) {
        const prevOutputScores = prevOutputObj[index].scores;
        performanceDiff = diff(prevOutputScores.performance, outputScores.performance);
        accessibilityDiff = diff(prevOutputScores.accessibility, outputScores.accessibility);
        bestPracticesDiff = diff(prevOutputScores.bestPractices, outputScores.bestPractices);
        seoDiff = diff(prevOutputScores.seo, outputScores.seo);
        pwaDiff = diff(prevOutputScores.progressiveWebApp, outputScores.progressiveWebApp);
      }
      return `\n| <a href=${output.url}>${url.pathname}</a> | ${output.emulatedFormFactor} | ${
        outputScores.performance
      } ${getContent(performanceDiff)} | ${outputScores.accessibility} ${getContent(accessibilityDiff)} | ${
        outputScores.bestPractices
      } ${getContent(bestPracticesDiff)} | ${outputScores.seo} ${getContent(seoDiff)} | ${
        outputScores.progressiveWebApp
      } ${getContent(pwaDiff)} |`;
    })
    .join("");
  const result = `## Lighthouse Results\n\nPath | Device | Performance | Accessibility | Best Practices | SEO | PWA |\n|---|---|---|---|---|---|---|${tds}\n<details><summary>Show Detail</summary>\n\n\`\`\`json\n${stringifiedOutputObj}\n\`\`\`\n\n</details>`;
  await core.summary.addRaw(result).write();
}
