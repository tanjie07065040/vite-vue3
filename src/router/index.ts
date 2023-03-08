/* eslint-disable */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/DashboardView.vue";
import HomeView from "@/views/home/HomeView.vue";
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
        name: "home",
        component: HomeView,
      },
    ],
  },
  {
    path: "/:path(.*)*",
    name: "Other",
    redirect: "/",
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
  const path = to.path || "";
  const appStore = useAppStore();
  const token = window.localStorage.getItem("token") || to.query.token;
  if (token) {
    appStore.setToken(token);
  }
  if (!token || token === "undefined") {
    const url =
      appStore.getConfig.AUTHOR_URL +
      "?redirect_url=" +
      appStore.getConfig.CALLBACK_URL +
      "&tag=bigscreen";
    location.href = url;
    return;
  }
  next();
});

export default router;
