module.exports = {
  extends: ["@kentayamada-dev/eslint-config-base"],
  ignorePatterns: [".eslintrc.js", "coverage", "dist", "prisma", "jest.config.js"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  rules: {
    // eslint
    "camelcase": [
      "error",
      {
        ignoreDestructuring: true
      }
    ],
    "func-style": [
      "error",
      "declaration",
      {
        allowArrowFunctions: false
      }
    ],
    "id-length": [
      "error",
      {
        exceptions: ["_"]
      }
    ],
    "max-lines": "off",
    "new-cap": "off",
    "no-confusing-arrow": "off",
    "no-void": [
      "error",
      {
        allowAsStatement: true
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: "return",
        prev: "*"
      }
    ],
    // typescript-eslint
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "explicit",
          constructors: "explicit",
          methods: "explicit",
          parameterProperties: "no-public",
          properties: "explicit"
        }
      }
    ],
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true
      }
    ],
    "@typescript-eslint/no-extra-parens": "off",
    "@typescript-eslint/no-extraneous-class": [
      "error",
      {
        allowConstructorOnly: false,
        allowEmpty: true,
        allowStaticOnly: false,
        allowWithDecorator: false
      }
    ],
    "@typescript-eslint/no-parameter-properties": [
      "error",
      {
        allows: ["private readonly"]
      }
    ],
    "@typescript-eslint/no-type-alias": [
      "error",
      {
        allowAliases: "always",
        allowCallbacks: "never",
        allowConditionalTypes: "always",
        allowConstructors: "never",
        allowGenerics: "always",
        allowLiterals: "never",
        allowMappedTypes: "always",
        allowTupleTypes: "never"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        vars: "all"
      }
    ],
    "@typescript-eslint/parameter-properties": [
      "error",
      {
        allow: ["private readonly", "protected readonly"]
      }
    ]
  }
};
