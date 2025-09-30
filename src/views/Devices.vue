<script setup lang="ts">
// import { fetchIcrs } from "../service/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
interface DataPoint {
  id: string;
  type: string;
}
const router = useRouter();

const goBack = () => {
  router.back();
};

const isLoading = ref(false);
const icrs = ref([]);
const refetchIcrs = () => {};

const onchange = ({ id, type }: DataPoint): void => {
  router.push(`/device/${encodeURIComponent(id)}`);
};
// script setup logic
</script>

<script lang="ts">
export default {
  name: "DevicesPage",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
  <div class="w-full h-full">
    <ToolBar heading="Devices">
      <div class="flex gap-2">
        <IcrForm
          @data-refetch="
            () => {
              refetchIcrs();
            }
          "
        />
        <button
          class="inline-flex border-2 rounded-md border-black items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-4 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="goBack"
        >
          Back
        </button>
        <!-- <BackButton @action="() => goBack"> Back</BackButton> -->
      </div>
    </ToolBar>
    <div class="h-full overflow-y-hidden">
      <div class="h-full">
        <TheTabs :headings="['devices', 'active', 'warning', 'WIFI', 'LORA']">
          <template #devices>
            <div class="h-full">
              <TheTable
                :columns="['name', 'is_active']"
                :actions="['view']"
                @clicked="onchange"
                :onAction="[() => {}]"
              />
            </div>
          </template>
          <template #active>
            <button
              id="profile-tab"
              class="inline-block p-4 uppercase rounded-t-lg"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              active
            </button>
          </template>
          <template #warning>
            <button
              id="profile-tab"
              class="inline-block p-4 uppercase rounded-t-lg"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              warning
            </button>
          </template>
        </TheTabs>
      </div>
    </div>
  </div>
</template>
