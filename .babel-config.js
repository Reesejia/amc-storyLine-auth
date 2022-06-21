/**
 * moduleRoot: resolve(),
 * sourceRoot: resolve(),
 */

module.exports = {
  babelrc: false,
  cache: true,
  comments: false,
  compact: false,
  ignore: function (filename) {
    if (filename.indexOf('node_modules') > -1) {
      // nb-开头的依赖包要交给到服务端的babel来处理成es5 code
      // 以及_nb-开头的缓存文件
      if (filename.indexOf(`/node_modules/nb-`) > -1) {
        return false
      }
      if (filename.indexOf(`/node_modules/_nb-`) > -1) {
        return false
      }
      return true
    }
    return false
  },
  presets: [
    'es2015',
    ['env', {modules: false}],
    'stage-2'
  ],
  plugins: [
    'transform-runtime',
    ['module-resolver', {
      alias: {
        '@': './app'
      }
    }]
  ]
}
