module.exports = {
  extends: ['@kuzanatoliorg/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', []],
  },
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['CKP-'],
    },
  },
};
