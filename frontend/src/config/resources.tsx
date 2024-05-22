
import { BoxPlotOutlined, CodeOutlined, CopyOutlined, DashboardOutlined, FallOutlined, GoldOutlined, HomeOutlined, ProductOutlined, ShopOutlined, TagOutlined, ToolOutlined, UserSwitchOutlined } from "@ant-design/icons";

import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
        name: 'dashboard',
        list: '/',
        meta: {
            label: 'Inicio',
            icon: <HomeOutlined/>
        }
    },
    {
      name: 'varios',
      list: '/varios',
      meta: {
        label: 'Varios',
        icon: <GoldOutlined/>
      }
    },
    {
      name: 'Inventario',
      list: '/inventario',
      meta: {
        label: 'Inventario',
        icon: <CopyOutlined/>
      }
    },
    {
      name: 'Repotenciar',
      list: '/repotenciar',
      meta: {
        label: 'Repotenciar',
        icon: <ToolOutlined/>
      }
    },
    {
      name: 'Reportes',
      list: '/reportes',
      meta: {
        label: 'Reportes',
        icon: <FallOutlined/>
      }
    },
    {
      name: 'Etiquetas',
      list: '/etiquetas',
      meta: {
        label: 'Etiquetas',
        icon: <TagOutlined/>
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