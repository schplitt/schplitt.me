<script setup lang="ts">
const { data: posts } = await useAsyncData('blogs', () => {
  return queryCollection('posts').all()
})

useSeoMeta({
  title: 'schplitt.me - Blog',
  description: 'A personal blog by schplitt',
})
</script>

<template>
  <div>
    <div
      v-for="post in posts!"
      :key="post.id"
    >
      <SLink
        :to="post.path"
        same-page
      >
        <span>- {{ post.title }}</span>
      </SLink>
    </div>
    <div
      v-if="posts && posts.length === 0"
      class="opacity-50"
    >
      Seems like I didn't write anything yet.
      <br>
      Check back later.
    </div>
  </div>
</template>
