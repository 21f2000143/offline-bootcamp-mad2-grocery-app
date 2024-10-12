import { createRouter, createWebHistory } from 'vue-router';
import LandPage from '../views/LandPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandPage
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginPage.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterPage.vue')
        }
    ]
})

export default router;