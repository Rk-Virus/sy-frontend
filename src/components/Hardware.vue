<script lang="ts">
export default {
  name: "HardwarePage",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup lang="ts">
// script setup logic
</script>

<template>
  <div class="w-full h-full bg-white">
    <section class="bg-white dark:bg-gray-900">
      <div
        class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6"
      >
        <dl
          class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white"
        >
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">1</dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">Server</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">1</dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">Gateway</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">1</dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">Person</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>
