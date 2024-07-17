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


</script>

<script>

</script>

<template>
  <navbar />
  <userSearch/>

  <div id="app">
    <router-view/>
  </div>

</template>

