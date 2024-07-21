<script setup>
 const props = defineProps({
   showcase: JSON
 })

</script>

<template>
  <div>
    <RouterLink :to="'/showcase/' + showcase.name">
      <a> {{showcase.name}}</a>
      </RouterLink>
  </div>
</template>