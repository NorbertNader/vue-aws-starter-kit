const path = require('path');
const fs = require('fs').promises;
const { renderToString } = require('@vue/server-renderer');
const manifest = require('./dist/server/ssr-manifest.json');

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js']);
const createApp = require(appPath).default;

exports.lambdaHandler = async (event) => {
  try {
    const { app, router } = await createApp();

    await router.push(event.rawPath);
    await router.isReady();

    const appContent = await renderToString(app);

    const html = await fs.readFile(path.join(__dirname, '/dist/client/index.html'));

    const newHtml = html
        .toString()
        .replace('<div id="app">', `<div id="app">${appContent}`);

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html'
      },
      body: newHtml
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
