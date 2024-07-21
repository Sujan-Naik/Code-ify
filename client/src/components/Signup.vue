<script>
import axios from "axios";
import {useAuthStore} from "@/stores/auth.store.js";

export default {
  name: "Signup",
  data() {
    return {
      message: document.createElement("div"),
      username: "",
      password: "",
      email: ""
    };
  },
  methods: {
    async createUser(e) {
      e.preventDefault();
      const response = await axios.post('http://localhost:3000/api/user/', {
        username: this.username,
        password: this.password,
        email: this.email,
        createdAt: new Date()
      }).then(value => {
        this.$showSuccessModal("You have successfully created a new account!")
        useAuthStore().login(value.data)
        this.$router.push('/home')
      }).catch(reason => {
        this.$showErrorModal(reason.data)
      });
    }
  }
}

</script>

<template>

  <form @submit.prevent="createUser">

    <div class="mb-3">
      <label class="form-label" for="username-input">Enter a username</label>
      <input id="username-input" v-model="username" class="form-control" placeholder="Must be unique"/>
    </div>
    <div class="mb-3">
      <label class="form-label" for="email-input">Email address</label>
      <input id="email-input" v-model="email" aria-describedby="email-help" class="form-control" type="email">
      <div id="email-help" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="password-input">Password</label>
      <input id="password-input" v-model="password" class="form-control" type="password">
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>

  </form>
</template>
