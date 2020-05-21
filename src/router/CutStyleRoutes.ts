export default [
    {
        path: '/cutstyles',
        name: 'cutstyles',
        component: () => import('@/views/CutStyle/Index.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/cutstyles/create',
        name: 'create-cutstyle',
        component: () => import('@/views/CutStyle/Create.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/cutstyles/:id?/edit',
        name: 'edit-cutstyle',
        component: () => import('@/views/CutStyle/Edit.vue'),
        meta: { authRequired: true }
    },
];
