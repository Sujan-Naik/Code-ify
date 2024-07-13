<script setup>

  import navbar from "./components/Navbar.vue"
  import axios from "axios";

  // export default {
  //   name: "App",
  //   data() {
  //     return{
  //       username: "",
  //       cookies: "",
  //     }
  //
  //   }
  // }

  import { storeToRefs } from 'pinia';

  import { useAuthStore } from './stores/auth.store.js';
  import { useUsersStore } from './stores/users.store.js';
  import {router} from "./main.js";

  // router.beforeEach((to) => {

      const authStore = useAuthStore();
  const { user: authUser } = storeToRefs(authStore);

  const usersStore = useUsersStore();
  const { users } = storeToRefs(usersStore);

  usersStore.getAll();
  // })



</script>

<script>

</script>

<template>

      <div>
        <h1>Hi {{authUser?.username}}!</h1>
        <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        <ul v-if="users.length">
            <li v-for="user in users" :key="user.id">{{user.username}} </li>
        </ul>
        <div v-if="users.loading" class="spinner-border spinner-border-sm"></div>
        <div v-if="users.error" class="text-danger">Error loading users: {{users.error}}</div>
    </div>


  <navbar/>




  <div id="app">
    <router-view/>
  </div>

</template>

