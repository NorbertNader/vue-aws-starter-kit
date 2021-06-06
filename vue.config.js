const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch');

    config
      .plugin('webpack-bundle-analyzer')
      .use(BundleAnalyzerPlugin)
      .init(Plugin => new Plugin({
        openAnalyzer: false
      }));
  },
  css: {
    extract: true,
  },
};
