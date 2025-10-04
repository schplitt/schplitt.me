<script setup lang="ts">
const { icon = '' } = defineProps<{
  icon?: string
  to?: string
  text?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    :target="to?.startsWith('http') ? '_blank' : undefined"
    class="twp inline-flex items-center align-bottom gap-1 border-b border-dotted border-gray-300 hover:border-gray-600 transition-colors"
  >
    <Icon
      v-show="icon"
      :name="icon"
      class="inline-block align-text-bottom"
    />
    <span>
      <slot v-if="!text" />
      <template v-else>
        {{ text }}
      </template>
    </span>
  </NuxtLink>
</template>
