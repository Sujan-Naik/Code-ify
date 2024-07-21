<script>
import axios from "axios";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth.store.js";
import {ref} from "vue";
import UserShowcase from "@/components/UserShowcase.vue";
import ShowcaseCardGroup from "@/components/ShowcaseCardGroup.vue";

export default {
  name: "UserShowcaseList",
  components: {ShowcaseCardGroup, UserShowcase},
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
  mounted() {
    this.getShowcases()
  }
}
</script>
<template>
  <div class="row row-cols-1 row-cols-md-2 g-4 pt-5">
    <div v-for="showcase in showcases" :key="showcase">
      <ShowcaseCardGroup :showcase="showcase"></ShowcaseCardGroup>
    </div>
  </div>
</template>