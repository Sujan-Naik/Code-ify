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
    async saveChanges(){
      const formData = new FormData();
      formData.append('name', this.showcaseName);
      formData.append('contents', this.showcaseBody);
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

  <h1> This is {{ showcaseName }}</h1>
  <a> {{ showcaseCreated }}</a>
  <UserPreviewList :userList="showcaseUsers.value"></UserPreviewList>
  <div v-if="isAdmin">
    <button @click="togglePreview">Toggle preview</button>
    <button @click="saveChanges">Save contents</button>
<div v-if="showcaseImage">
    <img ref="renderedImg" :src="`data:${showcaseImage.contentType};base64,${showcaseImage.imageBase64}`" :alt="showcaseImage.filename" />
      </div>
      <div class="row justify-content-center">
        <div class="col-6" v-show="isEditor">

          <div>
        <label for="image">Image:</label>
        <input type="file" @change="onFileChange" required />
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
    <div v-if="showcaseImage">
    <img ref="renderedImg" :src="`data:${showcaseImage.contentType};base64,${showcaseImage.imageBase64}`" :alt="showcaseImage.filename" />
      </div>
    <div ref="renderedMD" class="card">

    </div>
  </div>

</template>











