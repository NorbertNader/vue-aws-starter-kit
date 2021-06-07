import createApp from './app.js';

export default function() {
  const { app, router } = createApp({});

  return { app, router };
}
