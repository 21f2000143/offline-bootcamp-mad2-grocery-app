import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'LandPage',
    component: () => import('../views/LandPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/AdminDash.vue'),
    children: [
      {
        path: '/admin',
        component: () => import('../components/ProductCompo.vue'),
      },
      {
        path: '/admin/cat/create',
        component: () => import('../components/CreateCatCompo.vue'),
      },
      {
        path: '/admin/cat/edit/:id',
        component: () => import('../components/EditCatCompo.vue'),
      },
      {
        path: '/admin/pro/edit/:id',
        component: () => import('../components/EditProCompo.vue'),
      },
      {
        path: '/admin/managers',
        component: () => import('../components/ManagersCompo.vue'),
      },
      {
        path: '/admin/notifications',
        component: () => import('../components/NotifiCompo.vue'),
      },
      {
        path: '/admin/report',
        component: () => import('../components/ReportCompo.vue'),
      },
      {
        path: '/admin/warning',
        component: () => import('../components/SendWarning.vue'),
      },
    ],
  },
  {
    path: '/manager',
    component: () => import('../views/ManagerDash.vue'),
    children: [
      {
        path: '/manager',
        component: () => import('../components/ProductCompo.vue'),
      },
      {
        path: '/manager/cat/create',
        component: () => import('../components/CreateCatCompo.vue'),
      },
      {
        path: '/manager/cat/edit/:id',
        component: () => import('../components/EditCatCompo.vue'),
      },
      {
        path: '/manager/pro/create',
        component: () => import('../components/CreateProCompo.vue'),
      },
      {
        path: '/manager/pro/edit/:id',
        component: () => import('../components/EditProCompo.vue'),
      },
      {
        path: '/manager/notifications',
        component: () => import('../components/NotifiManCompo.vue'),
      },
      {
        path: '/manager/report',
        component: () => import('../components/ReportCompo.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/UserDash.vue'),
    children: [
      {
        path: '/user',
        component: () => import('../components/ProductUserCompo.vue'),
      },
      {
        path: '/user/CartCompo',
        component: () => import('../components/CartCompo.vue'),
      },
      {
        path: '/user/your/orders',
        component: () => import('../components/OrderCompo.vue'),
      },
      {
        path: '/user/pro/create',
        component: () => import('../components/CreateProCompo.vue'),
      },
      {
        path: '/user/pro/edit',
        component: () => import('../components/EditProCompo.vue'),
      },
      {
        path: '/user/notifications',
        component: () => import('../components/NotifiCompo.vue'),
      },
      {
        path: '/user/report',
        component: () => import('../components/ReportCompo.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('jwt') && to.name !== 'LandPage' && to.name !== 'Register') next({ name: 'Login' })
  // if the user is not authenticated, `next` is called twice
  next()
})

export default router;
