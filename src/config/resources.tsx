import { DashboardOutlined, ShopOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
        name: 'dashboard',
        list: '/dashboard',
        meta: {
            label: 'Inicio',
            icon: <DashboardOutlined/>
        }
    },
    {
      name: 'usuarios',
      list: '/usuarios',
      show: '/usuarios/:id',
      meta: {
        label: 'Usuarios',
        icon: <UserSwitchOutlined/>
      }
    }
]