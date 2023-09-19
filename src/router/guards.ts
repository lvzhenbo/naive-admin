import type { Router } from 'vue-router';
import { useLoadingBar } from '@/utils/useDiscreteApi';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
import { PAGE_NOT_FOUND_ROUTE } from './routes/basic';

type Recordable<T = any> = Record<string, T>;

export function createRouterGuards(router: Router) {
  const loadingBar = useLoadingBar();

  router.beforeEach(async (to, from, next) => {
    loadingBar.start();
    // https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#single-page-applications
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    // 登录页直接跳转
    if (to.path === '/login') {
      next();
      return;
    }

    // 未登录跳转登录页
    if (!userStore.userInfo?.token) {
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: '/login',
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // 已登录且动态添加路由，直接跳转
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    // 已登录且未动态添加路由，动态添加路由
    if (!permissionStore.isDynamicAddedRoute) {
      const routes = await permissionStore.buildRoutes();
      routes.forEach((route) => {
        router.addRoute(route);
      });
      permissionStore.setDynamicAddedRoute(true);
    }

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      next();
    }
  });
  router.afterEach(() => {
    loadingBar.finish();
  });
}
