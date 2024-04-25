
export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../../pages/login-page.vue'),
        meta: { name: 'users' },
    },
    {
        path: '/usuarios',
        name: 'users',
        component: () => import('../../pages/users-page.vue'),
        meta: { name: 'users' },
    },
    {
        path: '/cargos',
        name: 'cargos',
        component: () => import('../../pages/cargos-page.vue'),
        meta: { name: 'cargos' },
    },
    {
        path: '/departamentos',
        name: 'departamentos',
        component: () => import('../../pages/departamentos-page.vue'),
        meta: { name: 'departamentos' },
    }
];
