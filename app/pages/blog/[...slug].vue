<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()
const { data: page } = await useAsyncData(route.path, async () => {
  return await queryCollection('blog').path(route.path).first()
})

const baseUrl = config.public.siteUrl || 'https://schplitt.me'

const tweetText = computed(() => {
  if (!page.value) return ''
  const url = `${baseUrl}${page.value.path}`
  return `Reading @schplitt's ${url}\n\nI think...`
})

const tweetUrl = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText.value)}`)

// TODO: currently seems to have a rendering issue
// https://github.com/nuxt/content/issues/3534
</script>

<template>
  <div class="flex flex-col gap-12">
    <template v-if="page">
      <div>
        <SLink
          to="/blog"
          class="text-sm mb-4 inline-block"
          icon="mdi:arrow-left"
        >
          Blog
        </SLink>
        <h1
          class="text-3xl font-bold mb-2"
        >
          {{ page.title }}
        </h1>
        <p
          v-if="page && page.date"
          class="text-sm text-muted mb-4"
        >
          {{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric',
                                                                 month: 'long',
                                                                 day: 'numeric' }) }}
        </p>
        <ContentRenderer
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
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center">
        I think you didn't want to go here, eh?
        <SLink
          to="/blog"
          icon="mdi:arrow-left"
        >
          Go back to Blog
        </SLink>
      </div>
    </template>
  </div>
</template>
