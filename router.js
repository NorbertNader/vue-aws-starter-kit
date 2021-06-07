import { createWebHistory, createMemoryHistory, createRouter } from 'vue-router';
// import Home from './Home.vue';
// import About from './About.vue';

const isServer = typeof window === 'undefined'

const history = isServer ? createMemoryHistory() : createWebHistory()

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
    history,
    routes,
});

export default router;
