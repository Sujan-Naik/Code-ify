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
      showcaseImage: ref(Object),
      showcaseTextPreview: ref(''),
      isEditor: false,
      isAdmin: false,
      attempt: false,
      selectedFile: null
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
        this.showcaseImage = value.data.image
        for (let valueKey in this.showcaseUsers.value) {
          if (this.showcaseUsers.value[valueKey].username === this.username) {
            this.isEditor = true;
            this.isAdmin = true;
          }
        }
      }).catch(reason => {
        this.$showErrorModal(reason.data)
      })
    },
    async saveChanges() {
      const formData = new FormData();
      formData.append('name', this.showcaseName);
      formData.append('contents', this.showcaseBody);
      formData.append('textPreview', this.showcaseTextPreview)

      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      await axios.patch('http://localhost:3000/api/showcase/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(value => {
        this.$showSuccessModal('Successfully saved changes')
      }).catch(reason => {
        this.$showErrorModal(reason.data)

      })

    },
    renderMarkdown() {
      const html = marked.parse(this.showcaseBody);
      this.$refs.renderedMD.innerHTML = html
    },
    togglePreview() {
      this.isEditor = !this.isEditor
      this.renderMarkdown()
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.$refs.renderedImg.src = URL.createObjectURL(event.target.files[0])
    },
  },
  beforeMount() {
    this.getShowcase().then(() => this.renderMarkdown())
  },
  mounted() {
  }
}


</script>

<template>

    <div class="row p-5">

  <div class="d-inline-flex flex-row justify-content-center">

    <div class="d-inline-flex flex-column">

  <h1> This is {{ showcaseName }}</h1>

  <a> {{ showcaseCreated }}</a>
  <UserPreviewList :userList="showcaseUsers.value"></UserPreviewList>

      </div>
    </div>
    </div>

  <div v-if="isAdmin">

        <div class="row justify-content-center">

    <button @click="togglePreview">Toggle preview</button>
    <button @click="saveChanges">Save contents</button>

      <img v-if="showcaseImage" ref="renderedImg" :alt="showcaseImage.filename"
           :src="`data:${showcaseImage.contentType};base64,${showcaseImage.imageBase64}`"/>

      <img v-else ref="renderedImg"  alt="" src=""/>

      <div v-show="isEditor" class="col-6">

        <div class="row justify-content-center align-content-center d-inline-flex ">
          <label for="image">Image:</label>
          <input required type="file" @change="onFileChange"/>

          <label class="form-label" for="preview-input">Enter a text preview</label>
          <input id="preview-input" v-model="showcaseTextPreview" class="form-control"/>
        </div>
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
    <sub> {{ showcaseTextPreview }}</sub>
    <div v-if="showcaseImage">
      <img ref="renderedImg" :alt="showcaseImage.filename"
           :src="`data:${showcaseImage.contentType};base64,${showcaseImage.imageBase64}`"/>
    </div>
    <div ref="renderedMD" class="card">

    </div>
  </div>

</template>











