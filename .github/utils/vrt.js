import { convertFileContent } from "./common.js";

export async function vrt(core) {
  const outputObj = convertFileContent("./reg.json");
  const stringifiedOutputObj = JSON.stringify(outputObj, null, 2);
  const { failedItems, newItems, deletedItems, passedItems } = outputObj;
  const result = `<h2>VRT Results</h2><table><tr><th>Result</th><th>Passed 🔵</th><th>Changed 🔴</th><th>New ⚪</th><th>Deleted ⚫</th></tr><tr><td>Number of images</td><td>${passedItems.length}</td><td>${failedItems.length}</td><td>${newItems.length}</td><td>${deletedItems.length}</td></tr></table><details><summary>Show Detail</summary>\n\n\`\`\`json\n${stringifiedOutputObj}\n\`\`\`\n\n</details>`;
  await core.summary.addRaw(result).write();
}
