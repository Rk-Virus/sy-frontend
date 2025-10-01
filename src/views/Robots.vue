<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, ref, watch, type Ref } from "vue";
// import { useQuery, useMutation } from "@tanstack/vue-query";
import {
  sendRestartCommand,
  sendStartCommand,
  sendStopCommand,
  fetchBlocks,
  getLatestUpdate,
} from "../service/api";
import useNotifyStore from "../stores/notifyStore";
import { useRobotStore } from "../stores/robotStore";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useAnalyticsStore } from "../stores/analyticsStore";
import { useRouter } from "vue-router";

// import type { Robot } from "../models";
// import RobotDetails from "../components/RobotDetails.vue";
const {selectedOrganization} = storeToRefs(useAuthStore());
const analyticsStore = useAnalyticsStore();
const { getRobots } = useRobotStore();
const { realTimeAnalytics } = storeToRefs(analyticsStore);
const { removedAnalytics } = analyticsStore;

const { setAlert } = useNotifyStore();

watch(realTimeAnalytics.value, (value: any) => {
  console.log(value, "analytics");
});

const blocks: Ref<any[]> = ref([]);
const refetchBlocks = async () => {
  if (!selectedOrganization.value) return;
  try {
    const data = await fetchBlocks(selectedOrganization.value);
    blocks.value = data;
  } catch (error) {
    console.error("Error fetching blocks:", error);
  }
};

const latest_Update: Ref<any[]> = ref([]);
const refetchLatestUpdate = async () => {
  if (!selectedOrganization.value) return;
  try {
    const data = await getLatestUpdate(selectedOrganization.value);
    latest_Update.value = data;
  } catch (error) {
    console.error("Error fetching latest update:", error);
  }
};

const robots: Ref<any[]> = ref([]);
const isLoading = ref(false);
const refetchRobot = async () => {
  if (!selectedOrganization.value) return;
  isLoading.value = true;
  try {
    const data = await getRobots(selectedOrganization.value);
    // removedAnalytics();
    robots.value = data;
    refetchBlocks();
    refetchLatestUpdate();
  } catch (error) {
    console.error("Error fetching robots:", error);
  } finally {
    isLoading.value = false;
  }
};


watch(selectedOrganization, ()=>{
  // robots.value = [];
  refetchRobot();
  // refetchLatestUpdate();
})

const print = (variable: string) => {
  console.log("print", variable);
};

const router = useRouter();

const goBack = () => {
  router.back();
};
const onchange = (robot: any) => {
  router.push(`/robot/${encodeURIComponent(robot.id)}`);
  console.log(robot.id);
};

const selectedRobots: Ref<string[]> = ref([]);

const onrobotselected = (robotIds: string[]) => {
  if (!robots.value) return;
  const robotSelected = robots.value.filter((robot: Robot) => {
    return robotIds.includes(robot.id);
  });
  const robotSelectedIds: string[] =
    robotSelected.map((robot: Robot) => robot.id) ?? [];

  selectedRobots.value = robotSelectedIds;
  
};

// const { mutate: mutateStart, isLoading: loadingStart } = useMutation(
//   sendStartCommand,
//   {
//     onSuccess: (e) => {
//       console.log("Robot started :", e);
//       refetchRobot();
//       // refetch();
//       // refetchMonitoringBot();
//     },
//     onError: (err: any) => {
//       console.error('Error starting robot:', err);
//       refetchRobot();
//     }
//   }
// );

// watch(loadingStart, async (newVal) => {
//   if (newVal) {
//     setAlert("Sending Start Command");
//     refetchRobot();
//     console.log("robots: ", selectedRobots.value);
//   }
//   else setTimeout(() => setAlert(null), 1000);
// });

// const { mutate: mutateStop, isLoading: loadingStop } = useMutation(
//   sendStopCommand,
//   {
//     onSuccess: (e) => {
//       refetchRobot();
//       // refetch();
//       // refetchMonitoringBot();
//     },
//   }
// );

// watch(loadingStop, async (newVal) => {
//   if (newVal) {
//     setAlert("Sending Stop Command");
//     refetchRobot();
//   }
//   else setTimeout(() => setAlert(null), 1000);
// });

