<script setup>

import ShowcaseCard from "@/components/ShowcaseCard.vue";

const props = defineProps({
  showcase: Object
})
const showcaseName = props.showcase.name
const showcaseBody = props.showcase.contents
const showcaseUsers = props.showcase.users
const showcaseCreated = props.showcase.createdAt
</script>

<template>
  <div class="col">
  <ShowcaseCard :showcaseName="showcaseName" :showcaseBody="showcaseBody" :showcaseUsers="showcaseUsers" :showcaseCreated="showcaseCreated">
  </ShowcaseCard>
  </div>
</template>