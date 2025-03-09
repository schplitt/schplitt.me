<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
    title: "schplitt.me",
    description: "A personal blog by schplitt"
})
</script>

<template>
    <Globe />
    <ContentRenderer :value="home!" />
</template>
