// https://jasonwatmore.com/post/2022/05/26/vue-3-pinia-jwt-authentication-tutorial-example

import { defineStore } from 'pinia';

import axios from "axios";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(user) {

            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            this.navigate(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            this.navigate('/login');
        }
    }
});