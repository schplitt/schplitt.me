<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => {
  return queryCollection('blog').all()
})

useSeoMeta({
  title: 'Blog',
  description: 'A personal blog by schplitt',
})
</script>

<template>
  <div>
    <UTimeline
      v-if="posts && posts.length > 0"
      orientation="vertical"
      size="md"
      :items="posts"
    >
      <template #title="{ item }">
        <BlogPost
          :title="item.title"
          :description="item.description"
          :tags="item.tags"
          :to="item.path"
        />
      </template>
      <template #description>
        <div />
      </template>
    </UTimeline>

    <div
      v-else
      class="opacity-50 text-center py-8"
    >
      Seems like I didn't write anything yet.
      <br>
      Check back later.
    </div>
  </div>
</template>
