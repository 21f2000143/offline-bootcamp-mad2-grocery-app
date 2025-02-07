import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LandPage",
    component: () => import("../views/LandPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterPage.vue"),
  },
  {
    path: "/doctor/login",
    name: "LoginDoc",
    component: () => import("../views/DoctorLoginPage.vue"),
  }
  {
    path: "/doctor/register",
    name: "RegisterDoc",
    component: () => import("../views/DoctorRegisterPage.vue"),
  },
  // Catch-all route for undefined paths
  {
    path: "/:pathMatch(.*)*", // Use '*' for Vue Router 3
    name: "NotFound",
    component: () => import("../components/NotFound.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/AdminDash.vue"),
    children: [
      {
        path: "/admin",
        component: () => import("../components/ProductCompo.vue"),
      },
      {
        path: "/admin/cat/create",
        component: () => import("../components/CreateCatCompo.vue"),
      },
      {
        path: "/admin/cat/edit/:id",
        component: () => import("../components/EditCatCompo.vue"),
      },
      {
        path: "/admin/pro/create",
        component: () => import("../components/CreateProCompo.vue"),
      },
      {
        path: "/admin/pro/edit/:id",
        component: () => import("../components/EditProCompo.vue"),
      },
      {
        path: "/admin/managers",
        component: () => import("../components/ManagersCompo.vue"),
      },
      {
        path: "/admin/notifications",
        component: () => import("../components/NotifiCompo.vue"),
      },
      {
        path: "/admin/report",
        component: () => import("../components/ReportCompo.vue"),
      },
      {
        path: "/admin/warning",
        component: () => import("../components/SendWarning.vue"),
      },
    ],
  },
  {
    path: "/doctor",
    component: () => import("../views/DoctorDash.vue"),
    children: [
      {
        path: "/doctor",
        component: () => import("../components/ProductCompo.vue"),
      },
      {
        path: "/doctor/cat/create",
        component: () => import("../components/CreateCatCompo.vue"),
      },
      {
        path: "/doctor/cat/edit/:id",
        component: () => import("../components/EditCatCompo.vue"),
      },
      {
        path: "/doctor/pro/create",
        component: () => import("../components/CreateProCompo.vue"),
      },
      {
        path: "/doctor/pro/edit/:id",
        component: () => import("../components/EditProCompo.vue"),
      },
      {
        path: "/doctor/notifications",
        component: () => import("../components/NotifiManCompo.vue"),
      },
      {
        path: "/doctor/report",
        component: () => import("../components/ReportCompo.vue"),
      },
    ],
  },
  {
    path: "/patient",
    component: () => import("../views/PatientDash.vue"),
    children: [
      {
        path: "/patient",
        component: () => import("../components/ProductUserCompo.vue"),
      },
      {
        path: "/patient/CartCompo",
        component: () => import("../components/CartCompo.vue"),
      },
      {
        path: "/patient/your/orders",
        component: () => import("../components/OrderCompo.vue"),
      },
      {
        path: "/patient/pro/create",
        component: () => import("../components/CreateProCompo.vue"),
      },
      {
        path: "/patient/pro/edit",
        component: () => import("../components/EditProCompo.vue"),
      },
      {
        path: "/patient/notifications",
        component: () => import("../components/NotifiCompo.vue"),
      },
      {
        path: "/patient/report",
        component: () => import("../components/ReportCompo.vue"),
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
  if (
    to.name !== "Login" &&
    !localStorage.getItem("jwt") &&
    to.name !== "LandPage" &&
    to.name !== "Register" &&
    to.name !== "RegisterDoc"
  )
    next({ name: "Login" });
  // if the user is not authenticated, `next` is called twice
  next();
});

export default router;
