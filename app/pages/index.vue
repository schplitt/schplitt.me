<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('index').path('/').first())

useSeoMeta({
  title: 'Home',
  description: 'A personal blog by schplitt',
  ogTitle: 'Home',
  ogDescription: 'A personal blog by schplitt',
  twitterCard: 'summary',
})

// const mdcVars = ref({})
</script>

<template>
  <div>
    <ContentRenderer
      :value="home!"
    />
  </div>
</template>
