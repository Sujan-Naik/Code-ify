<script>
  import axios from "axios";
  import {storeToRefs} from "pinia";
  import {useAuthStore} from "@/stores/auth.store.js";
  import {ref} from "vue";
  import UserShowcase from "@/components/UserShowcase.vue";
  export default {
    name: "UserShowcaseList",
    components: {UserShowcase},
    data() {
      return {
        user: storeToRefs(useAuthStore()),
        showcases: ref([])
      };
    },
    methods: {
      async getShowcases() {
        await axios.get('http://localhost:3000/api/user/showcase/get-all', {
          params: {
            username: this.user.user.username
          }
        }).then(value => {
          console.log(value.data)
          this.showcases = value.data
        }).catch(reason => {

        });
      }
    },
    mounted(){
      this.getShowcases()
    }
  }
</script>
<template>
  <div v-for="showcase in showcases" :key="showcase">
    <UserShowcase :showcase="showcase"></UserShowcase>
  </div>
</template>