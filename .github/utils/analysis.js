import { convertFileContent } from "./common.js";
import filesize from "filesize";

const hasProperty = (obj, key) => !!obj && Object.prototype.hasOwnProperty.call(obj, key);
const getFileSize = filesize.partial({ base: 2, standard: "jedec" });
const getContent = (val) =>
  val < 0 ? `(🔴 +${getFileSize(Math.abs(val))})` : val > 0 ? `(🟢 -${getFileSize(Math.abs(val))})` : "";

const fillObject = (from, to) => {
  for (var key in from) {
    if (hasProperty(from, key)) {
      if (Object.prototype.toString.call(from[key]) === "[object Object]") {
        if (!hasProperty(to, key)) {
          to[key] = {};
        }
        fillObject(from[key], to[key]);
      } else if (!hasProperty(to, key)) {
        to[key] = from[key];
      }
    }
  }
};

export const analysis = async (core) => {
  const outputObj = convertFileContent("apps/frontend/dist/analyze/__bundle_analysis.json");
  const prevOutputObj = convertFileContent("bundle/__bundle_analysis.json") ?? {
    __global: { raw: 0, gzip: 0 }
  };
  const unionOfKeys = [
    ...new Set([{ ...outputObj, ...prevOutputObj }].reduce((r, e) => [...r, ...Object.keys(e)], []))
  ];
  const defaultObj = {};
  for (const value of unionOfKeys.values()) {
    defaultObj[value] = {
      raw: 0,
      gzip: 0
    };
  }
  fillObject(defaultObj, outputObj);
  fillObject(defaultObj, prevOutputObj);
  let tds = "";
  for (const key in outputObj) {
    if (key !== "__global") {
      const size = outputObj[key]["gzip"];
      const prevSize = prevOutputObj[key]["gzip"];
      const firstLoad = outputObj[key]["gzip"] + outputObj["__global"]["gzip"];
      const prevFirstLoad = prevOutputObj[key]["gzip"] + prevOutputObj["__global"]["gzip"];
      const sizeDiff = prevSize - size;
      const firstLoadDiff = prevFirstLoad - firstLoad;
      tds += `| \`${key}\` | ${getFileSize(size)} ${getContent(sizeDiff)} | ${getFileSize(firstLoad)} ${getContent(
        firstLoadDiff
      )} |\n`;
    }
  }
  const globalSize = outputObj["__global"]["gzip"];
  const prevGlobalSize = prevOutputObj["__global"]["gzip"];
  const globalSizeDiff = prevGlobalSize - globalSize;
  const global = `| \`global\` | ${getFileSize(globalSize)} ${getContent(globalSizeDiff)} |`;
  const result = `## Next.js Bundle Analysis Results\n\nPage | Size (compressed) | First Load |\n|---|---|---|\n${global}\n${tds}\n\n<a href=https://kentayamada-dev.github.io/instagram-clone/client>See more...</a>`;
  await core.summary.addRaw(result).write();
};
