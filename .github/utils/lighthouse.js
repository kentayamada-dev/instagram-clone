import { convertFileContent } from "./common.js";

export async function lighthouse(core) {
  const outputObj = convertFileContent("./results.json");
  const prevOutputObj = convertFileContent("lighthouse/results.json");
  const stringifiedOutputObj = JSON.stringify(outputObj, null, 2);
  const getContent = (val) => (val < 0 ? `(🟢 +${Math.abs(val)})` : val > 0 ? `(🔴 -${Math.abs(val)})` : "");
  const diff = (prev, current) => Number(prev) - Number(current);
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
      return `<tr><td><a href=${output.url}>${url.pathname}</a></td><td>${output.emulatedFormFactor}</td><td>${
        outputScores.performance
      } ${getContent(performanceDiff)}</td><td>${outputScores.accessibility} ${getContent(accessibilityDiff)}</td><td>${
        outputScores.bestPractices
      } ${getContent(bestPracticesDiff)}</td><td>${outputScores.seo} ${getContent(seoDiff)}</td><td>${
        outputScores.progressiveWebApp
      } ${getContent(pwaDiff)}</td></tr>`;
    })
    .join("");
  const result = `<h2>Lighthouse Results</h2><table><tr><th>Path</th><th>Device</th><th>Performance</th><th>Accessibility</th><th>Best Practices</th><th>SEO</th><th>PWA</th></tr>${tds}</table><details><summary>Show Detail</summary>\n\n\`\`\`json\n${stringifiedOutputObj}\n\`\`\`\n\n</details>`;
  await core.summary.addRaw(result).write();
}
