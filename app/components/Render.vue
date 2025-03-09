<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: Record<string, any>;
}>();
</script>

<template>
    <ContentRenderer class="md" :value="value" />
</template>