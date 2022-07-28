module.exports = {
  ignorePatterns: ["coverage", "src/generated", "dist", "next-env.d.ts", "**/*.js"],
  parserOptions: { tsconfigRootDir: __dirname, project: ["./tsconfig.json"] },
  settings: { next: { rootDir: "apps/frontend" }, react: { version: "detect" } },
  extends: [
    "@kentayamada-dev/eslint-config-base",
    "plugin:react/all",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended"
  ],
  overrides: [
    {
      files: ["src/pages/**/*", "src/components/**/index.stories.tsx"],
      rules: { "import/no-default-export": "off" }
    },
    {
      files: ["src/components/**/index.stories.tsx"],
      rules: {
        "new-cap": "off",
        "@typescript-eslint/naming-convention": "off"
      }
    }
  ],
  rules: {
    // eslint
    "id-length": [
      "error",
      {
        exceptions: ["_", "t"]
      }
    ],
    "max-statements": "off",
    "no-confusing-arrow": [
      "error",
      {
        allowParens: true,
        onlyOneSimpleParam: true
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: "return",
        prev: "*"
      },
      {
        blankLine: "always",
        next: "function",
        prev: "function"
      }
    ],
    "prefer-destructuring": [
      "error",
      {
        array: false,
        object: true
      }
    ],
    // typescript-eslint
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: ["PascalCase"],
        prefix: ["is", "should"],
        selector: "typeProperty",
        types: ["boolean"]
      },
      {
        format: ["PascalCase"],
        prefix: ["is", "has"],
        selector: "variable",
        types: ["boolean"]
      },
      {
        format: ["PascalCase", "camelCase", "UPPER_CASE"],
        selector: "variable"
      },
      {
        format: ["camelCase"],
        leadingUnderscore: "allow",
        selector: "parameter"
      },
      {
        format: ["camelCase"],
        selector: "memberLike"
      },
      {
        custom: {
          match: true,
          regex: "^(T|U)$|(Type|Props)$"
        },
        format: ["PascalCase"],
        selector: "typeLike"
      }
    ],
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: false
      }
    ],
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    // eslint-plugin-react
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
        checkInlineFunction: true,
        checkLocalVariables: true,
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "(handle|on)"
      }
    ],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-max-depth": [
      "error",
      {
        max: 10
      }
    ],
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
    "react/jsx-no-bind": [
      "error",
      {
        allowArrowFunctions: true,
        allowFunctions: false
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
    // eslint-plugin-next
    "@next/next/no-html-link-for-pages": ["error", "src/pages"]
  }
};
