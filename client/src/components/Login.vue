<script>
  import axios from "axios";

  import { useAuthStore } from '../stores/auth.store.js';

  export default {
    name: "Login",
    data() {
      return {
        message: "",
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
              // console.log(value)
              this.message = "You have successfully logged in!"
              useAuthStore().login(value["data"][0])
            } else {
              this.message = "Incorrect password"
            }
          }).catch(reason => {
            this.message = reason
          });

          window.clearTimeout()
          this.attempt = true
          window.setTimeout(() => {
            this.attempt = false
          }, 3000)
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

  <div class="alert alert-primary" role="alert" v-show="attempt" >
    {{message}}
  </div>


</template>
