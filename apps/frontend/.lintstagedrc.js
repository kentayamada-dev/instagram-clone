const prettierOptions = "--ignore-path .prettierignore --config .prettierrc.json --cache --write";
const eslintOptions = "--fix --config .eslintrc.js --cache";
const cspellOptions = "--cache --config cspell.json --no-must-find-files";
const tscOptions = `--noEmit --project ${process.cwd()}/apps/frontend/tsconfig.json`;

module.exports = {
  "*.ts?(x)": (absolutePaths) => {
    console.log("apps/frontend > *.ts?(x)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths
      .join(" ")
      .replaceAll("/[", "/[[]")
      .replaceAll("]/", "[]]/")
      .replaceAll("].", "[]].");
    return [
      `eslint ${eslintOptions} ${joinedAbsolutePaths}`,
      `prettier ${prettierOptions} ${joinedAbsolutePaths}`,
      `cspell ${cspellOptions} ${joinedAbsolutePaths}`,
      `tsc ${tscOptions}`
    ];
  },
  "!(package.json)*.!(*ts?(x))": (absolutePaths) => {
    console.log("apps/frontend > !(package.json)*.!(*ts?(x))", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier ${prettierOptions} ${joinedAbsolutePaths}`, `cspell ${cspellOptions} ${joinedAbsolutePaths}`];
  },
  "package.json": (absolutePaths) => {
    console.log("apps/frontend > package.json", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `sort-package-json ${joinedAbsolutePaths}`,
      `prettier ${prettierOptions} ${joinedAbsolutePaths}`,
      `cspell ${cspellOptions} ${joinedAbsolutePaths}`
    ];
  }
};
