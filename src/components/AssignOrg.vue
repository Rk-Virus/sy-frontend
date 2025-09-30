<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
// import FixedModal from './FixedModal.vue';

const {onClose} = defineProps<{
    onClose: Function;
}>();



// Close modal
const closeModal = () => {
  onClose();
};

const isSubmitted: Ref<Boolean> = ref(false);

const isOpen = () => {
    isSubmitted.value = true;
};

</script>
<script lang="ts">
export default {
  name: "Org",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<template>
<FixedModal
    :issubmitted="isSubmitted"
    heading="Add Organization"
    button=""
    @open="isOpen"
  >
 hello
   
</FixedModal>
</template>