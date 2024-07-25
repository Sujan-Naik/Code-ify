

import { createApp } from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'


import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth.store.js";

import { createPinia } from 'pinia'
import MyProfile from "@/components/MyProfile.vue";
import PublicProfile from "@/components/PublicProfile.vue";
import CreateShowcase from "@/components/CreateShowcase.vue";
import Showcase from "@/components/Showcase.vue";
import UserShowcase from "@/components/UserShowcaseList.vue";
import errorModalPlugin from "@/components/plugin/ErrorModalPlugin.js";
import successModalPlugin from "@/components/plugin/SuccessModalPlugin.js";
const pinia = createPinia()


// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Import Bootstrap JS (optional, only if you need Bootstrap's JavaScript components)
import 'bootstrap/dist/js/bootstrap.js'
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: Home, props: {} },
        { path: '/login', component: Login},
        { path: '/sign-up', component: Signup},
        { path: '/my-profile', component: MyProfile, props: {user: JSON}},
        { path: '/profile/:username', component: PublicProfile, name:'profile'},
        { path: '/profile/:username/showcases', component: UserShowcase, name:'user-showcase'},
        { path: '/create-showcase', component: CreateShowcase, name:'create-showcase'},
        { path: '/showcase/:showcase', component: Showcase, name:'showcase'},
    ]
});

// https://jasonwatmore.com/post/2022/05/26/vue-3-pinia-jwt-authentication-tutorial-example
router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/sign-up','/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        // auth.returnUrl = to.fullPath;
        return '/login';
    }

    if (auth.user && to.path === '/login'){
        return '/home'
    }
});

const app = createApp(App)
app.use(pinia)
app.use(router);
app.use(errorModalPlugin);
app.use(successModalPlugin);


app.mount('#app')