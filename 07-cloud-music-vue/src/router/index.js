import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/find',
        component: () => import('@/views/main/Main'),
        children: [
            {
                path: '/find',
                name: 'find',
                component: () => import('@/views/main/Find'),
            },
            {
                path: '/mine',
                name: 'mine',
                component: () => import('@/views/main/Mine'),
            },
            {
                path: '/country',
                name: 'country',
                component: () => import('@/views/main/Country'),
            },
            {
                path: '/video',
                name: 'video',
                component: () => import('@/views/main/Video'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login'),
    },
    {
        path: '/search',
        name: 'search',
        redirect: '/search/hot',
        component: () => import('@/views/search/Search'),
        children: [
            {
                path: '/search/hot',
                name: 'hotSearch',
                component: () => import('@/views/search/HotSearch'),
            },
            {
                path: '/search/:keywords',
                name: 'searchDetail',
                component: () => import('@/views/search/SearchDetail'),
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
