import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/live",
    name: "Live",
    component: () =>
      import("../views/Live.vue"),
  },
  {
    path: "/lecture",
    name: "Lecture",
    component: () =>
      import("../views/Lecture.vue"),
  },
  {
    path: "/usercenter",
    name: "Usercenter",
    component: () =>
      import("../views/Usercenter.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import("../views/Search.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;