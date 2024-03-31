import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue3Tour from 'vue3-tour';

createApp(App).use(store).use(router).use(Vue3Tour).mount('#app');
