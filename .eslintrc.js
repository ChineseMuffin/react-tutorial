module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'spaced-comment': [
      'error',
      'always',
      {'markers': ['/ <reference']},
    ],
  },
};
