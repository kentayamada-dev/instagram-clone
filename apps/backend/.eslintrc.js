module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { tsconfigRootDir: __dirname, project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "import", "typescript-sort-keys"],
  ignorePatterns: [".eslintrc.js", "coverage/*", "dist/*", "prisma/*"],
  extends: [
    "eslint:all",
    "plugin:@typescript-eslint/all",
    "plugin:eslint-comments/recommended"
  ],
  rules: {
    // eslint
    "max-lines-per-function": "off",
    "no-confusing-arrow": "off",
    "array-element-newline": ["error", "consistent"],
    "dot-location": ["error", "property"],
    "func-style": ["error", "declaration", { allowArrowFunctions: false }],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "consistent"],
    "implicit-arrow-linebreak": "off",
    "id-length": ["error", { exceptions: ["_"] }],
    "max-len": [
      "error",
      {
        ignoreStrings: true,
        ignoreComments: true,
        ignorePattern: "^import .*"
      }
    ],
    "new-cap": "off",
    "newline-per-chained-call": "off",
    "no-void": [
      "error",
      {
        allowAsStatement: true
      }
    ],
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
    "multiline-ternary": "off",
    "no-ternary": "off",
    "one-var": ["error", "never"],
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true }
    ],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" }
    ],
    "quote-props": ["error", "consistent"],
    "sort-imports": "off",
    // typescript-eslint
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
    "@typescript-eslint/indent": ["error", 2, { MemberExpression: "off" }],
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
    "@typescript-eslint/prefer-readonly-parameter-types": [
      "error",
      {
        checkParameterProperties: true,
        ignoreInferredTypes: true,
        treatMethodsAsReadonly: true
      }
    ],
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
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        "newlines-between": "never"
      }
    ],
    // eslint-plugin-typescript-sort-keys
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error"
  }
};
