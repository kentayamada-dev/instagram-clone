import { convertFileContent } from "./common.js";

export const vrt = async (core) => {
  const outputObj = convertFileContent("./reg.json");
  const { failedItems, newItems, deletedItems, passedItems } = outputObj;
  const result = `## VRT Results\n\nResult | Passed 🔵 | Changed 🔴 | New ⚪ | Deleted ⚫ |\n|---|---|---|---|---|\n| Number of images | ${passedItems.length} | ${failedItems.length} | ${newItems.length} | ${deletedItems.length} |\n\n<a href=https://kentayamada-dev.github.io/instagram-clone/report>See more...</a>`;
  await core.summary.addRaw(result).write();
};
