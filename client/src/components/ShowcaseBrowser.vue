<script>
  import axios from "axios";
  import {storeToRefs} from "pinia";
  import {useAuthStore} from "@/stores/auth.store.js";
  import {ref} from "vue";
  import ShowcaseCardGroup from "@/components/ShowcaseCardGroup.vue";
  import ShowcaseCard from "@/components/ShowcaseCard.vue";
  export default {
    name: "ShowcaseBrowser",
    components: {ShowcaseCardGroup, ShowcaseCard},
    data() {
      return {
        showcases: ref([])
      };
    },
    methods: {
      async getShowcases() {
        await axios.get('http://localhost:3000/api/showcase/get-all'
        ).then(value => {
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
<div class="row row-cols-1 row-cols-md-2 g-4 pt-5" >
  <div v-for="showcase in showcases" :key="showcase">
    <ShowcaseCardGroup :showcase="showcase"></ShowcaseCardGroup>
  </div>
        </div>

</template>