import type { CreateRobot, MonitoringBot, Robot, RobotAnalytics } from "../models";
import { acceptHMRUpdate, defineStore, storeToRefs } from "pinia";
import {
  addRobot,
  fetchAllRobotAnalytics,
  fetchMonitoringBots,
  fetchRobot,
  fetchRobotAnalytics,
  fetchRobots,
} from "../service/api";
import { useAnalyticsStore } from "./analyticsStore";
import { ref } from "vue";

export const useRobotStore = defineStore("robot", () => {
  /**
   * Current name of the robot.
   */
  const robots = ref<Robot[]>([]);
  const monitoringBot = ref<MonitoringBot[]>([]);
  const robotsAnalytics = ref<RobotAnalytics[]>([]);

  const { realTimeAnalytics } = storeToRefs(useAnalyticsStore());

  /**
   * Changes the current robot of the robot and saves the one that was used
   * before.
   *
   * @param robot - new robot to set
   */
  const addNewRobot = async (robot: CreateRobot) => {
    const { data } = await addRobot(robot);
    // robots.value.push(data);
    return data;
  };
  const setRobots = (data: Robot[]) => {
    robots.value = data;
  };
  const getRobots = async (orgId: string) => {
    const data = await fetchRobots(orgId);
    data.map((robot) => {
      robot.analytics = realTimeAnalytics.value.find(
        (analytic: any) => analytic.robotId === robot.id
      );
    });
    robots.value = data;
    return data;
  };

  const getRobot = async (id: string) => {
    if (robots.value.find((robot: any) => robot.id === id) !== undefined) {
      return robots.value.find((robot: any) => robot.id === id);
    }
    const response = await fetchRobot(id);
    robots.value.push(response);
    return response;
  };

  const getRobotAnalytics = async (id: string) => {
    const data = await fetchRobotAnalytics(id);
    return data;
  };

  const getAllRobotAnalytics = async () => {
    const data = await fetchAllRobotAnalytics();
    robotsAnalytics.value = data;
    return data;
  };

  const getMonitoringBots = async () => {
    if (monitoringBot.value.length === 0) {
      const response = await fetchMonitoringBots();
      monitoringBot.value = response;
    }
    return monitoringBot.value;
  };
  return {
    robots,
    robotsAnalytics,
    addNewRobot,
    getRobots,
    setRobots,
    getRobot,
    getRobotAnalytics,
    getAllRobotAnalytics,
    getMonitoringBots,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRobotStore, import.meta.hot));
