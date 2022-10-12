import {
  UtilsResourceUsage,
  AccountDetail,
  UsersList,
  FeaturesNodeStatus,
  ExtendsModify,
  CreatedUserObject,
  ListNode,
  ListServersAdmin,
  UtilsServerList
} from "./@types/types";

export const utils: Utils;
export const features: Features;
export const application: Application;
export const account: Account;

interface Utils {
  logs: (
    panelUrl: string,
    apiKey: string,
    serverId: string,
    color?: boolean,
    timeout?: number
  ) => Promise<string[]>;
  resourceUsage: (
    panelUrl: string,
    apiKey: string,
    serverId: string
  ) => Promise<UtilsResourceUsage>;
  sendConsoleCommand: (
    panelUrl: string,
    apiKey: string,
    serverId: string,
    color?: boolean
  ) => Promise<string[]>;
  sendSignal: (
    panelUrl: string,
    apiKey: string,
    serverId: string,
    signal: string
  ) => Promise<number>;
  serverList: (panelUrl: string, apiKey: string) => Promise<UtilsServerList[]>;
}
interface Account {
  accountDetail: (panelUrl: string, apiKey: string) => Promise<AccountDetail>;
  listUsers: (
    panelUrl: string,
    apiKey: string,
    serverId: string
  ) => Promise<UsersList[]>;
  updateEmail: (
    panelUrl: string,
    apiKey: string,
    email: string
  ) => Promise<number>;
  updatePassword: (
    panelUrl: string,
    apiKey: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<number>;
}
interface Features {
  nodeStatus: (
    panelUrl: string,
    apiKey: string
  ) => Promise<FeaturesNodeStatus[]>;
  request: (endpoint: string, header: string, method: "get" | "patch" | "post" | "delete" | "put", body:? string) => Promise<any>;
}
interface Application {
  createServer: (
    panelUrl: string,
    apiKey: string,
    object: ObjectCreateServer
  ) => Promise<ExtendsModify>;
  createUser: (
    panelUrl: string,
    apiKey: string,
    email: string,
    password: string,
    username: string,
    name: string,
    last_name: string
  ) => Promise<CreatedUserObject>;
  listNode: (
    panelUrl: string,
    apiKey: string
  ) => Promise<ListNode>;
  listServer: (
    panelUrl: string,
    apiKey: string
  ) => Promise<ListServersAdmin>;
  suspendServer: (
    panelUrl: string,
    apiKey: string,
    suspend?: boolean
  ) => Promise<number>;
}
interface ObjectCreateServer {
  name: string;
  user: number;
  egg: number;
  docker_image: string;
  startup: string;
  environment: object;
  limits: {
    memory?: number;
    swap?: number;
    disk?: number;
    io?: number;
    cpu?: number;
  };
  feature_limits?: {
    databases: number;
    allocations: number;
  };
  allocation: {
    default: number;
  };
}
