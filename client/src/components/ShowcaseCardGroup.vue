<script setup>

import ShowcaseCard from "@/components/ShowcaseCard.vue";

const props = defineProps({
  showcase: Object
})
const showcaseName = props.showcase.name
const showcaseBody = props.showcase.contents
const showcaseUsers = props.showcase.users
const showcaseCreated = props.showcase.createdAt
const showcaseTextPreview = props.showcase.textPreview
const showcaseImage = props.showcase.image
</script>

<template>
  <div class="col">
    <ShowcaseCard :showcaseBody="showcaseBody" :showcaseCreated="showcaseCreated" :showcaseImage="showcaseImage"
                  :showcaseName="showcaseName" :showcaseTextPreview="showcaseTextPreview"
                  :showcaseUsers="showcaseUsers">
    </ShowcaseCard>
  </div>
</template>