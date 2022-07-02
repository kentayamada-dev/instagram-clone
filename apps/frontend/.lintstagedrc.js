module.exports = {
  "*.ts?(x)": (absolutePaths) => {
    console.log("apps/frontend > *.ts?(x)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths
      .join(" ")
      .replaceAll("/[", "/[[]")
      .replaceAll("]/", "[]]/")
      .replaceAll("].", "[]].");
    return [
      `eslint --fix ${joinedAbsolutePaths}`,
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths} --no-must-find-files`,
      `tsc -p ${process.cwd()}/apps/frontend/tsconfig.json --noEmit`
    ];
  },
  "*.!(*ts)": (absolutePaths) => {
    console.log("apps/frontend > *.!(*ts)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier --write ${joinedAbsolutePaths}`, `cspell ${joinedAbsolutePaths} --no-must-find-files`];
  }
};
