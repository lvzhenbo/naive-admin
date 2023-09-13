import { asyncRoutes } from '@/router/routes';
import { type RouteRecordRaw } from 'vue-router';

interface MenuList {
  key: string;
  label?: string;
  icon?: string;
  ignoreRoute?: boolean;
  children?: MenuList[];
}

export const usePermissionStore = defineStore('permission', () => {
  const frontMenuList = ref<MenuList[]>([]);

  const getFrontMenuList = (): MenuList[] => {
    return frontMenuList.value;
  };

  async function buildRoutes() {
    const menu: MenuList[] = createMenu(asyncRoutes);
    frontMenuList.value = menu;
  }

  function createMenu(menu: RouteRecordRaw[]): MenuList[] {
    return menu.map((item) => {
      const temp: MenuList = { key: item.name as string };
      if (item.children) {
        temp.children = createMenu(item.children);
      }
      temp.icon = (item.meta?.icon as string) || '';
      temp.label = (item.meta?.title as string) || '';
      temp.ignoreRoute = (item.meta?.ignoreRoute as boolean) || false;
      return temp;
    });
  }

  return {
    frontMenuList,
    getFrontMenuList,
    buildRoutes,
  };
});
