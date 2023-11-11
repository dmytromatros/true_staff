import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    users: [],
    user: {}
  },
  getters: {
  },
  mutations: {
    setUser: (state, data) => {
      state.user = data.data;
    },
    setUserList: (state, data) => {
      state.users = data.data;
    }
  },
  actions: {

    // System actios

    logInAction: async ({ commit }, data) => {
      return new Promise(done => {
        axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login`, data)
          .then(res => {
            commit('setUser', res.data);

            localStorage.setItem('token', res.data.data._id);

            done(res.data)
          })
          .catch(err => done(err));
      })
    },


    logOutAction: ({ commit }) => {
      localStorage.setItem('token', '');
      commit('setUser', {})
    },

    // User action

    getUserListAction: async ({ commit }) => {
      return new Promise(done => {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-user-list`)
          .then(res => {
            commit('setUserList', res.data);
            done(res.data)
          })
          .catch(err => done(err));
      })
    }
  },
  modules: {
  }
})
