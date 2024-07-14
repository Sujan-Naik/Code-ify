<script setup>


 import {useAuthStore} from "@/stores/auth.store.js";
  import { storeToRefs } from 'pinia';

  const authStore = useAuthStore();

  let { user: authUser } = storeToRefs(authStore);


  const  username  = authUser?.value?.username

 function doLogout(){
   authStore.logout()
 }
</script>

<template>
  <header>
  <nav class="navbar" data-bs-theme="light" >
    <div class="container-fluid">
      <a class="navbar-brand" >
        <RouterLink to="/home">Code-ify </RouterLink>
      </a>
       <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!authUser">
        <li class="nav-item" >
          <a class="nav-link active" aria-current="page">
            <RouterLink to="/login">Login </RouterLink>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authUser">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page">
            <RouterLink to="/my-profile">Hi there {{username}}!</RouterLink>
          </a>
        </li>
        <li class="nav-item" >
          <a class="nav-link active" aria-current="page">
            <RouterLink to="/" @click="doLogout()">Logout</RouterLink>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  </header>
</template>