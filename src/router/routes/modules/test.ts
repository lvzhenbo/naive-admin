import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const test: RouteRecordRaw = {
  path: '/test',
  name: 'Test',
  component: Layout,
  redirect: '/test/test1',
  meta: {
    title: '测试',
    icon: 'test',
    ignoreRoute: true,
  },
  children: [
    {
      path: 'test1',
      name: 'test1',
      component: () => import('@/views/test/test1/index.vue'),
      meta: {
        title: '测试1',
        icon: 'dashboard',
      },
    },
  ],
};

export default test;
