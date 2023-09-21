<template>
  <NLayoutHeader bordered position="absolute">
    <div class="p-4 flex items-center">
      <NButton quaternary @click="changeCollapsed">
        <NIcon size="20">
          <MenuFoldOutlined v-if="!collapsed" />
          <MenuUnfoldOutlined v-else />
        </NIcon>
      </NButton>
      <NBreadcrumb class="ml-2">
        <NBreadcrumbItem
          v-for="routeItem in breadcrumbList"
          :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name"
        >
          {{ routeItem.meta.title }}
        </NBreadcrumbItem>
      </NBreadcrumb>
      <NTooltip trigger="hover">
        <template #trigger>
          <NButton quaternary class="!mr-0 !ml-auto" @click="handleFullScreen">
            <NIcon size="20">
              <FullscreenOutlined v-if="!isFullscreen" />
              <FullscreenExitOutlined v-else />
            </NIcon>
          </NButton>
        </template>
        全屏
      </NTooltip>
      <NDropdown :options="options" @select="handleSelect">
        <NButton quaternary class="!ml-2">
          <div class="flex items-center">
            <NAvatar round :size="24" class="mr-2" :src="userStore.userInfo?.avatar || ''" />
            {{ userStore.userInfo?.name || '用户名称' }}
          </div>
        </NButton>
      </NDropdown>
    </div>
  </NLayoutHeader>
</template>

<script setup lang="tsx">
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    LogoutOutlined,
  } from '@vicons/antd';
  import { useFullscreen } from '@vueuse/core';
  import { NIcon, type DropdownOption } from 'naive-ui';
  import type { RouteLocationMatched } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useTabsStore } from '@/store/modules/tabs';

  const props = defineProps({
    collapsed: Boolean,
  });

  const emit = defineEmits(['update:collapsed']);
  const options: DropdownOption[] = [
    {
      label: '退出登录',
      key: 'logout',
      icon: () => (
        <NIcon>
          <LogoutOutlined />
        </NIcon>
      ),
    },
  ];
  const router = useRouter();
  const dialog = useDialog();
  const message = useMessage();
  const userStore = useUserStore();
  const collapsed = computed(() => {
    return props.collapsed;
  });
  const changeCollapsed = () => {
    emit('update:collapsed', !collapsed.value);
  };
  const { isFullscreen, toggle } = useFullscreen();
  const handleFullScreen = () => {
    toggle();
  };

  const route = useRoute();
  const generator = (routerMap: RouteLocationMatched[]) => {
    return routerMap.map((item) => {
      const currentMenu = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/',
      };

      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        //此处存在问题留待解决：“应有 1 个参数，但获得 2 个。”
        currentMenu.children = generator(item.children, currentMenu);
      }
      return currentMenu;
    });
  };

  const breadcrumbList = computed(() => {
    return generator(route.matched);
  });

  const handleSelect = (key: string | number) => {
    if (key === 'logout') {
      // userStore.logout();
      // permissionStore.resetState();
      dialog.info({
        title: '提示',
        content: '确定退出登录吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          userStore.clearUserInfo();
          useTabsStore().clearTabsList();
          message.success('退出成功！');
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.value.fullPath,
            },
          });
        },
      });
    }
  };
</script>

<style scoped></style>
