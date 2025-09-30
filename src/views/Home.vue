<script setup lang="ts">
import { ref } from 'vue';
import AssignOrg from '../components/AssignOrg.vue';
import Dropdown from '../components/Dropdown.vue';
import Hardware from '../components/Hardware.vue';
import Settings from '../components/Settings.vue';
import TheCounter from '../components/TheCounter.vue';
import TheInput from '../components/TheInput.vue';
import ToolBar from '../components/ToolBar.vue';
// import ErrorStack from '../components/ErrorStack.vue';

const text = ref('Hello, World!');
</script>

<template>
  <h1>Home Page</h1>
  <AssignOrg :onClose="()=>{}" />
  <Dropdown :list="['item1', 'item2']" />
  <!-- <ErrorStack :remove="()=>{}" /> -->
   <Hardware />
   <Settings />
   <!-- <TheCounter :initial="5" /> -->
   <TheInput v-model="text" placeholder="Type something..." />
   <ToolBar heading="My Toolbar" />
</template>