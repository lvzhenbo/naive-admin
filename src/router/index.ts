import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './routes';
import { createRouterGuards } from './guards';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...basicRoutes],
});

createRouterGuards(router);

export default router;
