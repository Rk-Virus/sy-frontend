<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import TheTable from '~/components/TheTable.vue';
import { fetchOrganizations } from '~/service/api';


const organizations = ref([]);
const isLoading = ref(false);
const refetchOrgs = async () => {
};

setTimeout(() => {
  console.log(organizations);
}, 5000);



let showOrgModal = ref(false);
const showAddOrg = () => {
  if (showOrgModal.value === true) {
    showOrgModal.value = false;
  } else {
    showOrgModal.value = true;
  }
}

let selectedOrg = ref(null);
let showEditOrgModal = ref(false);
const showEditOrg = (orgId) => {
  if (showEditOrgModal.value === true) {
    showEditOrgModal.value = false;
  } else {
    console.log(orgId);
    
    selectedOrg.value = organizations.value.find((org) => org.id === orgId.id);
    showEditOrgModal.value = true;
  }
}

const closeEditModal = () => {
  showEditOrgModal.value = false;
  showOrgModal.value = false;
};

const router = useRouter();

const goBack = () => {
  router.back();
};

</script>
<script lang="ts">
export default {
  name: "organization",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<template>
  <div>
    <ToolBar heading="Organization">
      <div class="flex gap-2 overflow-x-auto scrollbar-hidden">
        <button @click="showAddOrg"
          class="py-1 pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zm11-2h-2v3h-3v2h3v3h2v-3h3V9h-3z"></path></svg>
          Add Organization</button>
          <button @click="goBack" type="button"
          class="py-1 pr-2 md:pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p class="hidden sm:inline">Back</p>
        </button>
        <EditOrganizationModal v-if="showOrgModal" @refetch-org="refetchOrgs" @close="closeEditModal" />
        <!-- {{ selectedOrganization }} -->
      </div>
    </ToolBar>
    <!-- <div class="flex flex-row-reverse px-10 py-6">
      <button @click="showAddOrg"
        class="border border-black px-4 py-2 rounded-lg text-primary bg-white hover:text-black focus:text-black">Add
        Organization</button>

    </div> -->
    <div>
      <div class="p-4">
        <TheTable v-if="organizations" :data="organizations" :columns="[
          'name',
          'address',
          'panelCount',
          'plantCapacity',
          'plantCapacityUnit',
        ]" :actions="['view']" :on-action="[
              () => {
                // print('view');
              },
            ]" :loading="isLoading" :blocks="[]" @selected=""
          @clicked="(orgId) => showEditOrg(orgId)" />
      </div>
    </div>
    <EditOrganizationModal v-if="showEditOrgModal" :organization="selectedOrg" @refetch-org="refetchOrgs" @close="closeEditModal" />

  </div>
</template>
<style>
  .scrollbar-hidden::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }

  .scrollbar-hidden {
    -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
  }
</style>
