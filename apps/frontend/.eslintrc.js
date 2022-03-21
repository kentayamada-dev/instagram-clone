module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  plugins: ["@typescript-eslint", "import"],
  ignorePatterns: [
    ".eslintrc.js",
    "coverage/*",
    "dist/*",
    "next-env.d.ts",
    "next.config.js",
    "next-i18next.config.js"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  overrides: [
    {
      files: ["src/pages/*", "src/components/**/index.stories.tsx"],
      rules: {
        "import/no-default-export": "off"
      }
    }
  ],
  extends: [
    "eslint:all",
    "plugin:@typescript-eslint/all",
    "plugin:eslint-comments/recommended",
    "plugin:react/all",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended"
  ],
  rules: {
    // eslint
    "array-element-newline": ["error", "consistent"],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "consistent"],
    "id-length": ["error", { exceptions: ["t"] }],
    "implicit-arrow-linebreak": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true
      }
    ],
    "max-lines-per-function": "off",
    "multiline-ternary": "off",
    "no-ternary": "off",
    "no-confusing-arrow": [
      "error",
      { onlyOneSimpleParam: true, allowParens: true }
    ],
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true }
    ],
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "function", next: "function" }
    ],
    "quote-props": ["error", "consistent"],
    "sort-imports": "off",
    // typescript-eslint
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: false
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is"]
      },
      {
        selector: "variable",
        format: ["PascalCase", "camelCase", "UPPER_CASE"]
      },
      {
        selector: "parameter",
        format: ["camelCase"]
      },
      {
        selector: "memberLike",
        format: ["camelCase"]
      },
      {
        selector: "typeLike",
        format: ["PascalCase"]
      }
    ],
    "@typescript-eslint/no-extra-parens": [
      "error",
      "all",
      {
        ignoreJSX: "all",
        enforceForArrowConditionals: false
      }
    ],
    "@typescript-eslint/no-type-alias": [
      "error",
      {
        allowAliases: "always",
        allowCallbacks: "never",
        allowConditionalTypes: "never",
        allowConstructors: "never",
        allowGenerics: "never",
        allowLiterals: "always",
        allowMappedTypes: "never",
        allowTupleTypes: "never"
      }
    ],
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    // eslint-plugin-react
    "react/jsx-max-depth": ["error", { max: 5 }],
    "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
    "react/jsx-no-bind": [
      "error",
      {
        allowArrowFunctions: true,
        allowFunctions: false
      }
    ],
    "react/boolean-prop-naming": [
      "error",
      {
        propTypeNames: ["bool", "mutuallyExclusiveTrueProps"],
        validateNested: true
      }
    ],
    "react/destructuring-assignment": ["error", "always"],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function"
      }
    ],
    "react/jsx-curly-brace-presence": [
      "error",
      {
        children: "never",
        propElementValues: "always",
        props: "never"
      }
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx"]
      }
    ],
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "(handle|on)",
        checkLocalVariables: true,
        checkInlineFunction: true
      }
    ],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-max-props-per-line": [
      "error",
      {
        when: "multiline"
      }
    ],
    "react/jsx-newline": [
      "error",
      {
        prevent: true
      }
    ],
    "react/jsx-no-literals": [
      "error",
      {
        ignoreProps: true,
        noAttributeStrings: true,
        noStrings: true
      }
    ],
    "react/jsx-one-expression-per-line": [
      "error",
      {
        allow: "single-child"
      }
    ],
    "react/jsx-props-no-spreading": [
      "error",
      {
        custom: "ignore",
        explicitSpread: "enforce",
        html: "enforce"
      }
    ],
    "react/prop-types": "off",
    "react/require-default-props": "off",
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
