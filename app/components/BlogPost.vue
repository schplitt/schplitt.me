<script setup lang="ts">
type Props = {
  title: string
  description?: string
  tags?: string[]
  to: string
}

defineProps<Props>()
</script>

<template>
  <UPageCard
    :title="title"
    :description="description"
    :to="to"
    variant="outline"
  >
    <template
      v-if="tags && tags.length > 0"
      #footer
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          variant="soft"
          size="sm"
          color="neutral"
        />
      </div>
    </template>
  </UPageCard>
</template>
