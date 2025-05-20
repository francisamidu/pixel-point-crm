module.exports = {
  extends: [
    'plugin:@next/next/recommended',
  ],
  plugins: ['import'],
  rules: {
    'import/no-unresolved': [2, { caseSensitive: true }],
  },
};
