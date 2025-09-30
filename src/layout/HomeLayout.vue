<script setup lang="ts">
import SideBar from '../components/SideBar.vue';


</script>

<template>
    <div class="flex h-screen">
    <SideBar />

    <router-view />
  </div>
</template>