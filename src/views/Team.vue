<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// import AllUser from '~/components/AllUser.vue';
// import SelectedOrgUsers from '~/components/SelectedOrgUsers.vue';
// import TheTabs from '~/components/TheTabs.vue';
import { assignUserToOrganization, fetchAllUser, fetchOrganizations, fetchProfile } from '../service/api';
import { useAuthStore } from '../stores/authStore';

// State to handle modals and selected user
const showAddUserModal = ref(false);
const showAssignModal = ref(false);
const selectedUserId = ref<string | null>(null);
const selectedOrgs = ref<string[]>([]);
const { selectedOrganization, } = storeToRefs(useAuthStore());

// Fetch all users
const users = ref([{}]);
const usersLoading = ref(false);
const refetchUser = async () => {
  usersLoading.value = true;
  try {
    const data = await fetchAllUser();
    users.value = data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    usersLoading.value = false;
  }
};
console.log(users.value);

// fetch user profile
const user = ref({
    access_level: 1
});
const refetchProfile = async () => {
  try {
    const data = await fetchProfile();
    user.value = data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// Fetch all organizations
const organizations = ref<Array<{ id: string; name: string }>>([]);
const orgsLoading = ref(false);
const refetchOrganizations = async () => {
  orgsLoading.value = true;
  try {
    const data = await fetchOrganizations();
    organizations.value = data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
  } finally {
    orgsLoading.value = false;
  }
};

// Get selected organization details
const org = computed(() => {
  return organizations.value?.find(org => org.id === selectedOrganization.value) || null;
});

const dynamicSlotName = computed(() => {
  return (org.value?.name || 'OrgUser') + ' Team';
});


const activeTab = ref('All');
const tabHeadings = computed(() => {
  const headings = [`${org.value?.name ?? 'OrgUsers'} Team`];
  if (user.value?.access_level === 1) {
    headings.unshift('All');
    activeTab.value = 'All';
  }else{
    activeTab.value = dynamicSlotName.value
  }
  return headings;
});

const showAddUser = () => {
  showAddUserModal.value = !showAddUserModal.value;
};
const showAssignUserModal = ref(false);
const showAssignUser = () => {
  showAssignUserModal.value = !showAssignUserModal.value
}

const closeAddModal = () => {
  showAddUserModal.value = false;
};
const closeAssignModal = () => {
  showAssignUserModal.value = false;
}

// const openAssignModal = (userId: string) => {
//   selectedUserId.value = userId;
//   showAssignModal.value = true;
// };

// const handleAssign = () => {
//   if (selectedUserId.value && selectedOrgs.value.length > 0) {
//     selectedOrgs.value.forEach((orgId) => {
//       assignOrganizations({
//         userId: selectedUserId.value as string,
//         orgId: orgId,
//       });
//     });
//     showAssignModal.value = false;
//     selectedOrgs.value = [];
//   }
// };

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<script lang="ts">
export default {
  name: "team",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<template>
  <AssignUser v-if="showAssignUserModal" @close="() => closeAssignModal()" />
  <ToolBar heading="Team">
    <div class="flex gap-2 overflow-x-auto scrollbar-hidden">
      <button v-if="user?.access_level === 1" @click="showAddUser"
        class="py-1 pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
        Add User</button>
      <button v-if="user?.access_level < 3" @click="showAssignUser"
        class="py-1 pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z">
          </path>
          <path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"></path>
        </svg>
        Assign User</button>

        <button @click="goBack" type="button"
          class="py-1 pr-2 md:pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p class="hidden sm:inline">Back</p>
        </button>
      <AddUser v-if="showAddUserModal" @close="() => { closeAddModal(); refetchUser(); }" />
    </div>
  </ToolBar>
  <TheTabs v-model:active="activeTab" :headings="tabHeadings">
    <template #All>
      <AllUser />
    </template>

    <template v-slot:[dynamicSlotName]>
      <SelectedOrgUsers />
    </template>
  </TheTabs>

</template>
<style>
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hidden {
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }
</style>
