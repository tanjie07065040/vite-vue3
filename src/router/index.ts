/* eslint-disable */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/DashboardView.vue";
import HomeView from "@/views/home/HomeView.vue";
import AboutView from "@/views/about/AboutView.vue";
import { useAppStore } from "@/store/modules/app";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "bigscreen",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "",
        redirect: "/dashboard/home",
      },
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
    redirect: "/dashboard/home",
    meta: {
      title: "Other",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * 守卫路由
 */
router.beforeEach((to, from, next) => {
  const fullPath = to.fullPath || "";
  const appStore = useAppStore();
  const token = window.localStorage.getItem("token") || to.query.token;
  if (!token || token === "undefined") {
    localStorage.removeItem("token");
    const url =
      appStore.getConfig.AUTHOR_URL +
      "?redirect_url=" +
      appStore.getConfig.CALLBACK_URL +
      "&tag=bigscreen";
    location.href = url;
    return;
  } else {
    window.localStorage.setItem("token", JSON.stringify({ token: token }));
  }
  next();
});

export default router;