// const { mutate: mutateRestart, isLoading: loadingRestart } = useMutation(
//   sendRestartCommand,
//   {
//     onSuccess: (e) => {
//       console.log(e);

//       // refetch();
//       // refetchMonitoringBot();
//     },
//   }
// );

// watch(loadingRestart, async (newVal) => {
//   if (newVal) setAlert("Sending Restart Command");
//   else setTimeout(() => setAlert(null), 1000);
// });

// const realTimeRobot = computed(() => {
//   console.log(robots.value);

//   if (!robots.value) return;
//   return robots.value?.map((robot: Robot) => {
//     const analyticList = realTimeAnalytics.value.filter(
//       (analytic) => analytic.robot_id === robot.id
//     );
//     const analytic = analyticList[analyticList.length - 1];
//     console.log(analytic, "analytic");
//     return {
//       ...robot,
//       start_timings: robot.start_timings
//         .map((time) => {
//           if (time !== -1) {
//             return String(time)
//               .slice(0, 2)
//               .concat(":")
//               .concat(String(time).slice(2, 4));
//           } else {
//             return "N/A";
//           }
//         })
//         .join(", "),

//       robot: robot.name,
//       last_updated: analytic?.updated_at
//         ? new Date(analytic?.updated_at).toLocaleTimeString()
//         : "N/A",
//       is_active: analytic?.state ? true : false,
//       state: analytic?.state ?? "N/A",
//       battery: analytic?.battery_percentage
//         ? analytic?.battery_percentage + "%"
//         : "N/A",
//       block:
//         blocks.value?.find(({ id }) => id == robot.blockId)?.name ?? "none",
//     };
//   });
// });

const showEditRobotModal = ref(false);
const showAddRobotModal = ref(false);
const showEditRobot = () => {
  showEditRobotModal.value = !showEditRobotModal.value;
}
// const showAddRobot = () => {
//   showAddRobotModal.value = !showAddRobotModal.value;
// }
const closeEditModal = () => {
  showEditRobotModal.value = false;
};
const closeAddModal = () => {
  showAddRobotModal.value = false;
};

// const robotData = computed(() => {
//   if(!latestUpdate.value){
//     return robots.value;
//   }
//   if (!robots.value || !latestUpdate.value) return [];
//   const updateMap = new Map(
//     latestUpdate.value.map(update => [update?.robot_id, new Date(update?.updatedAt).toLocaleString() ?? 'N/A'])
//   );
//   return robots.value.map(robot => ({
//     ...robot,
//     latest_update: updateMap.get(robot?.id) ?? 'N/A',
//   }));
// });

const robotData = computed(() =>
      robots.value?.map(robot => ({
        id: robot.id,
        name: robot.name,
        // drive_speed: robot.drive_speed,
        // brush_speed: robot.brush_speed,
        brush_drive_speed: `${robot.brush_speed}, ${robot.drive_speed}`,
        status: robot.status ?? 'Offline',
        latest_Update: robot.latest_Update ?? 'N/A', 
      })) || []
    );

const selectedRobotId = ref('');
let showModal = ref(false);
const storeRobotId = (robotId: any) => {
  selectedRobotId.value = robotId;
  showModal.value = !showModal.value;
  // console.log('Selected Robot ID in the table:', selectedRobotId.value);
};
</script>

