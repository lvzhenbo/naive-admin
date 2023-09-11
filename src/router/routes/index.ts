import type { RouteRecordRaw } from 'vue-router';

interface ModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw;
}

// import.meta.glob() https://cn.vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob<ModuleType>('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordRaw[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
};

export const basicRoutes: RouteRecordRaw[] = [RootRoute];
