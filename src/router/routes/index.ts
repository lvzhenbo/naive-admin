import type { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from './basic';

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

// 登录路由
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

export const basicRoutes: RouteRecordRaw[] = [RootRoute, LoginRoute, PAGE_NOT_FOUND_ROUTE];
