<script>

  import {useAuthStore} from "@/stores/auth.store.js";
  import { storeToRefs } from 'pinia';
  import axios from "axios";
  import {router} from "@/main.js";
  import {onMounted, ref} from "vue";

  export default {
    name: "PublicProfile",
    data() {
      return {
        route_name: router.currentRoute.value.params.username,
        valid: false,
        message: "Loading..."
      };
    },
    methods: {
      async getUser() {
        let response = await axios.get('http://localhost:3000/api/user/', {
          params: {
            username: this.route_name
          }
        }).then(value => {
          console.log(value)
          this.message = `This is ${this.route_name}`
          this.valid = true
        }).catch(reason => {
            this.message = reason
          })
      }
    },
    beforeMount() {
      this.getUser()
    }
  };
</script>

<template>
    <div class="container-fluid">
      <h1>Profile</h1>
      <div v-if="valid">{{ message }}</div>
      <div v-if="!valid">User not found</div>

    </div>
</template>