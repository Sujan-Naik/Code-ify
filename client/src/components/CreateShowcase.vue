<script>
  import axios from "axios";
  import {storeToRefs} from "pinia";
  import {useAuthStore} from "@/stores/auth.store.js";
  export default {
    name: "CreateShowcase",
    data() {
      return {
        message: document.createElement("div"),
        name: "",
        contents: "test",
        user: storeToRefs(useAuthStore())
      };
    },
    methods: {
      async createShowcase(e) {
        e.preventDefault();
          const response = await axios.post('http://localhost:3000/api/showcase/', {
            name: this.name,
            contents: this.contents,
            createdAt: new Date(),
            usernames: [this.user.user.username]
          }).then(value => {
            this.message.innerHTML = "You have successfully created a new showcase!"
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
  <form @submit.prevent="createShowcase">
    <input v-model="name" placeholder="Enter the name of your new showcase" />
    <button type="submit">Submit</button>
  </form>
</template>