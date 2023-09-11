import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  redirect: '/dashboard/main',
  meta: {
    title: 'Dashboard',
    icon: 'dashboard',
    ignoreRoute: true,
  },
  children: [
    {
      path: 'main',
      name: 'DashboardMain',
      component: () => import('@/views/dashboard/main/index.vue'),
      meta: {
        title: '主控台',
        icon: 'dashboard',
      },
    },
    {
      path: 'workbench',
      name: 'DashboardWorkbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
        icon: 'dashboard',
      },
    },
  ],
};

export default dashboard;
