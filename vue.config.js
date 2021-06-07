const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const assetPath = process.env.CLIENT ? '' : 'https://<cloudfront-id>.cloudfront.net/';

module.exports = {
  chainWebpack: webpackConfig => {
    webpackConfig.module.rule('vue').uses.delete('cache-loader');
    webpackConfig.module.rule('js').uses.delete('cache-loader');

    if (!process.env.SSR) {
      webpackConfig
        .entry('app')
        .clear()
        .add('./entry-client.js');
      return;
    }

    webpackConfig
      .entry('app')
      .clear()
      .add('./entry-server.js');

    webpackConfig.target('node');
    webpackConfig.output.libraryTarget('commonjs2');

    webpackConfig
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }));

    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

    webpackConfig.optimization.splitChunks(false).minimize(false);

    webpackConfig.plugins.delete('preload');
    webpackConfig.plugins.delete('prefetch');
    webpackConfig.plugins.delete('progress');
    webpackConfig.plugins.delete('friendly-errors');

    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })
    );
  },
  css: {
    extract: true,
  },
  publicPath: process.env.SSR ? '' : assetPath,
};
