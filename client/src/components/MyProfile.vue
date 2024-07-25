<script setup>

import {useAuthStore} from "@/stores/auth.store.js";
import {storeToRefs} from 'pinia';

const authStore = useAuthStore();

const {user: authUser} = storeToRefs(authStore);

const {username, email, createdAt} = authUser.value
</script>

<template>
  <main>
    <div class="container-fluid">
      <h1>Profile</h1>
      <sub>Since {{ createdAt }}</sub>
      <ul>
        <li>
          <a> Username: {{ username }}</a>
        </li>
        <li>
          <a> Email: {{ email }}</a>
        </li>

      </ul>
      <RouterLink to="create-showcase">
        <button>Create a new Showcase</button>
      </RouterLink>
      <RouterLink :to="'profile/' + username + '/showcases/'">
        <button>View this accounts Showcases</button>
      </RouterLink>
    </div>
  </main>
</template>