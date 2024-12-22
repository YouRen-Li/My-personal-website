import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home View/Home View.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/classify",
      name: "classify",
      component: () => import("../views/Stipulate/classify.vue"),
    },
    {
      path: "/time",
      name: "time",
      component: () => import("../views/Stipulate/time.vue"),
    },
    {
      path: "/label",
      name: "label",
      component: () => import("../views/Stipulate/label.vue"),
    },
    {
      path: "/friendlink",
      name: "friendlink",
      component: () => import("../views/Friend link/Friend link.vue"),
    },
    {
      path: "/work",
      name: "work",
      component: () => import("../views/Word debris/Word debris.vue"),
    },
    {
      path: "/nowadays",
      name: "nowadays",
      component: () => import("../views/Nowadays/Nowadays.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About Us/About Us.vue"),
    },
    {
      path: "/leave",
      name: "leave",
      component: () => import("../views/Leave for/Leave for.vue"),
    },
  ],
});

export default router;
