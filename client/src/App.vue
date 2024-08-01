<script setup>

  import navbar from "./components/Navbar.vue"

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

</script>

<script>

</script>

<template>
  <html lang="en" data-bs-theme="dark">
  <navbar />

  <body class="bg-secondary-subtle">

  <div class = "container p-5 b-5 h-100">
    <router-view/>
  </div>
  </body>
  </html>
</template>

<style>

</style>