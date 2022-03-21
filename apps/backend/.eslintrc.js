module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { tsconfigRootDir: __dirname, project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "import"],
  ignorePatterns: [".eslintrc.js", "coverage/*", "dist/*", "prisma/*"],
  extends: [
    "eslint:all",
    "plugin:@typescript-eslint/all",
    "plugin:eslint-comments/recommended"
  ],
  overrides: [
    {
      files: ["*.resolver.ts", "prisma.service.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ],
  rules: {
    // eslint
    "array-element-newline": ["error", "consistent"],
    "dot-location": ["error", "property"],
    "func-style": ["error", "declaration", { allowArrowFunctions: false }],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "consistent"],
    "implicit-arrow-linebreak": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true
      }
    ],
    "new-cap": [
      "error",
      {
        capIsNewExceptions: [
          "Resolver",
          "Query",
          "Module",
          "Injectable",
          "Get",
          "ObjectType",
          "Field",
          "Directive",
          "Inject"
        ]
      }
    ],
    "newline-per-chained-call": "off",
    "no-void": [
      "error",
      {
        allowAsStatement: true
      }
    ],
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" }
    ],
    "quote-props": ["error", "consistent"],
    "sort-imports": "off",
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
    "@typescript-eslint/indent": ["error", 2],
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
        checkParameterProperties: false,
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
    ]
  }
};
