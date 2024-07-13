<!--<script src="https://apis.google.com/js/platform.js" async defer>-->
<!--    // function onSignIn(googleUser) {-->
<!--    //   var profile = googleUser.getBasicProfile();-->
<!--    //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.-->
<!--    //   console.log('Name: ' + profile.getName());-->
<!--    //   console.log('Image URL: ' + profile.getImageUrl());-->
<!--    //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.-->
<!--    // }-->

<!--</script>-->

<script setup>
  import { ref } from 'vue'

  const username = ref("")
  const password = ref("")
  function createUser(){
    console.log(`username is ${username.value} and password is ${password.value}`)
  }


</script>

<template>

<!--  <head>-->
<!--    <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">-->
<!--  </head>-->

<!--  <div  class="g-signin2" data-onsuccess="onSignIn"></div>-->

  <form @submit.prevent="createUser">
    <input v-model="username" placeholder="Enter username" />
    <input v-model="password" placeholder="Enter password" />
    <button type="submit">Submit</button>
  </form>
</template>