<script lang="ts">
export default {
  name: "RobotsPage",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
  <p>Robot Page content</p>
  <div class="w-full h-full">
    <RobotDetails v-if="showModal" :robot-id="selectedRobotId" @data-refetch="() => {
      refetchRobot();
    }
      " />
    <RobotEdit v-if="showEditRobotModal" :robotId="selectedRobots[0]" @close="closeEditModal" @data-refetch="() => {refetchRobot();}"/>
    <ToolBar heading="Robots">
      <div class="flex gap-2 overflow-x-auto scrollbar-hidden">
        <div class="flex gap-2 group">
        <WarningDialog :key="`start${selectedRobots}`" heading="Start Robots" :body="`Are you sure you want to
              start ${selectedRobots.length} together?`" id="startMult" :disable="!(selectedRobots && selectedRobots?.length > 0)"
          :robots="selectedRobots" @accept="() => {
            mutateStart(selectedRobots);
          }
            ">
          <span
            class="group inline-flex gap-1 items-center overflow-hidden rounded-md border border-e h-8 px-4 py-2 text-sm/none bg-gray-50"
            :class="!(selectedRobots && selectedRobots?.length > 0)
              ? `border-e h-8 px-4 py-2.3 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700`
              : 'border-e h-8 px-4 py-2.3 text-sm/none text-gray-600 bg-white hover:text-white bg-blue:700 hover:bg-gray-50 hover:bg-green:900 hover:text-white'
              ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Start ({{ selectedRobots.length }})
          </span>
        </WarningDialog>
        <WarningDialog :key="`stop${selectedRobots}`" heading="Stop Robots" :body="`Are you sure you want to
              stop ${selectedRobots.length} together?`" id="stopMult" :disable="!(selectedRobots && selectedRobots?.length > 0)"
          :robots="selectedRobots" @accept="() => {
            mutateStop(selectedRobots);
          }
            ">
          <span
            class=" inline-flex gap-1 items-center overflow-hidden rounded-md border hover:bg-100 border-e h-8 px-4 py-2 text-sm/none text-gray-600 bg-gray-50"
            :class="!(selectedRobots && selectedRobots?.length > 0)
              ? `border-e h-8 px-4 py-2.3 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700`
              : 'border-e h-8 px-4 py-2.3 text-sm/none text-gray-600 bg-white hover:text-white bg-blue:700 hover:bg-gray-50 hover:bg-red:700 hover:text-white'
              ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
            Stop ({{ selectedRobots.length }})
          </span>
        </WarningDialog>
        <WarningDialog :key="`restart${selectedRobots}`" heading="Stop Restart" :body="`Are you sure you want to
              restart ${selectedRobots.length} together?`" id="restartMult" :disable="!(selectedRobots && selectedRobots?.length > 0)"
          :robots="selectedRobots" @accept="() => {
            mutateRestart(selectedRobots);
          }
            ">
          <span
            class="inline-flex gap-1 items-center overflow-hidden rounded-md border hover:bg-100 border-e h-8 px-4 py-2 text-sm/none text-gray-600 bg-gray-50"
            :class="!(selectedRobots && selectedRobots?.length > 0)
              ? `border-e h-8 px-4 py-2.3 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700`
              : 'border-e h-8 px-4 py-2.3 text-sm/none text-gray-600 bg-white hover:text-white bg-blue:700 hover:bg-gray-50 hover:bg-red:700 hover:text-white'
              "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Restart ({{ selectedRobots.length }})
          </span>
        </WarningDialog>
        <div class="relative">
          <div class="inline-flex items-center overflow-hidden h-8 rounded-md border bg-white">
            <RobotUpdateForm :disable="!(selectedRobots.length > 0)" :robots="selectedRobots" @data-refetch="() => {
            }
              " />
          </div>
          
        </div>
      </div>
      <RobotForm :disable="false" @data-refetch="() => {
        refetchRobot();
        closeAddModal();
      }
        "  @close="closeAddModal"/>
        <button v-if="selectedRobots.length < 2 && selectedRobots.length > 0" @click="showEditRobot" class="py-1 pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>Edit Robot</button>
        <button @click="goBack" type="button"
          class="py-1 pr-2 md:pr-6 pl-2 inline-flex justify-start-l items-center gap-x-2 text-sm font-medium rounded-lg border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p class="hidden sm:inline">Back</p>
        </button>
      </div>
    </ToolBar>
        <div class="flex flex-col h-full gap-4 p-4 space-evenly">
          <div v-if="robots" class="h-full">
            <TheTable v-if="robots" :data="robots" :columns="[
              'name',
              // 'drive_speed',
              // 'brush_speed',
              'brush_drive_speed',
              'status',
              'latest_Update'
            ]" :actions="['view']" :on-action="[
              () => {
                print('view');
              },
            ]" :loading="isLoading" :blocks="blocks?.blocks.map(({ name }) => name) ?? []" @selected="onrobotselected"
              @clicked="onchange" @name-clicked="storeRobotId" :hasNameClick="true" />
          </div>
        </div>
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
