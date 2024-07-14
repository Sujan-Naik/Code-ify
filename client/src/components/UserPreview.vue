<script setup>
 const props = defineProps({
   user: JSON
 })

 import {useUser} from "../composables/userComposables.js";

 const { username, email, createdAt} = useUser(props)
  console.log(props)
</script>

<template>
  <a> Username is {{username}}</a>
</template>