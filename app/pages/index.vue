<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('index').path('/').first())

useSeoMeta({
  title: 'schplitt.me',
  description: 'A personal blog by schplitt',
})

// const mdcVars = ref({})
</script>

<template>
  <div>
    <Globe />
    <Render :value="home!" />
  </div>
</template>
