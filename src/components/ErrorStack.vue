<script setup lang="ts">
interface Error {
  title: string;
  body: string;
}
defineProps<{
  errors: Error[];
  remove: Function;
}>();
</script>

<script lang="ts">
export default {
  name: "ErrorStack",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
  <div>
    <div v-for="(error, index) in errors" :key="index">
      <ErrorHandle
        :heading="error.title"
        :error="error.body  "
        :action="remove"
      />
    </div>
  </div>
</template>
