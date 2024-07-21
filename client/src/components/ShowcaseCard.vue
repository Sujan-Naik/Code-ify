<script>

import {useAuthStore} from "@/stores/auth.store.js";
import axios from "axios";
import {router} from "@/main.js";
import {ref} from "vue";
import UserPreviewList from "@/components/UserPreviewList.vue";

import {marked} from 'marked';

export default {
  name: "ShowcaseCard",
  components: {UserPreviewList},
  props: {
      showcaseName: String,
      showcaseBody: String,
      showcaseCreated: String,
      showcaseUsers: ref(Array),
  },
  methods: {
    renderMarkdown() {
      const html = marked.parse(this.showcaseBody);
      this.$refs.renderedMD.innerHTML = html
    },
  },
  mounted() {
    this.renderMarkdown()
  }
}


</script>

<template>

  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ showcaseName }}</h5>
      <div ref="renderedMD" class="card-text"></div>
      <p class="card-text"><small class="text-body-secondary">Since {{ showcaseCreated }} </small></p>
      <UserPreviewList :userList="showcaseUsers.value"></UserPreviewList>
    </div>
  </div>





</template>











