<script setup>

  import navbar from "./components/Navbar.vue"
  import userSearch from "./components/UserSearch.vue"
  //
  // import { storeToRefs } from 'pinia';
  //
  // import { useAuthStore } from './stores/auth.store.js';
  // import { useUsersStore } from './stores/users.store.js';
  //
  //
  // const authStore = useAuthStore();
  // const { user: authUser } = storeToRefs(authStore);
  //
  // const usersStore = useUsersStore();
  // const { users } = storeToRefs(usersStore);
  //
  // usersStore.getAll();
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

</script>

<script>

</script>

<template>
  <html lang="en" data-bs-theme="dark">
  <navbar />

  <body class="bg-secondary-subtle">

  <div class = "container-xxl p-5 b-5  h-100">
    <router-view/>
  </div>
  </body>
  </html>
</template>

<style>

</style>