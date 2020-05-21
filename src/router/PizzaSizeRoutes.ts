export default [
    {
        path: '/pizzasizes',
        name: 'pizzasizes',
        component: () => import('@/views/PizzaSize/Index.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/pizzasizes/create',
        name: 'create-pizzasize',
        component: () => import('@/views/PizzaSize/Create.vue'),
        meta: { authRequired: true }
    },
    {
        path: '/pizzasizes/:id?/edit',
        name: 'edit-pizzasize',
        component: () => import('@/views/PizzaSize/Edit.vue'),
        meta: { authRequired: true }
    },
];
