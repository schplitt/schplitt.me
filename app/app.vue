<template>
  <div class="flex flex-col min-h-dvh">
    <header class="fixed top-0 left-0 w-full bg-white z-50 px-4 py-3">
      <div class="relative w-full">
        <!-- Absolutely positioned site title at the left -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 font-bold invisible md:visible">
          schplitt.me
        </div>

        <!-- Centered navigation -->
        <nav class="w-full flex justify-center">
          <ul class="flex gap-4">
            <li>
              <SLink to="/">Home</SLink>
            </li>
            <li>
              <SLink>Blog</SLink>
            </li>

          </ul>
        </nav>
      </div>
    </header>

    <!-- Add padding to avoid content being hidden under the header -->
    <main class="flex-grow pt-16 w-full h-0">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="css">
* {
  font-family: "Space Mono", monospace;
}

html,
body,
#__nuxt {
  @apply w-dvw h-dvh;
}
</style>