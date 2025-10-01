export interface AuthResponse {
  token: string;
  isProfileComplete: boolean;
  id: string;
  loginId: string;
  name: string;
  photo?: any;
  email: string;
  access_level: number;
  is_active: boolean;
  updated_at: Date;
  created_at: Date;
}
// user profile = register - token
export type UserProfile = Omit<AuthResponse, "token">;

export interface Storage {
  id: string;
  name: string;
  type: string;
  local_path: string;
  remote_path: string;
  is_active: boolean;
}

export interface Robot {
  // [x: string]: string;
  id: string;
  deviceEUI?: string;
  name: string;
  panels_count: any;
  software_version: string;
  hardware_version: string;
  start_timings: any[];
  // purchasePlansId?: string;
  icr?: string;
  blockId?: string;
  // iCRId?: string;
  drive_speed?: any;
  brush_speed?: any;
  is_active: any;
  updated_at: any;
  created_at: any;
}

export interface CreateRobot {
  name: string;
  panels_count: number;
  iCRId?: string;
  icr?: string;
  deviceEUI?: string;
  blockId?: string;
  software_version?: string;
  connection_type: string;
  hardware_version?: string;
  is_active: boolean;
  start_timings?: number[];
}

export interface Icr {
  id: string;
  name: string;
  is_active: boolean;
  tenant_name: string;
  // alloted_worker: string;
  // purchasedPlansId?: string;
  // connection_mode: string;
  // updated_at: Date;
  // created_at: Date;
  // MonitoringBot: MonitoringBot[];
  // Robot: Robot[];
}

export type CreateIcr = Omit<Icr, "id">;

export interface RobotAnalytics {
  id: string;
  name?: string;
  gateway?: string;
  batery_change: number;
  batery_panel: number;
  batery_load: number;
  batery_voltage: number;
  temperature: number;
  state: number;
  position: number;
  robotId: string;
  created_at: Date;
  updated_at: Date;
}

export interface RobotLastRun {
  id: string;
  drive_speed: number;
  brush_speed: number;
  start_timing: number;
  robotId: string;
}

export interface MonitoringBot {
  id: string;
  name: string;
  software_version: string;
  hardware_version: string;
  purchasePlansId: string;
  icr?: string;
  blockId?: string;
  // iCRId?: string;
  is_active: boolean;
  updated_at: Date;
  created_at: Date;
}

export type CreateMonitorBot = Omit<
  CreateRobot,
  "panels_count" | "drive_speed" | "brush_speed" | "start_timings" | "iCRId"
>;

export interface TableData {
  id: string;
  name: string;
  is_active?: boolean;
  latest_at?: string;
  created_at: Date;
  updated_at: Date;
  panels_count?: number;
  brush_speed?: number;
  drive_speed?: number;
  alloted_worker?: string;
  connection_mode?: string;
  software_version?: string;
  hardware_version?: string;

  gateway?: string | undefined;
  batery_change?: number;
  batery_panel?: number;
  batery_load?: number;
  batery_voltage?: number;
  temperature?: number;
  state?: number;
  position?: number;
  robotId?: string;
  block?: string;
}

export interface UpdateConfig {
  robots: string[];
  brush_speed: number;
  drive_speed: number;
  start_timings: number[];
}

export interface Block {
  id: string;
  name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SimDetails {
  simId: string;
}
