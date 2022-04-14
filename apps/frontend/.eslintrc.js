module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  plugins: ["@typescript-eslint", "import"],
  ignorePatterns: [
    "coverage/*",
    "src/types/generated/*",
    "dist/*",
    "next-env.d.ts",
    "**/*.js"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  overrides: [
    {
      files: ["src/pages/**/*", "src/components/**/index.stories.tsx"],
      rules: {
        "import/no-default-export": "off"
      }
    },
    {
      files: ["src/components/**/index.stories.tsx"],
      rules: {
        "new-cap": "off",
        "@typescript-eslint/naming-convention": "off"
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
    "max-statements": "off",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "id-length": ["error", { exceptions: ["_", "t"] }],
    "dot-location": ["error", "property"],
    "array-element-newline": ["error", "consistent"],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "consistent"],
    "implicit-arrow-linebreak": "off",
    "max-len": [
      "error",
      {
        ignoreStrings: true,
        ignoreComments: true,
        ignorePattern: "^import .*"
      }
    ],
    "max-lines-per-function": "off",
    "multiline-ternary": "off",
    "no-ternary": "off",
    "no-confusing-arrow": [
      "error",
      { onlyOneSimpleParam: true, allowParens: true }
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
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowNullableString: true
      }
    ],
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: false
      }
    ],
    "@typescript-eslint/indent": [
      "error",
      2,
      { MemberExpression: "off", SwitchCase: 1 }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeProperty",
        format: ["PascalCase"],
        types: ["boolean"],
        prefix: ["is"]
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "has"]
      },
      {
        selector: "variable",
        format: ["PascalCase", "camelCase", "UPPER_CASE"]
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow"
      },
      {
        selector: "memberLike",
        format: ["camelCase"]
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
        custom: {
          regex: "^(T|U)$|(Type|Props)$",
          match: true
        }
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
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    // eslint-plugin-react
    "react/jsx-max-depth": ["error", { max: 10 }],
    "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
    "react/jsx-no-bind": [
      "error",
      {
        allowArrowFunctions: true,
        allowFunctions: false
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
