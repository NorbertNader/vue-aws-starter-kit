import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router.js';

export default function() {
  const app = createSSRApp(App);

  app.use(router);

  return { app, router };
}
