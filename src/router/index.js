import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { Dialog } from "vant";

Vue.use(VueRouter);

//路由表
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "", //默认子路由，只能有一个
        name: "home",
        component: () => import("@/views/home"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/qa",
        name: "qa",
        component: () => import("@/views/qa"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my"),
        meta: {
          requireAuth: false,
        },
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/views/article"),
    props: true, //开启Props传参,说白了就是把路由参数映射到组件的props中
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/user/profile",
    name: "user-profile",
    component: () => import("@/views/user-profile"),
    meta: {
      requireAuth: false,
    },
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

// 挂载路由导航守卫
router.beforeEach(async (to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  // 不需要登录的路由，直接放行
  if (!to.meta.requireAuth) return next();
  const { user } = store.state;
  // store 里面具备 token，说明登录过了，直接放行
  if (user && user.token) return next();

  const r = await Dialog.confirm({
    title: "提示",
    message: "是否需要登录?",
  })
    .then((r) => r)
    .catch((e) => e);
  if (r === "confirm") {
    //点了确定
    redirectLogin();
  } else {
    // 点了取消，next(false) 取消路由跳转
    next(false);
  }
});

function redirectLogin() {
  router.replace({
    name: "login",
    query: {
      // router.currentRoute => this.$route
      redirect: router.currentRoute.fullPath,
    },
  });
}

export default router;
