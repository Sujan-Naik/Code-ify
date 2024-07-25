<script>

import {h, ref, render, watch} from "vue";
import axios from "axios";
import UserPreviewList from "@/components/UserPreviewList.vue";

export default{
  components: {UserPreviewList},
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
      console.log('test')
    await this.getMatchingUsers()
  })
  }

};



</script>

<template>
  <header>
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Search</button>
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" style="--bs-offcanvas-height: 400px">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasTopLabel">Search</h5>
      </div>
      <div class="offcanvas-body">
        <input  v-model="searchQuery" type="text" id="fname" name="fname"><br><br>
        <UserPreviewList :userList="matchingUsers.value"></UserPreviewList>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
  </div>
  </header>

</template>