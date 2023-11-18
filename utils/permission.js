'use strict';
import router from '@/router';

function isAuth(id) {
    const auth = localStorage.getItem('token') == '' ? false : true;
    const role = localStorage.getItem('role')

    if (!auth) {
        router.push('/');
    } else if (auth && role) {
        if (router.currentRoute.value.name == 'login') {
            switch (role) {
                case 'user':
                    router.push({
                        name: 'user-dashboard'
                    });
                    break;

                case 'company':
                    router.push({
                        name: 'company-dashboard',
                        params: {
                            id: id
                        }
                    });
                    break;
            }
        }
    }
}

function checkRoutePermission() {
    const userRoutes = ['user', 'user-dashboard']
    const companyRoutes = ['copmany', 'copmany-dashboard', 'company-locations', 'edit_location', 'add_location']

    const role = localStorage.getItem('role')

    switch (role) {
        case 'user':
            if (!userRoutes.includes(router.currentRoute.value.name)) {
                router.push({
                    name: 'user-dashboard'
                });
            }
            break;

        case 'company':
            if (!companyRoutes.includes(router.currentRoute.value.name)) {
                router.push({
                    name: 'company-dashboard'
                });
            }
            break;
    }
}

export { isAuth, checkRoutePermission };