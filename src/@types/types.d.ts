export interface UtilsResourceUsage {
  object: string;
  attributes: UtilsResourceUsageAttributes;
}
interface UtilsResourceUsageAttributes {
  current_state: string;
  is_suspended: boolean;
  resources: UtilsResourceUsageAttributesResources;
}
interface UtilsResourceUsageAttributesResources {
  memory_bytes: number;
  disk_bytes: number;
  cpu_absolute: number;
  network_rx_bytes: number;
  network_tx_bytes: number;
}
export interface UtilsServerList {
  object: string;
  data: UtilsServerListData[];
}
export interface AccountDetail {
  object: string;
  attributes: {
    id: number;
    admin: boolean;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
  };
}
export interface UsersList {
  object: string;
  data: UsersType[];
}
interface UserAttributes {
  uuid: string;
  username: string;
  email: string;
  image: string;
  "2fa_enabled": boolean;
  created_at: string;
  permissions: string[];
}
interface UsersType {
  object: string;
  attributes: UserAttributes;
}
interface CreatedUserObjectAttributes extends UserAttributes {
  language: string;
  updated_at: string;
  "2fa": boolean;
  external_id: string;
  root_admin: boolean;
}
export interface CreatedUserObject {
  object: string;
  attributes: NewCreatedUserObjectAttributes;
}
interface UtilsServerListData {
  object: string;
  attributes: UtilsServerListDataAttributes;
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      links: any;
    };
  };
}
interface UtilsServerListDataAttributes {
  server_owner: boolean;
  identifier: string;
  uuid: string;
  name: string;
  description: string;
  node: string | number;
  sftp_details: {
    ip: string;
    port: number;
  };
  limits: {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
  };
  feature_limits: {
    databases: number;
    allocations: number;
  };
  is_suspended: boolean;
  is_installing: boolean;
  relationships: {
    object: string;
    data: RelationShipsData[];
  };
}
interface RelationShipsData {
  object: string;
  attributes: {
    id: number;
    ip: string;
    ip_alias: string;
    port: number;
    notes?: string;
    is_default: boolean;
  };
}
interface RelationShipsDatabaseData {
  object: string;
  attributes: {
    id: number;
    ip: string;
    ip_alias: string;
    port: number;
    notes?: string;
    is_default: boolean;
  };
}
export interface FeaturesNodeStatus {
  online: boolean;
  maintence: boolean;
  name: string;
}
interface CreatedServerAttributes extends UtilsServerListDataAttributes {
  suspended: boolean;
  extenal_id?: string;
  user: number;
  allocation: number;
  nest: number;
  egg: number;
  container: {
    startup_command: string;
    image: string;
    installed: boolean;
    environment: object;
  };
  updated_at: string;
  installed: boolean;
}
interface ListServersAdminAttributes extends CreatedServerAttributes {
  relationships: {
    object: string;
    data: RelationShipsDatabaseData[];
  };
}
export interface ListServersAdmin {
  object: string;
  data: ListServersAdminAttributes[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      links: any;
    };
  };
}
interface RelationShipsDatabases {
  id: number;
  server: number;
  host: number;
  database: string;
  username: string;
  remote: string;
  password: string;
  max_connections: number;
  created_at: string;
  updated_at: string;
}
interface NodeAttributes {
  object: string;
  attributes: {
    id: number;
    uuid: string;
    public: boolean;
    name: string;
    description?: string;
    location_id: number;
    fqdn: string;
    scheme: string;
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_base: string;
    created_at: string;
    updated_at: string;
  };
}
export interface ListNode {
  object: string;
  data: NodeAttributes[];
}
export type ExtendsModify = Omit<
  CreatedServerAttributes,
  "is_suspended" | "is_installing" | "sftp_details" | "relationships"
>;
type NewCreatedUserObjectAttributes = Omit<
  CreatedUserObjectAttributes,
  "2fa_enabled" | "image" | "permissions"
>;
