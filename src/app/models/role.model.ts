import { Permission } from "./permission.model";

export interface Role {
  id: number;
  name: 'USER_A' | 'USER_B' | 'ADMIN' | 'SUPERADMIN'; 
  permissions?: Permission[];

}