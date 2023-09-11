import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes, asyncRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...basicRoutes, ...asyncRoutes],
});

export default router;
