<script>

import {h, ref, render, watch} from "vue";
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

            const matchingUsers = this.matchingUsers

            matchingUsers.forEach(function (oldMatchingUser) {
              if (!possibleUsers.some(newUser => newUser.username === oldMatchingUser.username)) {
                // remove old invalid users

              }
            })

            possibleUsers.forEach(function (newMatchingUser) {
              if (!matchingUsers.some(oldUser => oldUser.username === newMatchingUser.username)) {
                console.log(newMatchingUser)
                // Check which users are new and display
                // this.getMatchingUsers().remove(this.getMatchingUsers().indexOf())
                const vueComponent = h(UserPreview, { user: newMatchingUser});
                // Append it to p (which is an HTML Element)
                console.log(newMatchingUser.username)
                render(vueComponent, document.body)
              }
            })
            this.matchingUsers = possibleUsers
          })
    },
  },
  mounted() {
    watch(() => this.searchQuery, async () => {
    this.getMatchingUsers()
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
  <ol class="list-group list-group-numbered">
  </ol>
  </body>
</template>