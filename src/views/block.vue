<script setup lang="ts">
import { ref, type Ref } from "vue";
// import { fetchBlocks } from "../service/api";

// import { useRobotStore } from "~/stores/robotStore";
// import { storeToRefs } from "pinia";
// import BlockForm from "~/components/BlockForm.vue";
// import type { Block } from "~/models";
import { useRouter } from "vue-router";
// import BlockEdit from "~/components/BlockEdit.vue";

// const analyticsStore = useAnalyticsStore();
// const { realTimeAnalytics } = storeToRefs(analyticsStore);

// watch(realTimeAnalytics.value, (value) => {
//   console.log(value, "analytics");
// });
// const queryClient = new QueryClient();

// const menu: Ref<boolean> = ref(false);
// const toggleMenu = () => {
//   menu.value = !menu.value;
// };

// State variables for pagination
const currentPage = ref(1);
const limit = ref(8);

// const { selectedOrganization } = storeToRefs(useAuthStore());

const blocks = ref({
  blocks: [],
  meta: {
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 8,
    totalPages: 0,
    currentPage: 1,
  },
});
const isLoading = ref(false);
const refetchBlocks = async () => {};

// watch([selectedOrganization, currentPage, limit], () => {
//   refetchBlocks();
// })

// Pagination handlers
const nextPage = () => {
  currentPage.value += 1;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

const router = useRouter();

const goBack = () => {
  router.back();
};

// let showModal = ref(false);
// const selectedRobotId = ref('');
// const onchange = (robot) => {
//   // router.push(`/robot/${encodeURIComponent(id)}`);
//   showModal.value = !showModal.value;
//   selectedRobotId.value = robot.id;
//   console.log(robot.id);
// };

// const blockStore = useBlockStore();
// const { addBlocks } = blockStore;

// watch(blocks, (newVal, oldVal) => {
//   console.log("newVal", newVal);
//   console.log("oldVal", oldVal);
//   addBlocks(newVal);
// });

const selectedBlocks: Ref<string[]> = ref(["box1"]);
const onBlockSelected = (blockIds: string[]) => {
  selectedBlocks.value = blockIds;

  // const selectedRobots: Ref<string[]> = ref([]);

  // const blockSelected = blocks.value?.filter((block: Block) => {
  //   return blockIds.includes(block.id);
  // });
  // const blockSelectedIds: string[] =
  //   blockSelected.map((block: Block) => block.id) ?? [];

  // selectedBlocks.value = blockSelectedIds;
  // const deviceEUIs: string[] =
  //   blockSelected?.map((robot) => robot.deviceEUI) ?? [];

  // selectedRobots.value = deviceEUIs;
};

// console.log(selectedBlocks);

let showBlockModal = ref(false);
const showBlock = () => {
  if (showBlockModal.value === true) {
    showBlockModal.value = false;
  } else {
    showBlockModal.value = true;
  }
};

const closeBlockModal = () => {
  showBlockModal.value = false;
};

const showEditBlockModal = ref(false);
const selectedBlock = ref("");
const showEditBlock = (blockId: string) => {
  if (showEditBlockModal.value === true) {
    showEditBlockModal.value = false;
  } else {
    console.log(blockId);
    showEditBlockModal.value = true;
    // selectedBlock.value = blocks.value?.blocks.find((block) => block.id === blockId).id;
    console.log(showEditBlockModal.value);
    console.log(selectedBlock.value);
  }
};
// console.log(selectedBlock);

const closeEditModal = () => {
  showEditBlockModal.value = false;
};

// script setup logic
</script>

<script lang="ts">
export default {
  name: "BlockPage",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
  <div class="w-full h-full">
    <div>block page</div>
    <ToolBar heading="Block">
      <div class="flex gap-2 overflow-x-auto scrollbar-hidden">
        <BlockForm
          @close="closeBlockModal"
          @data-refetch="
            () => {
              refetchBlocks();
            }
          "
        />
        <button
          v-if="selectedBlocks.length < 2 && selectedBlocks.length > 0"
          @click="showEditBlock"
          class="py-1 pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Edit Block
        </button>
        <button
          @click="goBack"
          type="button"
          class="py-1 pr-2 md:pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <p class="hidden sm:inline">Back</p>
        </button>
      </div>
    </ToolBar>
    <div class="h-full">
      <div class="h-full">
        <div class="flex flex-col h-full gap-4 px-4 py-0 space-evenly">
          <!-- Pagination -->
          <nav class="flex justify-center gap-x-2" aria-label="Pagination">
            <button
              @click="prevPage"
              :disabled="currentPage <= 1"
              type="button"
              class="min-h-[38px] min-w-[38px] py-1 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              aria-label="Previous"
            >
              <svg
                class="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              <span class="sr-only">Previous</span>
            </button>
            <div class="flex items-center gap-x-1">
              <button
                v-for="page in blocks?.meta?.totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'min-h-[38px] min-w-[38px] flex justify-center items-center py-1 px-2 text-sm rounded-lg focus:outline-none',
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-200 border-gray-200 text-gray-800 hover:bg-gray-300',
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="nextPage"
              :disabled="currentPage >= blocks?.meta?.totalPages"
              type="button"
              class="min-h-[38px] min-w-[38px] py-1 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              aria-label="Next"
            >
              <span class="sr-only">Next</span>
              <svg
                class="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </nav>
          <!-- End Pagination -->
          <div v-if="blocks" class="h-full">
            <TheTable
              v-if="blocks"
              :data="blocks?.blocks"
              :columns="['name', 'address', 'is_active', 'updated_at']"
              :actions="['view']"
              :on-action="[
                () => {
                  // print('view');
                },
              ]"
              :loading="isLoading"
              :blocks="[]"
              @selected=""
              @clicked="(block) => showEditBlock(block.id)"
            />
          </div>
        </div>
        <BlockEdit
          v-if="showEditBlockModal"
          :blockId="selectedBlock"
          @refetch-blocks="refetchBlocks"
          @close="closeEditModal"
        />
      </div>
    </div>
  </div>
</template>
<style>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
  /* Hide scrollbar for Chrome, Safari, and Opera */
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  /* Hide scrollbar for Internet Explorer and Edge */
  scrollbar-width: none;
  /* Hide scrollbar for Firefox */
}
</style>
