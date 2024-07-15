<script>

import {createApp, h, ref, render, watch} from "vue";
import axios from "axios";
import UserPreview from "@/components/UserPreview.vue";

export default{
  data(){
    return {
      searchQuery: ref(""),
      matchingUsers: []
    }
  },
  methods: {
    async getMatchingUsers() {
      const response = await axios.get('http://localhost:3000/api/user')
          .then(value => {
            const possibleUsers = []
            const data = value.data

            const regex = new RegExp(String(this.searchQuery))

            data.forEach(function (possibleUser) {
              if (regex.test(possibleUser.username)) {
                possibleUsers.push(possibleUser)
              }
            })

            this.matchingUsers.forEach(function (oldMatchingUser) {
              if (!possibleUsers.some(newUser => newUser.username === oldMatchingUser.username)) {
                // remove old invalid users

              }
            }, this)


            possibleUsers.forEach( function (newMatchingUser) {
              if (!this.matchingUsers.some(oldUser => oldUser.username === newMatchingUser.username)) {
                const vueComponent = createApp(UserPreview, {user : newMatchingUser})
                // const vueComponent = h(UserPreview, { user: newMatchingUser});
                // console.log(newMatchingUser.username)
                const list = document.getElementById('list')
                const listElement = document.createElement("li")
                list.appendChild(listElement)
                vueComponent.mount(listElement)
              }
            }, this)
          })
    },
  },
  mounted() {
    watch(() => this.searchQuery, async () => {
    await this.getMatchingUsers()
  })
  }

};



</script>

<template>
  <header>
     <label>Search for a user:</label>
    <input  v-model="searchQuery" type="text" id="fname" name="fname"><br><br>
  </header>
  <body>
  <ol class="list-group list-group-numbered" id="list">
  </ol>
  </body>
</template>