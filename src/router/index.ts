import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import FormA from "../pages/FormA.vue";
import FormB from "../pages/FormB.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/form-a", component: FormA },
  { path: "/form-b", component: FormB },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
