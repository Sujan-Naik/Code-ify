<script setup>
const props = defineProps({
  user: JSON
})

import {useUser} from "../composables/userComposables.js";

const {username, email, createdAt} = useUser(props)


</script>

<template>
  <div>
    <a> {{ username }}</a>
  </div>
</template>