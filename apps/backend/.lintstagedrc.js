module.exports = {
  "*.ts": (absolutePaths) => {
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `eslint --fix ${joinedAbsolutePaths}`,
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths}`,
      `tsc -p ${process.cwd()}/apps/backend/tsconfig.json --noEmit`
    ];
  },
  "!(.eslintrc).{js,json}": (absolutePaths) => {
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths}`
    ];
  }
};
