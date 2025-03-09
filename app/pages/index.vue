<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('index').path('/').first())

useSeoMeta({
    title: "schplitt.me",
    description: "A personal blog by schplitt"
})

//const mdcVars = ref({})
</script>

<template>
    <Globe />
    <Render :value="home!" />
</template>
