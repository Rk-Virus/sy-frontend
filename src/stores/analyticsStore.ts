import { defineStore } from "pinia";
// import AnalyticsWorker from "../workers/analytics?worker";
import { onMounted, ref, type Ref } from "vue";
import {
  fetchNewAnalytics,
  fetchNewSending,
  analyticsDataRobots,
  fetchAllAnalytics,
} from "../service/api";

// import emitter from "~/service/eventEmitter";
// import { RobotAnalytics } from "~/models";

// analytics = 101,
// started = 102,
// config_updated = 103,
// battery_low = 104,
// health = 105,
// technical_issue = 106,

export const useAnalyticsStore = defineStore("analytics", () => {
  //states
  // const analyticsWorker = new AnalyticsWorker();
  const analytics: Ref<any> = ref([]);
  const sending: Ref<any> = ref([]);
  const realTimeAnalytics: Ref<any> = ref([]);
  const realTimeSending: Ref<any> = ref([]);


  onMounted(() => {
    // analyticsWorker.postMessage({
    //   type: "init",
    //   payload: {
      //  // token: keycloak.idToken,
    //     applicationid: import.meta.env.VITE_APPLICATION_ID,
    //   },
  });

  // analyticsWorker.onmessage = (event) => {
  //   const analytics_value = JSON.parse(event.data);
  //   console.log(analytics_value, "this is come");
  //   // if (analytics_value.message.status === "ack_rcvd") {
  //   //   realTimeSending.value.push(analytics_value.message);
  //   // } else
  //   if (analytics_value.message.analytics_type === "uplink")
  //     realTimeAnalytics.value.push({
  //       ...analytics_value.message.message_decoded,
  //       robot_id: analytics_value.message.robot_id,
  //       updated_at: analytics_value.message.updatedAt,
  //       type: analytics_value.message.type,
  //     });
  //   else if (analytics_value.message.analytics_type === "downlink")
  //     realTimeSending.value.push(analytics_value.message);
  //   emitter.emit("analytics", analytics_value);
  //   console.log(realTimeSending.value.length, "this is sending");
  //   analytics.value.push(analytics_value.message_decoded);
  // };
  // });

  // methods (non-computed)
  const getNewAnalytics = async () => {
    let config = {
      limit: 50,
      page: 4,
      sorting: "desc",
    };

    const data = await fetchNewAnalytics(config);
    if (!data) return [];
    return data.sort((a: any, b: any) => {
      return b.createdAt - a.createdAt;
    });
  };

  const getNewSending = async () => {
    let config = {
      limit: 50,
      page: 3,
      sorting: "desc",
    };

    const data = await fetchNewSending(config);

    if (!data) return false;
    return data.sort((a: any, b: any) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  };

  const addAnalytics = (data: any) => {
    analytics.value.push(data);
  };
  const getAnalytics = () => {
    return analytics.value;
  };
  const removedAnalytics = (id: string) => {
    analytics.value = analytics.value.filter(
      (analytics: any) => analytics.id !== id
    );
  };

  const getTotalAnalytics = (day: number) => {
    return analytics.value.filter((item: any) => {
      const date = new Date(item.created_at);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return diffDays <= day;
    });
  };

  const getFilteredAnalytics = (
    type:
      | "analytics"
      | "started"
      | "started"
      | "battery_low"
      | "health"
      | "technical_issue"
  ) => {
    return realTimeAnalytics.value.filter((item: any) => item.type === type);
  };

  // const getAnalyticById = async (id: string): any[] => {
  //   const data = await analyticsDataRobots(id);
  //   if (!data) return [];
  //   return data;
  // };
  // const getAnalyticById = async (id: string, time: string): Promise<any[]> => {
  //   const data = await analyticsDataRobots(id, time);
  //   if (!data) return [];
  //   return data;
  // };

  const getRealTimeAnalytics = async (orgId: string, time: string) => {
    const data = await fetchAllAnalytics(orgId, time);
    if (!data) return [];
    return data;
  };
  return {
    addAnalytics,
    getAnalytics,
    removedAnalytics,
    getNewAnalytics,
    analytics,
    getNewSending,
    sending,
    getTotalAnalytics,
    getFilteredAnalytics,
    realTimeAnalytics,
    realTimeSending,
    // getAnalyticById,
    getRealTimeAnalytics,
  };
});
