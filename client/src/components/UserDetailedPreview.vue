<script setup>
const props = defineProps({
  user: JSON,
  targetId: String,
  controlsId: String,
  isExpanded: Boolean
})

import {useUser} from "../composables/userComposables.js";

const {username, email, createdAt} = useUser(props)
</script>


<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button id="cv-field-title" class="accordion-button" type="button" :data-bs-toggle="'collapse'" :data-bs-target="targetId" :aria-expanded="isExpanded" :aria-controls="controlsId">
        <RouterLink :to="'/profile/' + username">
          <a> Todo, contains more detailed information about said user</a>
        </RouterLink>
      </button>
    </h2>
    <div :id="controlsId" class="accordion-collapse collapse" :class="{ show: isExpanded }">
      <div id="cv-field-body" class="accordion-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


