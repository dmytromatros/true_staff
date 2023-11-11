import { createStore } from 'vuex'
import axios from "axios";

const { isAuth } = require("../../utils/permission");


export default createStore({
  state: {
    users: [],
    user: {},
    role: ''
  },
  getters: {
  },
  mutations: {
    setUser: (state, data) => {
      state.user = data.data;
      state.role = 'user';
    },
    setUserList: (state, data) => {
      state.users = data.data;
    }
  },
  actions: {

    // System actios /////////////////////////////////////////////////////////////////////////////

    logInUserAction: async ({ commit }, data) => {
      return new Promise(done => {
        axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login-user`, data)
          .then(res => {
            commit('setUser', res.data);

            localStorage.setItem('token', res.data.data._id);
            localStorage.setItem('role', 'user');

            isAuth()

            done(res.data)
          })
          .catch(err => done(err));
      })
    },


    logInCompanyAction: async (context, data) => {
      return new Promise(done => {
        axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login-company`, data)
          .then(res => {
            // commit('setUser', res.data);

            // localStorage.setItem('token', res.data.data._id);
            // localStorage.setItem('role', 'user');
            isAuth()
            done(res.data)
          })
          .catch(err => done(err));
      })
    },


    logOutAction: ({ commit }) => {
      localStorage.setItem('token', '');
      localStorage.setItem('role', '');
      commit('setUser', {})
      isAuth()
    },

    // User action ////////////////////////////////////////////////////////////////////////////////////

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
