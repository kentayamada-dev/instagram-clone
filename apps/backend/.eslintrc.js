module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { tsconfigRootDir: __dirname, project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "import", "typescript-sort-keys"],
  ignorePatterns: [".eslintrc.js", "coverage/*", "dist/*", "prisma/*", "jest.config.js"],
  extends: ["eslint:all", "plugin:@typescript-eslint/all", "plugin:eslint-comments/recommended"],
  rules: {
    // eslint
    "array-element-newline": ["error", "consistent"],
    "camelcase": [
      "error",
      {
        ignoreDestructuring: true
      }
    ],
    "dot-location": ["error", "property"],
    "func-style": [
      "error",
      "declaration",
      {
        allowArrowFunctions: false
      }
    ],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "consistent"],
    "id-length": [
      "error",
      {
        exceptions: ["_"]
      }
    ],
    "implicit-arrow-linebreak": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignorePattern: "^import .*",
        ignoreStrings: true
      }
    ],
    "max-lines": "off",
    "max-lines-per-function": "off",
    "multiline-ternary": "off",
    "new-cap": "off",
    "newline-per-chained-call": "off",
    "no-confusing-arrow": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["src/*"],
            message: "Please use relative import instead."
          }
        ]
      }
    ],
    "no-ternary": "off",
    "no-void": [
      "error",
      {
        allowAsStatement: true
      }
    ],
    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: true
      }
    ],
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: "return",
        prev: "*"
      }
    ],
    "quote-props": ["error", "consistent"],
    "sort-imports": "off",
    // typescript-eslint
    "@typescript-eslint/no-extra-parens": "off",
    "@typescript-eslint/parameter-properties": [
      "error",
      {
        allow: ["private readonly", "protected readonly"]
      }
    ],
    "@typescript-eslint/no-magic-numbers": "off",
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
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowNullableString: true
      }
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true
      }
    ],
    "@typescript-eslint/no-extraneous-class": [
      "error",
      {
        allowConstructorOnly: false,
        allowEmpty: true,
        allowStaticOnly: false,
        allowWithDecorator: false
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "all",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/no-parameter-properties": [
      "error",
      {
        allows: ["private readonly"]
      }
    ],
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        asyncArrow: "always",
        named: "never"
      }
    ],
    // eslint-plugin-import
    "import/no-namespace": "error",
    "import/no-default-export": "error",
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true
      }
    ],
    "import/order": [
      "error",
      {
        "alphabetize": {
          order: "asc"
        },
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        "newlines-between": "never"
      }
    ],
    // eslint-plugin-typescript-sort-keys
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error"
  }
};
