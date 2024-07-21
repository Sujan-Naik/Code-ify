<script>
  import axios from "axios";

  import { useAuthStore } from '../stores/auth.store.js';

  export default {
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
        attempt: false
      };
    },
    methods: {
      async getUser(e) {
        e.preventDefault();
          const response = await axios.get('http://localhost:3000/api/user',  {
            params: {
              username: this.username
            }
          }).then(value => {
            if ((value)["data"][0].password === this.password) {
              useAuthStore().login(value["data"][0])
              this.$showSuccessModal("You have successfully logged in!")
            } else {
              this.$showErrorModal("Incorrect password")
            }
          }).catch(reason => {
            this.$showErrorModal(reason);
          });
      },
    }
  };

</script>

<template>

  <form @submit.prevent="getUser">
    <input v-model="username" placeholder="Enter username" />
    <input v-model="password" placeholder="Enter password" />
    <button type="submit">Submit</button>
  </form>

  <a class="nav-link active" aria-current="page">
    <RouterLink to="/sign-up">Sign up here</RouterLink>
  </a>

</template>
