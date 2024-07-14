<script>
  import axios from "axios";

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
            this.message.innerHTML = "You have successfully created a new account!"
            this.message.className = "alert alert-success"
            this.message.role = "alert"
          }).catch(reason => {
            this.message.innerHTML = reason.data
            this.message.className = "alert alert-danger"
            this.message.role = "alert"
          });
          document.body.append(this.message);

      }
    }
  }

</script>

<template>

  <form @submit.prevent="createUser">
    <input v-model="username" placeholder="Enter username" />
    <input v-model="password" placeholder="Enter password" />
    <input v-model="email" placeholder="Enter email" />
    <button type="submit">Submit</button>
  </form>
</template>
