<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('index').path('/').first())

useSeoMeta({
  title: 'Home',
  description: 'A personal blog by schplitt',
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
