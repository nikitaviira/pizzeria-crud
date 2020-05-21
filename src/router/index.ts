import Vue from 'vue';
import VueRouter from 'vue-router';
import CrustRoutes from '@/router/CrustRoutes';
import CutStyleRoutes from '@/router/CutStyleRoutes';
import PizzaSizeRoutes from '@/router/PizzaSizeRoutes';
import PizzaRoutes from '@/router/PizzaRoutes';
import store from '@/store/index';
import axios from 'axios';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'root',
        component: () => import('@/views/Index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Account/Login.vue'),
        meta: { disallowAuthed: true }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Account/Register.vue'),
        meta: { disallowAuthed: true }
    },
    ...CrustRoutes,
    ...CutStyleRoutes,
    ...PizzaSizeRoutes,
    ...PizzaRoutes,
    {
        path: '*',
        name: 'all',
        component: () => import('@/views/Index.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if (store.getters.isLoggedIn) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + store.state.token;
        if (to.meta.disallowAuthed) {
            return router.push({ name: 'root' });
        }
    }

    if (!store.getters.isLoggedIn && to.meta.authRequired) {
        alert('You have to be authorized to access this page.');
        return router.push({ name: 'login' }).catch((err) => err);
    }
    return next();
});

export default router;
