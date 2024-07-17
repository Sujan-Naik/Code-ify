<script setup>
 const props = defineProps({
   user: JSON
 })

 import {useUser} from "../composables/userComposables.js";

 const { username, email, createdAt} = useUser(props)
</script>

<template>
  <div>
    <RouterLink :to="'/profile/' + username">
      <a> Todo, contains more detailed information about said user</a>
    </RouterLink>

  </div>
</template>