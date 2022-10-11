module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:json/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-shadow': [
      'off',
      {
        allow: ['req', 'res', 'err'],
      },
    ],
    'valid-jsdoc': [
      'error',
      {
        requireReturn: true,
        requireReturnType: true,
        requireParamDescription: false,
        requireReturnDescription: true,
      },
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'internal'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
      typescript: {},
    },
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
