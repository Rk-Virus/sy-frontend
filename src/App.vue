<script setup lang="ts">
import { computed } from 'vue';
import HomeLayout from './layout/HomeLayout.vue';
import { useAuthStore } from './stores/authStore';
import AuthLayout from './layout/AuthLayout.vue';

const authStore = useAuthStore();
// use computed to derive a boolean that updates when the store changes
const isAuth = computed(() => !!authStore.isAuthenticated);
</script>

<template>
  <div v-if="isAuth">
    <HomeLayout />
  </div>
  <div v-else>
    <AuthLayout />
  </div>
</template>

<style scoped></style>
