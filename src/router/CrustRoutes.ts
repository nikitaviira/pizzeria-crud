export default [
    {
        path: '/crusts',
        name: 'crusts',
        component: () => import('@/views/Crust/Index.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/crusts/create',
        name: 'create-crust',
        component: () => import('@/views/Crust/Create.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/crusts/:id?/edit',
        name: 'edit-crust',
        component: () => import('@/views/Crust/Edit.vue'),
        meta: { authRequired: true }
    },
];
