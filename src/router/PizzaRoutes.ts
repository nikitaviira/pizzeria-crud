export default [
    {
        path: '/pizzas',
        name: 'pizzas',
        component: () => import('@/views/Pizza/Index.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/pizzas/create',
        name: 'create-pizza',
        component: () => import('@/views/Pizza/Create.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/pizzas/:id?/edit',
        name: 'edit-pizza',
        component: () => import('@/views/Pizza/Edit.vue'),
        meta: { authRequired: true }
    },
];
