<script>

import axios from "axios";
import {router} from "@/main.js";

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
      console.log(this.route_name)
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
    <div v-if="valid">{{ message }}
      <RouterLink :to="'/profile/' + route_name + '/showcases/'">
        <button>View this accounts Showcases</button>
      </RouterLink>
    </div>
    <div v-if="!valid">User not found</div>

  </div>
</template>