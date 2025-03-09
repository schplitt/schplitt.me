<script setup lang="ts">

const { data: page } = await useAsyncData("blogs", () => {
    return queryCollection('posts').all()
})

watchEffect(() => {
    console.log(page.value)
})

useSeoMeta({
    title: "schplitt.me - Blog",
    description: "A personal blog by schplitt"
})
</script>

<template>
    <div v-for="post in page!">
        <SLink :to="post.path" samePage>
            <span>- {{ post.title }}</span>
        </SLink>
    </div>
    <div v-if="page && page.length === 0" class="opacity-50">
        Seems like i didn't do anything until now.
        <br>
        Check back later.
    </div>
</template>
