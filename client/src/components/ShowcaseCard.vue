<script>

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
    showcaseTextPreview: String,
    showcaseImage: ref(Object),

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

  <RouterLink :to="'/showcase/'+ showcaseName">
    <div class="card">
      <sub> {{ showcaseTextPreview }}</sub>
      <div v-if="showcaseImage">
        <img ref="renderedImg" :alt="showcaseImage.filename"
             :src="`data:${showcaseImage.contentType};base64,${showcaseImage.imageBase64}`"
             class="card-img-top"/>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ showcaseName }}</h5>
        <div ref="renderedMD" class="card-text"></div>
        <p class="card-text"><small class="text-body-secondary">Since {{ showcaseCreated }} </small></p>
        <UserPreviewList :userList="showcaseUsers.value"></UserPreviewList>
      </div>
    </div>
  </RouterLink>


</template>











