import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { createApp } from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'


import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth.store.js";

import { createPinia } from 'pinia'
import Profile from "@/components/MyProfile.vue";
const pinia = createPinia()




export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: Home, props: {} },
        { path: '/login', component: Login},
        { path: '/sign-up', component: Signup},
        { path: '/my-profile', component: Profile, props: {user: JSON}},
    ]
});

// https://jasonwatmore.com/post/2022/05/26/vue-3-pinia-jwt-authentication-tutorial-example
router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/','/sign-up','/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        // auth.returnUrl = to.fullPath;
        return '/login';
    }
});

const app = createApp(App)
app.use(pinia)
app.use(router);

app.mount('#app')