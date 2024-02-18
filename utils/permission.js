'use strict';
import router from '@/router';

function isAuth() {
    const auth = localStorage.getItem('token') == '' ? false : true;
    const role = localStorage.getItem('role')

    if (!auth) {
        router.push('/');
        return false
    } else if (auth && role) {

        const token = localStorage.getItem('token')
        if (router.currentRoute.value.name == 'login') {
            switch (role) {
                case 'user':
                    router.push({
                        name: 'user-dashboard',
                        params: {
                            id: token
                        }
                    });
                    break;

                case 'company':
                    router.push({
                        name: 'company-dashboard',
                        params: {
                            id: token
                        }
                    });
                    break;
            }
        }

        return true
    }
}

function checkRoutePermission() {
    const userRoutes = ['user', 'user-dashboard', 'user-settings', 'user-requests']
    const companyRoutes = ['company', 'company-dashboard', 'company-locations', 'edit_location', 'add_location', 'company-employees', 'add_employee', 'company-requests', 'company-search-user']

    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    switch (role) {
        case 'user':
            if (!userRoutes.includes(router.currentRoute.value.name)) {
                router.push({
                    name: 'user-dashboard',
                    params: {
                        id: token
                    }
                });
            }
            break;

        case 'company':
            if (!companyRoutes.includes(router.currentRoute.value.name)) {
                router.push({
                    name: 'company-dashboard',
                    params: {
                        id: token
                    }
                });
            }
            break;
    }
}


function checkRole() {
    const auth = localStorage.getItem('token') == '' ? false : true;
    const role = localStorage.getItem('role')

    if (auth && role) {

        switch (role) {
            case 'user':
                return 'user';

            case 'company':
                return 'company';
        }
    }

    return null;
}

export { isAuth, checkRoutePermission, checkRole };