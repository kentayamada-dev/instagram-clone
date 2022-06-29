module.exports = {
  "*.ts": (absolutePaths) => {
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `eslint --fix ${joinedAbsolutePaths}`,
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths} --no-must-find-files`,
      `tsc -p ${process.cwd()}/apps/backend/tsconfig.json --noEmit`
    ];
  },
  "*.!(ts)": (absolutePaths) => {
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths} --no-must-find-files`
    ];
  }
};
