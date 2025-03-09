<template>
  <div class="flex flex-col min-h-dvh">
    <header class="w-full px-4 py-2">
      <div class="relative w-full">
        <!-- Absolutely positioned site title at the left -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 font-bold invisible md:visible">
          schplitt.me
        </div>

        <!-- Centered navigation -->
        <nav class="w-full flex justify-center">
          <ul class="flex gap-4">
            <li>
              <SLink to="/" same-page>
                Home
              </SLink>
            </li>
            <li>
              <SLink to="/blog" same-page>
                Blog
              </SLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Add padding to avoid content being hidden under the header -->
    <main class="mx-auto max-w-[650px] px-8 min-h-[calc(100dvh-81px)]">
      <NuxtPage />
    </main>

    <footer class="w-full px-4 py-2 opacity-50">
      <div class="flex justify-center items-center font-light">
        2025-Present ©Schplitt
      </div>
    </footer>
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
