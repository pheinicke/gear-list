module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:compat/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    plugins: ["@typescript-eslint", "prettier", "import", "compat", "filenames"],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        es6: true,
        browser: true,
        amd: true,
        node: true,
    },
    rules: {
        "prettier/prettier": 0,
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/explicit-function-return-type": [0, { allowTypedFunctionExpressions: true }],
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-empty-function": [1, { allow: ["arrowFunctions"] }],
        "import/order": [1, { "newlines-between": "always" }],
        "import/first": 1,
        "import/newline-after-import": 1,
        "filenames/match-regex": [1, "^[a-z0-9-.]+$"],
        "@typescript-eslint/explicit-module-boundary-types": 1,
        "@typescript-eslint/ban-types": 1,
        // eslint-plugin-import 2.25.0 can't resolve imports from files ending in '.d.ts'
        "import/no-unresolved": 0,
    },
    settings: {
        polyfills: [],
    },
    overrides: [
        {
            files: ["src/**/*.spec.ts"],
            rules: {
                "compat/compat": "off",
            },
        },
    ],
};
