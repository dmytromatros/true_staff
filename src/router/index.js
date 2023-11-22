import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '@/views/System/LogInView.vue'

const routes = [{
        path: '/',
        name: 'login',
        component: LogInView
    },

    {
        path: '/user',
        redirect: { name: 'user-dashboard' },
        children: [{
            path: ':id',
            redirect: { name: 'user-dashboard' },
            children: [{
                    path: 'settings',
                    name: 'user-settings',
                    component: () =>
                        import ('@/views/User/Settings.vue'),
                },
                {
                    path: 'dashboard',
                    name: 'user-dashboard',
                    component: () =>
                        import ('@/views/User/Dashboard.vue'),
                }
            ]
        }]
    },
    {
        path: '/company',
        redirect: { name: 'company-dashboard' },
        children: [{
                path: ':id',
                redirect: { name: 'company-dashboard' },
                children: [{
                        path: 'dashboard',
                        name: 'company-dashboard',
                        component: () =>
                            import ('@/views/Company/Dashboard.vue'),
                    },
                    {
                        path: 'locations',
                        name: 'company-locations',
                        component: () =>
                            import ('@/views/Company/LocationsList.vue'),
                        children: [{
                                path: 'edit/:locationId',
                                name: 'edit_location',
                                components: {
                                    edit_location: () =>
                                        import ('@/components/popups/EditLocationPopup.vue'),
                                }
                            },
                            {
                                path: 'add',
                                name: 'add_location',
                                components: {
                                    add_location: () =>
                                        import ('@/components/popups/AddLocationPopup.vue'),
                                }
                            },
                        ]
                    },
                    {
                        path: 'employees',
                        name: 'company-employees',
                        component: () =>
                            import ('@/views/Company/EmployeesList.vue'),
                        children: [{
                            path: 'add',
                            name: 'add_employee',
                            components: {
                                add_employee: () =>
                                    import ('@/components/popups/AddEmployeePopup.vue'),
                            }
                        }, ]
                    }

                ]
            }

        ]
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'login' },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router