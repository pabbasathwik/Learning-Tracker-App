import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name : 'Login',component: () => import('../views/Login.vue')},
  { path: "/register", name: 'Register', component: () => import('../views/Register.vue')},
  { path: "/dashboard", name : 'Dashboard',component: () => import('../views/Dashboard.vue')},
  { path: "/add-learning", name : 'AddLearning',component: () => import('../views/AddLearning.vue')},
  {path : "/learning-list", name : 'LearningList',component: () => import('../views/LearningList.vue')},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
