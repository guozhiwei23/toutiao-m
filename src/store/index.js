import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/utils/storage";

Vue.use(Vuex);

const TOKEN_KEY = "TOUTIAO_USER";

export default new Vuex.Store({
  state: {
    //一个对象,存储当前登录用户信息 (token等数据)
    user: getItem(TOKEN_KEY),
    cachePages: ["LayoutIndex"],
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)),
    //user:null
  },
  mutations: {
    setUser(state, data) {
      state.user = data;

      //为了防止刷新丢失,我们需要把数据备份到本地存储
      setItem(TOKEN_KEY, state.user);
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user));
    },
    addCachePage(state, page) {
      //添加需要缓存的组件
      if (!state.cachePages.includes(page)) {
        state.cachePages.push(page);
      }
    },
    removeCachepage(state, page) {
      //删除需要缓存的组件
      const idx = state.cachePages.indexOf(page);
      if (idx !== -1) state.cachePages.splice(page, 1);
    },
  },
  actions: {},
  modules: {},
});
