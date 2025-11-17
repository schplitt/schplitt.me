<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()
const { data: page } = await useAsyncData(route.path, async () => {
  return await queryCollection('blog').path(route.path).first()
})

if (!page.value) {
  await navigateTo('/')
}

const baseUrl = config.public.siteUrl || 'https://schplitt.me'

const tweetText = computed(() => {
  if (!page.value) return ''
  const url = `${baseUrl}${page.value.path}`
  return `Reading @schplitt's ${url}\n\nI think...`
})

const tweetUrl = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText.value)}`)
</script>

<template>
  <div class="flex flex-col gap-12">
    <div>
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
        class="mb-8"
      />
    </div>

    <!-- Comment section -->
    <div>
      <p class="text-sm text-muted mb-3">
        Comment on:
      </p>
      <div class="flex gap-3 mb-6">
        <UButton
          :to="tweetUrl"
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="soft"
          size="sm"
          icon="i-simple-icons-x"
        />
      </div>

      <SLink
        to="/blog"
        class="text-sm inline-block"
        icon="mdi:arrow-left"
      >
        Blog
      </SLink>
    </div>
  </div>
</template>
