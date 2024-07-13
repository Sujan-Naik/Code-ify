<script>
  import axios from "axios";

  export default {
    name: "Login",
    data() {
      return {
        message: document.createElement("div"),
        username: "",
        password: "",
      };
    },
    methods: {
      async getUser(e) {
        e.preventDefault();
        try {
          const response = await axios.get('http://localhost:3000/api/user/', {
          params: {username: this.username}
          });

          if (response.data.password === this.password) {
            this.message.innerHTML = "You have successfully logged in!"
            this.message.className = "alert alert-success"
            this.message.role = "alert"
          } else {
            this.message.innerHTML = "Incorrect password"
            this.message.className = "alert alert-danger"
            this.message.role = "alert"
          }
        }
        catch (e) {
          this.message.innerHTML = e.message
          this.message.className = "alert alert-warning"
          this.message.role = "alert"
        }
        finally {
          document.body.append(this.message)
        }
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
</template>
