<script setup>

import UserPreview from "@/components/UserPreview.vue";
import UserDetailedPreview from "@/components/UserDetailedPreview.vue";

const props = defineProps({
  userList: Array
})


</script>

<template>
  <div id="accordionFlushExample" class="accordion accordion-flush">

    <div v-for="userProp in userList" :key="userProp">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button aria-controls="flush-collapseOne" aria-expanded="true" class="accordion-button collapsed"
                  data-bs-target="#flush-collapseOne" data-bs-toggle="collapse" type="button">
            <user-preview :user="userProp"/>
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <user-detailed-preview :user="userProp"/>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>