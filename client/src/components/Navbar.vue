<script setup>


import {useAuthStore} from "@/stores/auth.store.js";
import {storeToRefs} from 'pinia';
import UserSearch from "@/components/UserSearch.vue";

const authStore = useAuthStore();

let {user: authUser} = storeToRefs(authStore);


const username = authUser?.value?.username

function doLogout() {
  authStore.logout()
}
</script>

<template>
  <header>
    <div class="row  bg-body-tertiary">
    <div class="col-10">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid ">
        <RouterLink class="navbar-brand" to="/home">Code-ify</RouterLink>
        <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
                data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/home">Home</RouterLink>
            </li>
            <li v-show="authUser" class="nav-item dropdown">
              <a aria-expanded="false" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button">
                Hi there {{ username }}!
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" to="/my-profile">View your own profile</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/" @click="doLogout">Logout</RouterLink>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
      </div>
    <div class="col-2  bg-body-tertiary">
      <userSearch/>
    </div>
  </div>
  </header>
</template>