module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/199685.github.io/'
    : '/',
  rules: {
      'linebreak-style': ["error", "windows"],
      "global-require": 0  
  }
};
