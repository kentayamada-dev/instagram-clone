"use strict";
const { readFileSync, readdirSync } = require("fs");
const { exit } = require("process");
const { join } = require("path");

const isLowerCaseLetterOnly = (str) => /^[a-z]+$/u.test(str);
const isJsonFile = (str) => /^[^.]+.json$/u.test(str);

const getNestedKeys = (data, keys) => {
  if (!(data instanceof Array) && typeof data == "object") {
    Object.keys(data).forEach((key) => {
      keys.push(key);
      const value = data[key];
      if (typeof value === "object" && !(value instanceof Array)) {
        getNestedKeys(value, keys);
      }
    });
  }
  return keys;
};

const validateI18nJsonFiles = (localesDirPath) => {
  let isErrorOccured = false;

  // Check public/locales/
  const localesDirContents = readdirSync(localesDirPath);
  const localesDirInvalidContents = localesDirContents.filter((content) => !isLowerCaseLetterOnly(content));
  if (localesDirInvalidContents.length) {
    console.error(
      `Found invalid contents under "${localesDirPath.replace(process.cwd(), "")}": `,
      localesDirInvalidContents
    );
    isErrorOccured = true;
  }
  if (isErrorOccured) exit(1);

  // Check public/locales/${lang}/
  const localesDataObjects = [];
  for (const content of localesDirContents) {
    const localeDirPath = `${localesDirPath}/${content}`;
    const localeDirContents = readdirSync(localeDirPath);
    const localeDirInvalidContents = localeDirContents.filter((content) => !isJsonFile(content));
    if (localeDirInvalidContents.length) {
      isErrorOccured = true;
      console.error(
        `Found invalid contents under "${localeDirPath.replace(process.cwd(), "")}": `,
        localeDirInvalidContents
      );
    }
    if (content !== "en") localesDataObjects.push({ locale: content, files: localeDirContents });
  }
  if (isErrorOccured) exit(1);

  const sourceDirPath = `${localesDirPath}/en`;
  const sourceDirContents = readdirSync(sourceDirPath);

  for (const content of localesDataObjects) {
    const path = `${localesDirPath}/${content.locale}`;
    const contentsDiffs1 = content.files.filter((i) => sourceDirContents.indexOf(i) == -1);
    if (contentsDiffs1.length) {
      isErrorOccured = true;
      console.error(
        contentsDiffs1,
        `in "${path.replace(process.cwd(), "")}" is missing in "${sourceDirPath.replace(process.cwd(), "")}"`
      );
    }
    const contentsDiffs2 = sourceDirContents.filter((i) => content.files.indexOf(i) == -1);
    if (contentsDiffs2.length) {
      isErrorOccured = true;
      console.error(
        contentsDiffs2,
        `in "${sourceDirPath.replace(process.cwd(), "")}" is missing in "${path.replace(process.cwd(), "")}"`
      );
    }
  }
  if (isErrorOccured) exit(1);

  // Check public/locales/${lang}/${namespace}.json
  const sourceData = {};
  for (const content of sourceDirContents) {
    const data = JSON.parse(readFileSync(`${sourceDirPath}/${content}`, { encoding: "utf-8" }));
    const keys = getNestedKeys(data, []);
    sourceData[content] = keys;
  }

  for (const content of localesDataObjects) {
    const pathToLocale = `${localesDirPath}/${content.locale}`;
    for (const file of content.files) {
      const pathToFile = `${pathToLocale}/${file}`;
      const data = JSON.parse(readFileSync(pathToFile, { encoding: "utf-8" }));
      const keys = getNestedKeys(data, []);
      const pathToSourceFile = `${sourceDirPath}/${file}`;
      const keysDiffs1 = keys.filter((i) => sourceData[file].indexOf(i) == -1);
      if (keysDiffs1.length) {
        isErrorOccured = true;
        console.error(
          keysDiffs1,
          `in "${pathToFile.replace(process.cwd(), "")}" is missing in "${pathToSourceFile.replace(process.cwd(), "")}"`
        );
      }
      const keysDiffs2 = sourceData[file].filter((i) => keys.indexOf(i) == -1);
      if (keysDiffs2.length) {
        isErrorOccured = true;
        console.error(
          keysDiffs2,
          `in "${pathToSourceFile.replace(process.cwd(), "")}" is missing in "${pathToFile.replace(process.cwd(), "")}"`
        );
      }
    }
  }
  if (isErrorOccured) exit(1);
};

validateI18nJsonFiles(join(process.cwd(), "public/locales"));
