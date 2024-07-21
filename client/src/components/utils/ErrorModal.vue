<script setup>

defineProps({
  message: String
})

</script>

<template>
  <div aria-labelledby="exampleModalLabel" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="exampleModalLabel" class="modal-title fs-5">Error</h1>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning" role="alert">
            {{ message }}
          </div>

        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.modal {
  display: block; /* Show the modal */
}

.modal-backdrop {
  display: none; /* Hide the backdrop */
}
</style>