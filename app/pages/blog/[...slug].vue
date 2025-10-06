<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, async () => {
  return await queryCollection('blog').path(route.path).first()
})

if(!page.value) {
  await navigateTo("/")
}
</script>

<template>
  <div>
    <!-- Render title and date here above content -->
     <!-- Render back link -->
    <SLink
      to="/blog"
      class="text-sm text-blue-500 hover:underline mb-4 inline-block"
    >
      &larr; Blog
    </SLink>
    <h1 class="text-3xl font-bold mb-2" v-if="page">{{ page.title }}</h1>
    <p class="text-sm text-muted mb-4" v-if="page && page.date">
      {{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}
    </p>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
  </div>
</template>
