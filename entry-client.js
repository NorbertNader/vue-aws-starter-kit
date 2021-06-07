import createApp from './app.js';

const { app, router } = createApp({});

router.isReady().then(() => {
  app.mount('#app');
});
