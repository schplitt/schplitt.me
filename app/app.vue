<script setup lang="ts">
useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s - schplitt.me',
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
