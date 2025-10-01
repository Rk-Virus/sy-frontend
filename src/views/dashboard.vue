<script setup lang="ts">
// import { fetchdashboardData } from "~/service/api";
import { useAnalyticsStore } from "../stores/analyticsStore";
// import eventEmitter from "~/service/eventEmitter";
import useNotifyStore from "../stores/notifyStore";
// import "vue3-circle-progress/dist/circle-progress.css";
// import CircleProgress from "vue3-circle-progress";
// import { CircleProgressBar } from 'circle-progress.vue'; // url -> https://github.com/mkolsv/circle-progress.vue
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
// import Analytics2 from "~/components/Screens/Analytics2.vue";
import { useRouter } from "vue-router";
// import SendingScreen from "~/components/Screens/SendingScreen.vue";
// import Analytics from "~/components/Screens/Analytics.vue";
// import SendingScreen3 from "~/components/Screens/SendingScreen3.vue";
// import DailyAnalytics from "~/components/Screens/DailyAnalytics.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const router = useRouter();
const authStore = useAuthStore();
const notifyStore = useNotifyStore();
const analyticsStore = useAnalyticsStore();

const { setStart, setAlert, setError, setSuccess } = (notifyStore);
// onMounted(() => {
//   eventEmitter.on("analytics", (data) => {
//     console.log("analytics", data);
//   });  
//   setStart("initilize App");
// });
const { selectedOrganization } = storeToRefs(authStore);

// onUnmounted(() => {
//   console.log("Closing emitter", "unmounted");
//   eventEmitter.off("analytics");
// });

// const totalRobots = computed(() => dashboardData.value?.robotCount || 0);
// const totalPanelsCleaned = computed(() => dashboardData.value?.totalPanelsCleaned || 0);
// const totalPanelsCount = computed(() => dashboardData.value?.panelCount || 0);
// const totalPanelCount = computed(() => org.value?.panelCount || 0);

// Calculate the percentage of panels cleaned
// const panelCleanedPercentageFake = computed(() => {
//   if (totalPanelsCount.value === 0) return 0; // Avoid division by zero
//   return (totalPanelsCleaned.value / totalPanelsCount.value) * 100;
// });

// watch(selectedOrganization, () => {
//   // refetchRobots();
//   // refetchdashboardData();
// });

const { getRealTimeAnalytics } = (analyticsStore);

const dailyRunAnalytics = ref([]);
const isLoading = ref(false);
const weeklyRunAnalytics = ref([]);

// const dailyRunAnalytics = computed(() => {
//   return weeklyRunAnalytics.value?.filter(item => {
//     const now = Date.now();
//     const minutesIn24Hours = 1440 * 60 * 1000; 

//     const updatedAtTime = new Date(item.updatedAt).getTime();
//     return (now - updatedAtTime) <= minutesIn24Hours; 
//   }) || [];
// });


// watch(selectedOrganization, () => {
//   // refetchDailyRunAnalytics();
//   refetchWeeklyRunAnalytics();
// });

// Errror
// const robotsError = computed(() => {
//   const error = dailyRunAnalytics.value?.filter(analytic => analytic.type === 'running_error').map(analytic => analytic.robot_id);
//   return new Set(error).size;
// });

// Cleaned Percentage
// const robotsCompletedRun = computed(() => {
//   const completedRobotIds = dailyRunAnalytics.value?.filter(analytic => analytic.type === 'run_completed').map(analytic => analytic.robot_id);
//   return new Set(completedRobotIds).size;
// });
// const panelCleanedPercentage = computed(() => {
//   if (totalRobots.value === 0) return 0;
//   return (robotsCompletedRun.value / totalRobots.value) * 100;
// });

const { getNewAnalytics } = analyticsStore;

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const weekRunData = computed(() => {
  const arrayRunWeek = new Array(7).fill(0);
  weeklyRunAnalytics.value?.forEach((analytic: any, index: any) => {
    if (analytic?.type === "start_forced")
      return (arrayRunWeek[new Date(analytic.updatedAt).getDay()] += 1);
  });
  return arrayRunWeek;
});

const totalWeekRun = computed(() => {
  let total = 0;
  if (!weekRunData.value) return total;
  weekRunData.value?.forEach((data) => (total += data));
  return total;
});

let selectedOption = ref('Last 7 days');

