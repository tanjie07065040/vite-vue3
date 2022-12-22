/* eslint-disable */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/DashboardView.vue";
import HomeView from "@/views/home/HomeView.vue";
import AboutView from "@/views/about/AboutView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "home",
        component: HomeView,
      },
      {
        path: "about",
        component: AboutView,
      },
    ],
  },
  {
    path: "/:path(.*)*",
    name: "Other",
    redirect: "/dashboard",
    meta: {
      title: "Other",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
