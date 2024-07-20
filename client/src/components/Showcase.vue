<script>

import {useAuthStore} from "@/stores/auth.store.js";
import axios from "axios";
import {router} from "@/main.js";
import {ref} from "vue";
import UserPreviewList from "@/components/UserPreviewList.vue";

import {marked} from 'marked';

export default {
  components: {UserPreviewList},
  data() {
    return {
      username: useAuthStore().user?.username,
      showcaseName: router.currentRoute.value.params.showcase,
      showcaseBody: ref(''),
      showcaseCreated: ref(''),
      showcaseUsers: ref(Array),
      isEditor: false,
      isAdmin: false
    }
  },
  methods: {
    async getShowcase() {
      await axios.get("http://localhost:3000/api/showcase/", {
        params: {
          name: this.showcaseName
        }
      }).then(value => {
        this.showcaseBody = value.data.contents
        this.showcaseCreated = value.data.createdAt
        this.showcaseUsers.value = value.data.users
        for (let valueKey in this.showcaseUsers.value) {
          if (this.showcaseUsers.value[valueKey].username === this.username) {
            this.isEditor = true;
            this.isAdmin = true;
          }
        }
      }).catch(reason => {
        console.log(reason)
      })
    },
    renderMarkdown() {
      const html = marked.parse(this.showcaseBody);
      this.$refs.renderedMD.innerHTML = html
    },
    togglePreview() {
      this.isEditor = !this.isEditor
      this.renderMarkdown
    }
  },
  beforeMount() {
    this.getShowcase()
  },
  mounted() {
    this.renderMarkdown()
  }
}


</script>

<template>

  <h1> This is {{ showcaseName }}</h1>
  <a> {{ showcaseCreated }}</a>
  <UserPreviewList :userList="showcaseUsers.value"></UserPreviewList>
  <div v-if="isAdmin">
    <button @click="togglePreview">Toggle preview</button>

      <div class="row justify-content-center">
        <div class="col-6" v-show="isEditor">
          <div class="card">
            <textarea v-model="showcaseBody" @input="renderMarkdown"></textarea>
          </div>
        </div>
        <div class="col-6">
          <div ref="renderedMD" class="card">
          </div>
        </div>
      </div>
    </div>


  <div v-if="!isAdmin">
    <div ref="renderedMD" class="card">

    </div>
  </div>

</template>











