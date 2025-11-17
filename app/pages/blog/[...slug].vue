<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, async () => {
  return await queryCollection('blog').path(route.path).first()
})

if (!page.value) {
  await navigateTo('/')
}
</script>

<template>
  <div>
    <!-- Render title and date here above content -->
    <!-- Render back link -->
    <SLink
      to="/blog"
      class="text-sm mb-4 inline-block"
      icon="mdi:arrow-left"
    >
      Blog
    </SLink>
    <h1
      v-if="page"
      class="text-3xl font-bold mb-2"
    >
      {{ page.title }}
    </h1>
    <p
      v-if="page && page.date"
      class="text-sm text-muted mb-4"
    >
      {{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}
    </p>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </div>
</template>
