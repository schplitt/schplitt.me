<script setup lang="ts">
defineProps<{
    value: Record<string, any>;
}>();
</script>

<template>
    <ContentRenderer class="md" :value="value" />
</template>