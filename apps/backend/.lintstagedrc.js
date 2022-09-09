const prettierOptions = "--ignore-path .prettierignore --config .prettierrc.json --cache --write";
const eslintOptions = "--fix --config .eslintrc.js --cache";
const cspellOptions = "--cache --config cspell.json --no-must-find-files";
const tscOptions = `--noEmit --project ${process.cwd()}/apps/backend/tsconfig.json`;

module.exports = {
  "*.ts": (absolutePaths) => {
    console.log("apps/backend > *.ts", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `eslint ${eslintOptions} ${joinedAbsolutePaths}`,
      `prettier ${prettierOptions} ${joinedAbsolutePaths}`,
      `cspell ${cspellOptions} ${joinedAbsolutePaths}`,
      `tsc ${tscOptions}`
    ];
  },
  "!(package.json)*.!(*ts)": (absolutePaths) => {
    console.log("apps/backend > *.!(*ts)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier ${prettierOptions} ${joinedAbsolutePaths}`, `cspell ${cspellOptions} ${joinedAbsolutePaths}`];
  },
  "package.json": (absolutePaths) => {
    console.log("apps/backend > package.json", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `sort-package-json ${joinedAbsolutePaths}`,
      `prettier ${prettierOptions} ${joinedAbsolutePaths}`,
      `cspell ${cspellOptions} ${joinedAbsolutePaths}`
    ];
  }
};
