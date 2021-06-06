import { createWebHistory, createRouter } from 'vue-router';
// import Home from './Home.vue';
// import About from './About.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        // component: Home,
        component: () => import(
          /* webpackChunkName: "home" */
          './Home.vue'
        ),
    },
    {
        path: '/about',
        name: 'About',
        // component: About,
        component: () => import(
          /* webpackChunkName: "about" */
          /* webpackPrefetch: true */
          './About.vue'
        ),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
