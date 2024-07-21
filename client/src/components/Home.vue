<script setup>

</script>

<template>

  <div class="row p-5">
        <div class="d-inline-flex justify-content-center">

    <div class="d-inline-flex flex-column">
      <h1> Welcome to Code-ify!</h1>
      <sub> It's never been easier for indie developers to connect to communities</sub>
    </div>
        </div>
  </div>


  <div class="row gx-5 ">
    <div class="col">
              <div class="d-flex justify-content-center">

      <RouterLink to="/create-showcase" >
        <button class="btn btn-primary" type="button">Create a new showcase</button>
      </RouterLink>
              </div>
    </div>
    <div class="col">
        <div class="d-flex justify-content-center">
      <RouterLink to="/showcase/fart">
        <button class="btn btn-primary" type="button">View test showcase</button>
      </RouterLink>
        </div>
    </div>
  </div>

</template>

<style>

</style>