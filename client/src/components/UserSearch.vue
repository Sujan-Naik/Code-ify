<script>

import {ref} from "vue";
import axios from "axios";
import UserPreview from "@/components/UserPreview.vue";
import UserPreviewList from "@/components/UserPreviewList.vue";

export default {
  components: {UserPreviewList, UserPreview},
  data() {
    return {
      searchQuery: ref(""),
      matchingUsers: ref(Array)
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
  watch: {
    async searchQuery() {
      await this.getMatchingUsers()
    },
  }

};


</script>

<template>
  <div>

    <form class="d-flex" role="search">
      <input id="fname" v-model="searchQuery" name="fname" type="text"><br><br>
      <UserPreviewList :userList="matchingUsers.value"></UserPreviewList>
    </form>

  </div>

</template>