<script setup>
import { useUser } from "@/composables/userComposables.js";

const props = defineProps({
  user: JSON,
  index: Number,
});
const { username, email, createdAt } = props.user
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button"
        type="button"
        :data-bs-toggle="'collapse'"
        :data-bs-target="'#collapse' + index"
        aria-expanded="false"
        :aria-controls="'collapse' + index">
        {{ username }}
      </button>
    </h2>
    <div
      :id="'collapse' + index"
      class="accordion-collapse collapse"
      data-bs-parent="#accordion-user-list">
      <div class="accordion-body">
        <p>Email: {{ email }}</p>
        <p>Created At: {{ createdAt }}</p>
      </div>
    </div>
  </div>
</template>
