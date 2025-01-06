module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 根元素字体大小，根据你的设计稿来定
      unitPrecision: 5, // 转换后的精度，即小数点位数
      propList: ['*'], // 需要转换的属性，*表示所有属性都转换
      selectorBlackList: [], // 不需要转换的选择器
      replace: true, // 是否替换原属性
      mediaQuery: false, // 是否允许在媒体查询中转换px
      minPixelValue: 0, // 最小转换值
      exclude: /node_modules/i // 忽略node_modules目录下的文件
    }
  }
};