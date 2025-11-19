<script setup lang="ts">
useSeoMeta({
  title: 'Page Not Found - schplitt.me',
  description: 'Seems like you took a wrong turn.',
  ogTitle: 'Page Not Found',
  ogDescription: 'Seems like you took a wrong turn.',
  ogImage: 'https://schplitt.me/schplitt.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <div class="flex flex-col items-center justify-center">
        I think you didn't want to go here, eh?
        <SLink to="/">
          Go back home
        </SLink>
      </div>
    </NuxtLayout>
  </UApp>
</template>
