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
  "*.!(*ts)": (absolutePaths) => {
    console.log("apps/backend-prettier > *.!(*ts)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier ${prettierOptions} ${joinedAbsolutePaths}`];
  },
  "*.!(*ts)": (absolutePaths) => {
    console.log("apps/backend-cspell > *.!(*ts)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`cspell ${cspellOptions} ${joinedAbsolutePaths}`];
  }
};
