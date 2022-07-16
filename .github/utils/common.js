import { readFileSync } from "node:fs";

export function convertFileContent(path) {
  let content;
  try {
    content = JSON.parse(readFileSync(path));
  } catch (error) {
    console.log(`Cannot read content in ${path}`);
  }

  return content;
}
