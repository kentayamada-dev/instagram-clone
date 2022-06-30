module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  ignorePatterns: ["coverage/*", "src/types/generated/*", "dist/*", "next-env.d.ts", "**/*.js"],
  settings: {
    next: {
      rootDir: "apps/frontend"
    },
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
    "array-element-newline": ["error", "consistent"],
    "dot-location": ["error", "property"],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "consistent"],
    "id-length": [
      "error",
      {
        exceptions: ["_", "t"]
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
    "max-lines-per-function": "off",
    "max-statements": "off",
    "multiline-ternary": "off",
    "no-confusing-arrow": [
      "error",
      {
        allowParens: true,
        onlyOneSimpleParam: true
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
    "no-ternary": "off",
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
    "quote-props": ["error", "consistent"],
    "sort-imports": "off",
    // typescript-eslint
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        MemberExpression: "off",
        SwitchCase: 1
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: ["PascalCase"],
        prefix: ["is"],
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
    "@typescript-eslint/no-extra-parens": [
      "error",
      "all",
      {
        enforceForArrowConditionals: false,
        ignoreJSX: "all"
      }
    ],
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
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
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowNullableString: true
      }
    ],
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
    // eslint-plugin-import
    "import/no-default-export": "error",
    "import/no-namespace": "error",
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
    ]
  }
};
