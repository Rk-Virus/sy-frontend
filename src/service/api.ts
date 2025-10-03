/* eslint-disable import/order */
import type {
  CreateIcr,
  CreateRobot,
  Icr,
  MonitoringBot,
  Robot,
  RobotAnalytics,
  UpdateConfig,
  UserProfile,
  SimDetails,
} from "../models";

import axiosClient from "./axiosClient";

// user apis


export const fetchProfile = async () => {
  const { data } = await axiosClient.get("/user/getUser");
  console.log(data);
  return data;
};
export const fetchAllUser = async () => {
  const { data } = await axiosClient.get("/user/getAllUsers");
  console.log(data);
  return data;
};
export const fetchOrgUsers = async (orgId: string) => {
  const { data } = await axiosClient.get(`/user/getUsers/${orgId}`);
  console.log(data);
  return data;
};

export const addUser = async (user) => {
  const { data } = await axiosClient.post("/user/addUser", user);
  console.log(data);
  return data;
};

export const updateMyProfile = async (updateduser) => {
  return axiosClient.put("/user/updateUser", updateduser);
};
export const updateProfile = async (userId, updateduser) => {
  return axiosClient.put("/user/updateUser", updateduser);
};

export const removeOrganization = async ({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) => {
  const { data } = await axiosClient.put(`/user/removeOrganization`, {
    orgId,
    userId,
  });
  return data;
};

export const assignUserToOrganization = async ({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) => {
  const { data } = await axiosClient.post("/organization/assignOrg", {
    userId,
    orgId,
  });
  return data;
};
export const assignMultipleOrgs = async ({
  userId,
  orgIds,
}: {
  userId: string;
  orgIds: Array<String>;
}) => {
  const { data } = await axiosClient.post("/organization/assignMultipleOrgs", {
    userId,
    orgIds,
  });
  return data;
};

// org apis
export const fetchOrganizations = async () => {
  const { data } = await axiosClient.get("/organization/getOrgs");
  // console.log(data);
  return data;
};
export const fetchOrganization = async (orgId: string) => {
  const { data } = await axiosClient.get(`/organization/getOrg/${orgId}`);
  console.log(data);
  return data;
};

export const addOrganization = async (organization) => {
  const { data } = await axiosClient.post("/organization/addOrg", organization);
  return data;
};
export const updateOrganization = async (organization) => {
  const { data } = await axiosClient.put(
    "/organization/updateOrg",
    organization
  );
  return data;
};

export const fetchdashboardData = async (orgId: string) => {
  const { data } = await axiosClient.get(`/dashboard/getDashboard/${orgId}`);
  console.log(data);
  return data;
};
export const fetchDailyData = async (orgId: string) => {
  const { data } = await axiosClient.get(`/dashboard/getDaily/${orgId}`);
  console.log(data);
  return data;
};

// robots basic API

export const addRobot = async (robot: CreateRobot) => {
  const { data } = await axiosClient.post("/robot/addRobot", robot);
  return data;
};

export const fetchRobots = async (orgId: string): Promise<Robot[]> => {
  const { data } = await axiosClient.get(`/robot/getRobotsByOrg/${orgId}`);
  return data;
};

export const fetchRobot = async (id: string): Promise<Robot> => {
  const { data } = await axiosClient.get(`/robot/getRobot/${id}`);
  return data;
};

export const deleteRobot = async (id: string) => {
  const { data } = await axiosClient.delete(`/robot/${id}`);
  return data;
};

export const updateRobot = async (updatedRobot) => {
  return axiosClient.put("/robot/updateRobot", updatedRobot);
};

// icr API

export const addIcr = async (icr: CreateIcr) => {
  const { data } = await axiosClient.post("/icr", icr);
  return data;
};

export const fetchIcrs = async () => {
  const { data } = await axiosClient.get("/icr/all");
  const icrs: Icr[] = data;
  return icrs;
};

export const fetchIcr = async (id: string): Promise<Icr> => {
  const { data } = await axiosClient.get(`/icr/${id}`);
  return data;
};

export const deleteIcr = async (id: string) => {
  const { data } = await axiosClient.delete(`/icr/${id}`);
  return data;
};

// robots analytics API

export const fetchRobotAnalytics = async (
  id: string
): Promise<RobotAnalytics> => {
  // const { data } = await axiosClient.get(`/robot/analytics/${id}`);
  const data = [
    {
      _id: "66adfa8dcf9585b572cb308e",
      robot_id: "clvj6kanj0004vsaixg1wskwi",
      analytics_type: "uplink",
      type: "analytics",
      message: "40010122.417.307.13670",
      message_decoded: {
        battery_percentage: 40,
        state: "stopped_middle",
        position: 1,
        battery_voltage: 22.4,
        panel_voltage: 17.3,
        load_current: 7.1,
        temperature: 36,
        signal_strength: 70,
      },
      status: "ack_rcvd",
      createdAt: "2024-08-03T09:38:21.579Z",
      updatedAt: "2024-08-03T09:38:21.579Z",
      __v: 0,
    },
  ];

  return data;
};

export const fetchRobotLastRun = async (id: string) => {
  return axiosClient.get(`/robot/lastrun/${id}`);
};

export const fetchAllRobotAnalytics = async (): Promise<RobotAnalytics[]> => {
  const { data } = await axiosClient.get(`/robot/analytics/all`);
  return data;
};

// Monitoring bot API

export const fetchMonitoringBot = async (id: string) => {
  return axiosClient.get(`/robot/monitoringbots/${id}`);
};

export const fetchMonitoringBots = async (): Promise<MonitoringBot[]> => {
  const { data } = await axiosClient.get("/robot/monitor/all");
  return data;
};

export const createMonitorBot = async (monitorBot: MonitoringBot) => {
  const { data } = await axiosClient.post("/robot/monitor", monitorBot);
  return data;
};

export const deleteMonitorBot = async (id: string) => {
  const { data } = await axiosClient.delete(`/robot/monitor/${id}`);
  return data;
};

// downlink API

export const sendStartCommand = async (robots: string[]) => {
  console.log(robots);
  const reponse: any[] = [];
  let data: any;
  for await (const robotId of robots) {
    data = await axiosClient.post("/command/start_bot", {
      robotId,
    });
    reponse.push(data);
  }
  return reponse;
};

export const sendStopCommand = async (robots: string[]) => {
  const { data } = await axiosClient.post("/command/interrupt", {
    robotIds: robots,
  });
  return data;
};

export const sendRestartCommand = async (robots: string[]) => {
  const { data } = await axiosClient.post("/command/restart_bot", robots);
  return data;
};

export const sendUpdateCommand = async (updateConfig: UpdateConfig) => {
  const { data } = await axiosClient.post(
    "/command/update_config",
    updateConfig
  );
  return data;
};

// export const fetchNewAnalytics = async (config: any) => {
//   const outConfig = `limit=${config.limit}&page=${config.page}&sorting=${config.sorting}`;
//   const { data: uplinks } = await axiosClient.get(
//     `/analytics_data/uplinks?${outConfig}`
//   );
//   const { data: downlinks } = await axiosClient.get(
//     `/analytics_data/downlinks?${outConfig}`
//   );
//   console.log(uplinks, downlinks, "uplinks, downlinks");
//   const data = [...uplinks, ...downlinks];
//   return data;
// };

export const fetchNewAnalytics = async (config: any) => {
  const outConfig = `limit=${config.limit}&page=${config.page}&sorting=${config.sorting}`;
  // const { data } = await axiosClient.get(
  //   `/analytics_data/uplinks?${outConfig}`
  // );
  const data = [
    {
      _id: "66adfa8dcf9585b572cb308e",
      robot_id: "clvj6kanj0004vsaixg1wskwi",
      analytics_type: "uplink",
      type: "analytics",
      message: "40010122.417.307.13670",
      message_decoded: {
        battery_percentage: 40,
        state: "stopped_middle",
        position: 1,
        battery_voltage: 22.4,
        panel_voltage: 17.3,
        load_current: 7.1,
        temperature: 36,
        signal_strength: 70,
      },
      status: "ack_rcvd",
      createdAt: "2024-08-03T09:38:21.579Z",
      updatedAt: "2024-08-03T09:38:21.579Z",
      __v: 0,
    },
  ];
  console.log(data, "data_uplinks");
  return data;
};

export const fetchNewSending = async (config: any) => {
  const outConfig = `limit=${config.limit}&page=${config.page}&sorting=${config.sorting}`;
  const { data } = await axiosClient.get(
    `/analytics_data/downlinks?${outConfig}`
  );
  console.log(data, "data_downlinks");
  return data;
};

// export const fetchAnalyticsByRobotId = async (id: string) => {
//   const { data } = await axiosClient.get(`/analytics_data/${id}`);
//   return data;
// };

// export const fetchAnalyticsByRobotIdAndDate = async (
//   id: string,
//   date: string
// ) => {
//   const { data } = await axiosClient.get(`/analytics_data/${id}/${date}`);
//   return data;
// };

export const addBlock = async (block: any) => {
  const { data } = await axiosClient.post("/block/addBlock", block);
  return data;
};

export const fetchBlocks = async (orgId: string, page: number = 1, limit: number = 1) => {
  const { data } = await axiosClient.get(`/block/getBlocks/${orgId}`, {
    params: {page, limit},
  });
  return data;
};
export const fetchOrgBlocks = async (orgId: string) => {
  const { data } = await axiosClient.get(`/block/getOrgBlocks/${orgId}`);
  return data;
};

export const fetchBlock = async (id: string) => {
  const { data } = await axiosClient.get(`/block/getBlock/${id}`);
  return data;
};

export const updateBlock = async (updatedBlock) => {
  return axiosClient.put("/block/updateBlock", updatedBlock);
};

export const fetchSimDetails = async () => {
  const { data } = await axiosClient.get(`/sims`);
  return data;
};

export const createSim = async (payload: SimDetails) => {
  const { data } = await axiosClient.post("/sims", {
    payload,
  });
  return data;
};

// export const analyticsDataRobots = async (id: string, time: string) => {
//   const { data } = await axiosClient.get(`/analytics/getRobotAnalytics/${id}`, {
//     params: {
//       time: time,
//     },
// });
//   return data.sort((a: any, b: any) => {
//     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//   });
// };
export const analyticsDataRobots = async (id: string, time: string, page: number, limit: number) => {
  const { data } = await axiosClient.get(`/analytics/getRobotAnalytics/${id}`, {
    params: {
      time: time,
      page: page,
      limit: limit
    },
  });
  const sortedData = data.data.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return {
    data: sortedData,
    meta: data.meta,
  };
};

export const getLatestUpdate = async (orgId: string) => {
  const { data } = await axiosClient.get(`/analytics/getLatestUpdates/${orgId}`);
  return data;
};
export const fetchAllAnalytics = async (orgId: string, time: string) => {
  const { data } = await axiosClient.get(`/analytics/getAnalytics/${orgId}`, {
    params: {
      time: time,
    },
});
  return data.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
