<script lang="ts">
export default {
  name: "ToolBar",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup lang="ts">
defineProps<{
  heading: string;
}>();
</script>

<template>
  <div
    class="static flex items-center justify-between w-full p-3 pb-0 mx-auto whitespace-nowrap dark:bg-black"
  >
    <RouterLink class="px-2" :to="{ name: 'robots' }">
      <span
        class="self-center text-xl text-gray-800 font-semibold whitespace-nowrap dark:text-white"
        >{{ heading }}</span
      >
    </RouterLink>

    <slot></slot>
  </div>
</template>
