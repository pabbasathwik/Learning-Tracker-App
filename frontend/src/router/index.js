import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import AddLearning from "../pages/AddLearning.vue";
import LearningList from "../pages/LearningList.vue"; 

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard },
  { path: "/add-learning", component: AddLearning },
  {path : "/learning-list", component: LearningList }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
