'use strict';
import router from '@/router';

function isAuth() {
    const auth = localStorage.getItem('token') == '' ? false : true;
    const role = localStorage.getItem('role')

    if (!auth) {
        router.push('/');
        return false
    } else if (auth && role) {

        if (router.currentRoute.value.name == 'login') {
            switch (role) {
                case 'user':
                    router.push({
                        name: 'user-dashboard',
                    });
                    break;

                case 'company':
                    router.push({
                        name: 'company-dashboard',
                    });
                    break;
            }
        }

        return true
    }
}

function checkRoutePermission() {
    const userRoutes = ['user', 'user-dashboard', 'user-settings', 'user-requests']
    const companyRoutes = ['company', 'company-dashboard', 'company-locations', 'edit_location', 'add_location', 'company-employees', 'add_employee', 'company-requests', 'company-search-user', 'company-settings']

    const role = localStorage.getItem('role')

    switch (role) {
        case 'user':
            if (!userRoutes.includes(router.currentRoute.value.name)) {
                router.push({
                    name: 'user-dashboard',
                });
            }
            break;

        case 'company':
            if (!companyRoutes.includes(router.currentRoute.value.name)) {
                router.push({
                    name: 'company-dashboard',
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

function showTour() {
    let show = localStorage.getItem('showTour');


    if (show === null) {
        localStorage.setItem('showTour', true)
        return true;
    } else {
        return show == 'true' ? true : false;
    }
}

export { isAuth, checkRoutePermission, checkRole, showTour };