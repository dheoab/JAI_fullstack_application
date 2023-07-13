import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import OrderListView from "../views/OrderListView.vue";
import OrderView from "../views/OrderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/orderlist",
      name: "orderList",
      component: OrderListView,
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "LoginView" && localStorage.getItem("access_token")) {
    next({ name: "orderList" });
  } else if (to.name === "orderList" && !localStorage.getItem("access_token")) {
    next({ name: "loginView" });
  } else {
    next();
  }
});

export default router;
