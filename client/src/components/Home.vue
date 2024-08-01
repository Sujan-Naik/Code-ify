<script setup>

import ShowcaseBrowser from "@/components/ShowcaseBrowser.vue";
</script>

<template>


  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class = "vstack align-content-center">
          <h1> Code-ify</h1>

      <RouterLink to="/create-showcase">
            <button class="btn btn-primary" type="button">Create a new showcase</button>
      </RouterLink>

        </div>
        </div>
    </div>
  </div>

  <ShowcaseBrowser></ShowcaseBrowser>

</template>

<style>

</style>