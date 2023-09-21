import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const test: RouteRecordRaw = {
  path: '/form',
  name: 'Form',
  component: Layout,
  redirect: '/form/basic',
  meta: {
    title: '表单',
    icon: 'test',
    ignoreRoute: true,
  },
  children: [
    {
      path: 'basic',
      name: 'BasicForm',
      component: () => import('@/views/form/basic/index.vue'),
      meta: {
        title: '基础表单',
        icon: 'dashboard',
      },
    },
  ],
};

export default test;
