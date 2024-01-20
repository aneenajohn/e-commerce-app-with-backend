module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': [0], // 0-off, 1-warn, 2-error
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/click-events-have-key-event': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-alert': 'off',
    'react/button-has-type': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-case-declarations': 'off',
    'no-use-before-define': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'no-dupe-keys': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
