<script setup lang="ts">
// import TheInput from './components/TheInput.vue';
import { ref } from 'vue';

const hello = ref('hello world');
</script>

<template>
    <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>

</style>
