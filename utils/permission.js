'use strict';
import router from '@/router';

function isAuth() {
    const auth = localStorage.getItem('token') == '' ? false : true;

    if (!auth) {
        router.push('/');
    } else {
        if (router.currentRoute.value.name == 'login') {
            router.push('/about');
        }
    }
}

export { isAuth };