const dailyRobotRun = computed(() => {
  const labels: string[] = [];
  const data: number[] = [];
  let totalRunCount = 0;
  const startTimeMap = new Map();

  // dailyRunAnalytics.value?.forEach(analytic => {
  //   if (analytic.type === "start_forced") {
  //     const startTime = new Date(analytic.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  //     if (startTimeMap.has(startTime)) {
  //       startTimeMap.set(startTime, startTimeMap.get(startTime) + 1);
  //     } else {
  //       startTimeMap.set(startTime, 1);
  //     }
  //     totalRunCount++;
  //   }
  // });

  startTimeMap.forEach((count, time) => {
    labels.unshift(time); 
    data.unshift(count);  
  });

  return {
    labels,
    data,
    totalRunCount
  };
});

// const todayRun = computed(() => {
//   if (!robots.value) return 0;

//   const robotIds = robots.value?.map(({ id }) => id);
//   console.log(weekRunData.value, "weekRun", robotIds);
//   return weekRunData.value?.find((_, index) => index === new Date().getDay());
// });
</script>

<script lang="ts">
export default {
  name: "DashBoard",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
  Dashboard page
  <section class="h-[100%] overflow-y-scroll relative">
    <TheTabs :headings="[
      'overview',
      'Daily',
      'Weekly',
      // 'recieved', 'started', 'config_updated', 'battery_low', 'technical_issue', 'gsm', 'lora',
    ]">
      <template #overview>
        <main class="max-h-screen lg:pt-6 md:pt-6 xl:pt-6 pt-3 h-full relative bg-#fbf7ee">
          <div
            class="flex lg:flex-row md:flex-row xl:flex-row flex-col justify-center lg:gap-10 md:gap-10 xl:gap-10 gap-6">
            <div class="flex flex-col gap-4">
              <div class="flex lg:flex-row md:flex-row xl:flex-row flex-col lg:gap-10 md:gap-10 xl:gap-10 gap-6">
                <div
                  class="bg-orange-100 hover:bg-secondary hover:cursor-pointer lg:w-24vw md:w-24vw xl:w-24vw lg:h-37 xl:h-37 md:h-37 h-37 rounded-xl shadow-md">
                  <router-link to="/robots">
                    <div class="flex h-full items-center justify-between lg:px-6 md:px-6 xl:px-6 px-6">
                      <div class="">
                        <p class="text-md font-bold">Robots</p>
                        <!-- <h1 class="text-5xl mt-3">{{ totalRobots ?? '-' }}</h1> -->
                      </div>
                      <div class="flex justify-center items-center">
                        <img src="/robot.ico" class="w-32 hover:scale-105 duration-200" />
                      </div>
                    </div>
                  </router-link>
                </div>
                <div
                  class="bg-white hover:bg-gray-50 hover:cursor-pointer lg:w-24vw md:w-24vw xl:w-24vw lg:h-37 xl:h-37 md:h-37 h-37 rounded-xl shadow-md">
                  <router-link to="/block">
                    <div
                      class="flex lg:flex-row md:flex-row xl:flex-row flex-row-reverse h-full items-center justify-between px-6">
                      <div class="">
                        <p class="text-md font-bold">Panels</p>
                        <!-- <h1 class="text-5xl mt-3 text-#66b741">{{ totalPanelsCount ?? '-' }}</h1> -->
                      </div>
                      <div class="flex justify-center items-center">
                        <img src="/panel.ico" class="w-32 hover:scale-105 duration-200" />
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div
                class="bg-white lg:h-80 md:h-80 xl:h-80 h-80 lg:w-51vw md:w-51vw xl:w-51vw rounded-xl shadow-md mt-3">
                <div class="flex justify-between items-center px-5 p-3 rounded-t-xl">
                  <div class="xl:text-md lg:text-md md:text-md text-sm">
                    Weekly Run : {{ totalWeekRun }} {{ totalWeekRun > 1 ? 'Robots' : 'Robot' }}
                  </div>
                  <div class="text-xs mr-6">
                    <div class="flex gap-4">
                      <button class="" @click="() => selectedOption = 'Last 7 days'" :class="selectedOption === 'Last 7 days' ? 'text-blue-500' : 'text-gray-700'">Last 7 days</button>
                      <button @click="() => selectedOption = 'Last 24 hours'" :class="selectedOption === 'Last 24 hours' ? 'text-blue-500' : 'text-gray-700'">Last 24 hours</button>
                    </div>

                  </div>
                </div>
                <div v-if="selectedOption === 'Last 7 days'" class="h-[80%] w-[90%] mx-auto">
                  <Line :data="{
                    labels: week,
                    datasets: [
                      {
                        label: 'Robot Runs',
                        data: weekRunData,
                        // data: [14, 31, 22, 34, 53, 26, 36],
                        fill: true,
                        borderColor: 'blue',
                        tension: 0.3,
                        borderWidth: 2,
                      },
                    ],
                  }" :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1 / 1,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: {
                        beginAtZero: true,
                        grid: {
                          // drawOnChartArea: false
                        }
                      },
                      y: {
                        grid: {
                          drawOnChartArea: false
                        }
                      }
                    }
                  }" />
                </div>
                <div v-if="selectedOption === 'Last 24 hours'" class="h-[80%] w-[90%] mx-auto">
                  <Line :data="{
                    labels: dailyRobotRun?.labels,
                    datasets: [
                      {
                        label: 'Robot Runs',
                        // data: weekRunData,
                        data: dailyRobotRun?.data,
                        fill: true,
                        borderColor: 'blue',
                        tension: 0.3,
                        borderWidth: 2,
                      },
                    ],
                  }" :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1 / 1,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: {
                        beginAtZero: true,
                        grid: {
                          // drawOnChartArea: false
                        }
                      },
                      y: {
                        grid: {
                          drawOnChartArea: false
                        }
                      }
                    }
                  }" />
                </div>
              </div>
              <!-- <div v-if="loadWeeklyRunData"
                class="lg:h-80 md:h-80 xl:h-80 h-60 lg:w-51vw md:w-51vw xl:w-51vw rounded-xl shadow-md mt-3 bg-gray-200 animate-pulse duration-200">
              </div> -->
            </div>
            <div class="flex flex-col gap-4">
              <div class="lg:w-23vw md:w-23vw xl:w-23vw bg-#c1f2b0 h-79 rounded-xl shadow-md cursor-pointer">
                <div class="p-3 border-b-gray-100 flex px-5 justify-between bg-#c1f2b0 rounded-t-xl text-lg">
                  <h1>Panels Cleaned</h1>
                  <h1>{{ panelCleanedPercentage.toFixed(0) }}%</h1>
                </div>
                <div class="w-full h-[90%] flex justify-center items-center mt-[-20px]">
                  <CircleProgressBar :value="panelCleanedPercentage.toFixed(0)" :max="100" size="170" strokeWidth="8px"
                    colorFilled="#2eb400" animationDuration="1s" percentage rounded />
                </div>
              </div>
              <div class="flex gap-3 mb-4">
                <div class="bg-gray-50 mt-3 w-1/2 h-37 rounded-xl shadow-md hover:cursor-pointer">
                  <router-link to="/robots">
                    <div class="flex justify-between items-center p-3 hover:rounded-t-xl">
                      <p class="text-xl">Errors</p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-6 w-6 pl-[5px]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                    <div class="flex justify-between items-center mt-2">
                      <h1 class="text-5xl ml-5">{{ robotsError ?? '-' }}</h1>
                      <div>
                        <img src="/error.png" class="w-28 hover:scale-105 duration-100" />
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="bg-gray-50 mt-3 w-1/2 h-37 rounded-xl shadow-md hover:cursor-pointer">
                  <router-link to="/robots">
                    <div class="flex justify-between items-center p-3 hover:rounded-t-xl">
                      <p class="text-xl">Warning</p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-6 w-6 pl-[5px]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                    <div class="flex justify-around items-center mt-4">
                      <!-- <h1 class="text-5xl">{{ totalRobots ?? '-' }}</h1> -->
                      <div>
                        <img src="/warningimg.png" class="w-16 hover:scale-105 duration-100" />
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </template>
      <template #Daily>
        <DailyAnalytics />
      </template>
      <template #Weekly>
        <SendingScreen3 />
        <!-- <Analytics/> -->
      </template>
    </TheTabs>
  </section>
</template>

<style scoped>
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(10, 9, 9, 0);
  background-color: white;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: rgb(0, 0, 0);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border: 2px solid #555555;
}
</style>
