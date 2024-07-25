<script setup>
import UserDetailedPreview from "@/components/UserDetailedPreview.vue";

const props = defineProps({
  userList: Array
});
</script>

<template>
  <div id="accordion-user-list" class="accordion">
    <div v-for="(user, index) in userList" :key="user.username">
      <UserDetailedPreview :user="user" :index="index" />
    </div>
  </div>
</template>
