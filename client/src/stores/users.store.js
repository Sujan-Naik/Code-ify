import { defineStore } from 'pinia';
import axios from "axios";


export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            await axios.get('http://localhost:3000/api/user/')
                .then(users => this.users = users)
                .catch(error => this.users = { error })
        }
    }
});