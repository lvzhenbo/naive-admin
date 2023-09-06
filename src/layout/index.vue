<template>
  <NLayout content-style="min-height: 100vh" has-sider>
    <NLayoutSider
      native-scrollbar
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :collapsed="collapsed"
    >
      <NMenu
        :options="menuOptions"
        :value="currentMenu"
        :collapsed="collapsed"
        :collapsed-width="64"
      />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered>
        <div class="p-4 flex items-center">
          <NButton quaternary @click="collapsed = !collapsed">
            <NIcon size="20">
              <MenuFoldOutlined v-if="!collapsed" />
              <MenuUnfoldOutlined v-else />
            </NIcon>
          </NButton>
          <NBreadcrumb class="ml-2">
            <NBreadcrumbItem> 首页 </NBreadcrumbItem>
            <NBreadcrumbItem> 首页</NBreadcrumbItem>
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
        </div>
      </NLayoutHeader>
      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup lang="tsx">
  import { NIcon, type MenuOption } from 'naive-ui';
  import { RouterLink } from 'vue-router';
  import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
  } from '@vicons/antd';
  import { useFullscreen } from '@vueuse/core';

  const menuOptions: MenuOption[] = [
    {
      label: () => <RouterLink to="/">首页</RouterLink>,
      key: 'home',
      icon: () => (
        <NIcon>
          <HomeOutlined />
        </NIcon>
      ),
    },
  ];
  const route = useRoute();
  const collapsed = ref(false);
  const { isFullscreen, toggle } = useFullscreen();

  const currentMenu = computed(() => {
    return route.name as string;
  });

  const handleFullScreen = () => {
    toggle();
  };
</script>

<style scoped></style>
