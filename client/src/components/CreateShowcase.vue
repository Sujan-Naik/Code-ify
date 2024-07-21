<script>
  import axios from "axios";
  import {storeToRefs} from "pinia";
  import {useAuthStore} from "@/stores/auth.store.js";
  import {useRouter} from "vue-router";

  export default {
    name: "CreateShowcase",
    data() {
      return {
        name: "",
        contents: "test",
        user: storeToRefs(useAuthStore())
      };
    },
    methods: {
      async createShowcase(e) {
        e.preventDefault();
          const response = await axios.post('http://localhost:3000/api/showcase/', {
            name: this.name,
            contents: this.contents,
            createdAt: new Date(),
            usernames: [this.user.user.username]
          }).then(value => {
            this.$showSuccessModal("You have successfully created a new showcase!")
            this.$router.push('showcase/' + this.name)

            this.assignShowcaseToUser()
          }).catch(reason => {
            this.$showErrorModal(reason)
          });
      },
      async assignShowcaseToUser() {
           await axios.patch("http://localhost:3000/api/user/showcase/update/", {
                name: this.name,
                username: this.user.user.username
            }).then(value => {
             this.$showSuccessModal("You have successfully been assigned this new showcase!")
            }).catch(reason => {
             this.$showErrorModal(reason)
          })
      }
    }
  }

</script>


<template>
  <form @submit.prevent="createShowcase">
    <input v-model="name" placeholder="Enter the name of your new showcase" />
    <button type="submit">Submit</button>
  </form>
</template>