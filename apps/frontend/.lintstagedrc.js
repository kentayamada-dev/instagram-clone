module.exports = {
  "*.ts?(x)": (absolutePaths) => {
    const joinedAbsolutePaths = absolutePaths.join(" ");
    if (Boolean(joinedAbsolutePaths.match(/\[[^\]]*]/g))) {
      joinedAbsolutePaths = joinedAbsolutePaths
        .replaceAll("/[", "/[[]")
        .replaceAll("]/", "[]]/")
        .replaceAll("].", "[]].");
    }
    return [
      `eslint --fix ${joinedAbsolutePaths}`,
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths} --no-must-find-files`,
      `tsc -p ${process.cwd()}/apps/frontend/tsconfig.json --noEmit`
    ];
  },
  "*.!(ts?(x))": (absolutePaths) => {
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths} --no-must-find-files`
    ];
  }
};
