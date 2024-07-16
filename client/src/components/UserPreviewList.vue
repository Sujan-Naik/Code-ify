<script setup>

import {ref} from "vue";
import UserPreview from "@/components/UserPreview.vue";

defineProps(({
  userList: ref([])
}))
</script>

<template>
  <div v-for="userProp in userList.value" :key="userProp">
    <user-preview :user="userProp" />
  </div>
</template>