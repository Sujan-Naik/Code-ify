<script setup>

 import {useAuthStore} from "@/stores/auth.store.js";
  import { storeToRefs } from 'pinia';

  const authStore = useAuthStore();

  let { user: authUser } = storeToRefs(authStore);


  const  username  = authUser?.value?.username

</script>

<template>

</template>