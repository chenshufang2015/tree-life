const { override, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  addPostcssPlugins([
    require('postcss-pxtorem')({
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i
    })
  ])
);