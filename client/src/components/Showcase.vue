<script>

 import {useAuthStore} from "@/stores/auth.store.js";
  import { storeToRefs } from 'pinia';
 import axios from "axios";
 import {router} from "@/main.js";
 import {computed, ref} from "vue";
 import UserPreviewList from "@/components/UserPreviewList.vue";


export default{
  components: {UserPreviewList},
  data() {
    return {
      username : useAuthStore().user?.value?.username,
      showcaseName : router.currentRoute.value.params.showcase,
      showcaseBody : ref(''),
      showcaseCreated : ref(''),
      showcaseUsers : ref(Array)
    }
  },
  methods:{
    async getShowcase(){
      await axios.get("http://localhost:3000/api/showcase/", {
       params: {
         name: this.showcaseName
       }
     }).then(value => {
       this.showcaseBody = value.data.contents
       this.showcaseCreated = value.data.createdAt
       this.showcaseUsers.value = value.data.users
     }).catch(reason => {
       console.log(reason)
     })
    }
  },
  beforeMount() {
    this.getShowcase()

  }
}


</script>

<template>

    <h1> This is {{showcaseName}}</h1>
    <a> {{showcaseCreated }}</a>
    <textarea v-model="showcaseBody"></textarea>
    <UserPreviewList :userList="showcaseUsers.value"></UserPreviewList>
</template>