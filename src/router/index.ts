import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("../views/Dashboard.vue") },
    { path: "/:pathMatch(.*)*", component: () => import("../views/Error.vue") },
  ],
});

export default router;
