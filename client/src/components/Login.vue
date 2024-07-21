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

    <div class="mb-3">
      <label class="form-label" for="username-input">Enter your username</label>
      <input id="username-input" v-model="username" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="password-input">Enter your password</label>
      <input id="password-input" v-model="password" class="form-control" type="password">
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>

  </form>

     <RouterLink to="/sign-up">
      <button class="btn btn-primary"> Sign up here </button>
    </RouterLink>

</template>
