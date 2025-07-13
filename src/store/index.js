import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../Firebase.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    setLoading(state, status) {
      state.loading = status;
    },
  },
  actions: {
    async initAuth({ commit }) {
      return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
          commit("setUser", user);
          resolve(user);
        });
      });
    },
  },
});

// import { createStore } from "vuex";
// import { auth } from "../Firebase.js";

// export default createStore({
//   state: {
//     user: null,
//     loading: false,
//     isAuthenticated: false,
//   },
//   mutations: {
//     setUser(state, user) {
//       state.user = user;
//       state.isAuthenticated = !!user;
//     },
//     setLoading(state, status) {
//       state.loading = status;
//     },
//   },
//   actions: {
//     async initAuth({ commit }) {
//       return new Promise((resolve) => {
//         auth.onAuthStateChanged((user) => {
//           commit("setUser", user);
//           resolve(user);
//         });
//       });
//     },
//   },
// });
