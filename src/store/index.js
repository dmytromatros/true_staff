import { createStore } from 'vuex'
import axios from "axios";

const { isAuth } = require("../../utils/permission");


export default createStore({
    state: {
        users: [],
        user: {},
        copmany: {},
        role: '',
        locations: []
    },
    getters: {},
    mutations: {
        setUser: (state, data) => {
            state.user = data.data;
            state.role = 'user';
        },
        setUserList: (state, data) => {
            state.users = data.data;
        },
        setCopmany(state, data) {
            state.copmany = data.data;
            state.role = 'cpomany';
        },
        setLocations: (state, data) => {
            state.locations = data.data;
        }
    },
    actions: {

        // System actios /////////////////////////////////////////////////////////////////////////////

        logInUserAction: async({ commit }, data) => {
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


        logInCompanyAction: async({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login-company`, data)
                    .then(res => {
                        commit('setCopmany', res.data);

                        localStorage.setItem('token', res.data.data._id);
                        localStorage.setItem('role', 'company');

                        isAuth(res.data.data._id)

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

        getUserListAction: async({ commit }) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-user-list`)
                    .then(res => {
                        commit('setUserList', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        addUserAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/add-user`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getUserAction: async(context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-user/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        editUserAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-user`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        addUserRequestAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/send-user-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getUserRequestListAction: async(context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-user-request-list/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        // Company actions //////////////////////////////////////////////////////////////////////////////////

        addCompanyAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/add-company`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getCompanyAction: async({ commit }, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-company/${data.id}`, )
                    .then(res => {
                        commit('setCopmany', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        editCompanyAction: async({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-company`, data)
                    .then(res => {
                        commit('setCopmany', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        editCompanyPasswordAction: async({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-company-password`, data)
                    .then(res => {
                        commit('setCopmany', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        addCompanyRequestAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/send-company-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        getCompanyListAction: async() => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-list`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        getCompanyEmployeesAction: async(context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-company-employees/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        deleteEmployeeAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/delete-employee`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        // Locatoin actions /////////////////////////////////////////////////////////////////////////////



        getLocationsAction: async({ commit }, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-locations/${data.id}`)
                    .then(res => {
                        commit('setLocations', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        addLocationAction: async({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/add-location`, data)
                    .then(res => {
                        commit('setLocations', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        getLocationAction: async(context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-location/${data.locationId}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        editLocationAction: async({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-location`, data)
                    .then(res => {
                        commit('setLocations', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        // Requests //////////////////////////////////////////////

        rejectRequestAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/reject-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },
        userDeleteRequestAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/user-delete-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        companyDeleteRequestAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/company-delete-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        acceptRequestAction: async(context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/accept-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getCompanyRequestListAction: async(context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-company-request-list/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },
    },
    modules: {}
})