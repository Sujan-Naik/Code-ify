<script setup>

import {ref} from "vue";
import UserPreview from "@/components/UserPreview.vue";
import UserDetailedPreview from "@/components/UserDetailedPreview.vue";

const props = defineProps({
  userList: Array
})


</script>

<template>
  <div class="accordion accordion-flush" id="accordionFlushExample">

  <div v-for="userProp in userList" :key="userProp">

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <user-preview :user="userProp" />
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> <user-detailed-preview :user="userProp" />
      </div>
    </div>
  </div>


  </div>
  </div>
</template>