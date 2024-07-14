<script setup>
 const props = defineProps({
   user: JSON
 })

 import {useUsername} from "../composables/userComposables.js";

 const { username } = useUsername(props)

</script>

<template>
  <header>
  <nav class="navbar" data-bs-theme="light" >
    <div class="container-fluid">
      <a class="navbar-brand" href="/" >
        Code-ify
      </a>
       <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!props">
        <li class="nav-item" >
          <a class="nav-link active" aria-current="page" href="/login" >Login</a>
        </li>

      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="props">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" v-bind:href="'/profile/'+username"  > Hi there {{username}}!</a>
        </li>
      </ul>
    </div>
  </nav>
  </header>
</template>