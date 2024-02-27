import { createStore } from 'vuex'
import axios from "axios";

const { isAuth } = require("../../utils/permission");

const hashCode = (s) => {
    return s.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return (a & a);
    }, 0);
};


export default createStore({
    state: {
        users: [],
        user: {},
        company: {},
        role: '',
        locations: [],
        notifications: [],
        profileImage: null
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
        setCompany(state, data) {
            state.company = data.data;
            state.role = 'cpomany';
        },
        setLocations: (state, data) => {
            state.locations = data.data;
        },
        addNotification: (state, data) => {
            const index = state.notifications.findIndex((item) => item.id === data.id);
            if (index <= -1)
                state.notifications.push(data);
        },
        deleteNotification: (state, data) => {
            const index = state.notifications.findIndex((item) => item.id === data);
            if (index > -1)
                state.notifications.splice(index, 1);
        }
    },
    actions: {

        // System actions /////////////////////////////////////////////////////////////////////////////

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


        logInCompanyAction: async ({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login-company`, data)
                    .then(res => {
                        commit('setCompany', res.data);

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

        showNotification: (context, data) => {
            data.id = hashCode(data.message).toString()
            context.commit('addNotification', data);

            setTimeout(() => {
                context.commit('deleteNotification', data.id)
            }, 3000);
        },

        deleteNotification: ({ commit }, data) => {
            commit('deleteNotification', data);
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
        },


        addUserAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/add-user`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getUserAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-user/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        getCurrentUserAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-current-user/${data.id}`)
                    .then(res => {
                        done(res.data)
                        context.commit('setUser', res.data);
                    })
                    .catch(err => done(err));
            })
        },

        checkUserAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/check-user/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        findByNameAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/find-by-name`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getUserInfoAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-user-info/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        editUserAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-user`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        editEmployeeAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-employee`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        addUserRequestAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/send-user-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getUserRequestListAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-user-request-list/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        // Company actions //////////////////////////////////////////////////////////////////////////////////

        addCompanyAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/add-company`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        getCurrentCompanyAction: async ({ commit }, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-current-company/${data.id}`,)
                    .then(res => {
                        commit('setCompany', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        editCompanyAction: async ({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-company`, data)
                    .then(res => {
                        commit('setCompany', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        editCompanyPasswordAction: async ({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-company-password`, data)
                    .then(res => {
                        commit('setCompany', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        editUserPasswordAction: async ({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-user-password`, data)
                    .then(res => {
                        commit('setUser', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        addCompanyRequestAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/send-company-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        getCompanyListAction: async () => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-list`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        getCompanyEmployeesAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-company-employees/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        deleteEmployeeAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/delete-employee`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        // Locatoin actions /////////////////////////////////////////////////////////////////////////////



        getLocationsAction: async ({ commit }, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-locations/${data.id}`)
                    .then(res => {
                        commit('setLocations', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        addLocationAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/add-location`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        getLocationAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-location/${data.locationId}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        editLocationAction: async ({ commit }, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/edit-location`, data)
                    .then(res => {
                        commit('setLocations', res.data);
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        getLocationEmployeesAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-location-employees/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        getDeleteLocationAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/delete-location/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        // Requests //////////////////////////////////////////////

        rejectRequestAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/reject-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },
        userDeleteRequestAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/user-delete-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        companyDeleteRequestAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/company-delete-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        acceptRequestAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/accept-request`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getCompanyRequestListAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-company-request-list/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },



        // Workspaces

        getWorkplacesAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-workplaces/${data.employeeId}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        // Files


        uploadImageAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/upload-image`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        getImageAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-image/${data.id}`,)
                    .then(res => {
                        done(res.data)
                        if (data.profile) {
                            context.state.profileImage = res.data.data
                        }
                    })
                    .catch(err => done(err));
            })
        },

        getEmployeesAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-employees/${data.location}`,)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },


        // Reviews


        sendReviewAction: async (context, data) => {
            return new Promise(done => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/send-review`, data)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },

        getReviewsListAction: async (context, data) => {
            return new Promise(done => {
                axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/get-reviews-list/${data.id}`)
                    .then(res => {
                        done(res.data)
                    })
                    .catch(err => done(err));
            })
        },





    },
    modules: {}
})