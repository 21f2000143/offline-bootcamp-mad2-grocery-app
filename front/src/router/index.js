import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('../views/LandPage.vue') },
    { path: '/login', component: () => import('../views/LoginPage.vue') },
    { path: '/register', component: () => import('../views/RegisterPage.vue') },

    {
        path: '/admin', component: () => import('../views/AdminDash.vue'),
        children: [
            { path: '/admin/add-cat', component: () => import('../components/AddCat.vue') }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;