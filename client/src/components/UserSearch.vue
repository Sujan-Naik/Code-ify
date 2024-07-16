<script>

import {h, ref, render, watch} from "vue";
import axios from "axios";
import UserPreview from "@/components/UserPreview.vue";
import UserPreviewList from "@/components/UserPreviewList.vue";

export default{
  components: {UserPreviewList, UserPreview},
  data(){
    return {
      searchQuery: ref(""),
      matchingUsers: ref([])
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

            this.matchingUsers.value = possibleUsers
          })
    }
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
  <UserPreviewList :userList="matchingUsers"></UserPreviewList>
  </body>
</template>