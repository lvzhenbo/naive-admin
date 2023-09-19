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
  // 前端菜单列表
  const frontMenuList = ref<MenuList[]>([]);

  // 获取前端菜单列表
  const getFrontMenuList = computed((): MenuList[] => {
    return frontMenuList.value;
  });

  // 构建路由
  async function buildRoutes() {
    const menu: MenuList[] = createMenu(asyncRoutes);
    frontMenuList.value = menu;
    return asyncRoutes;
  }

  // 创建菜单
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

  // 是否已经动态添加路由
  const isDynamicAddedRoute = ref(false);

  // 获取是否已经动态添加路由
  const getIsDynamicAddedRoute = computed(() => {
    return isDynamicAddedRoute.value;
  });

  // 设置是否已经动态添加路由
  function setDynamicAddedRoute(val: boolean) {
    isDynamicAddedRoute.value = val;
  }

  return {
    frontMenuList,
    isDynamicAddedRoute,
    getFrontMenuList,
    getIsDynamicAddedRoute,
    buildRoutes,
    setDynamicAddedRoute,
  };
});
