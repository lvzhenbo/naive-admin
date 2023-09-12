<template>
  <NLayout content-style="min-height: 100vh" has-sider>
    <Menu :collapsed="collapsed" />
    <NLayout>
      <NLayoutHeader bordered position="absolute">
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
      <NLayoutContent
        class="!top-[4.375rem]"
        position="absolute"
        :native-scrollbar="false"
        content-style="display: flex;min-height: calc(100vh - 4.375rem);"
      >
        <Tabs :collapsed="collapsed" />
        <div class="px-2 mt-10 w-full">
          <RouterView />
        </div>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup lang="ts">
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
  } from '@vicons/antd';
  import { useFullscreen } from '@vueuse/core';
  import Menu from './menu/index.vue';
  import Tabs from './tabs/index.vue';

  const collapsed = ref(false);
  const { isFullscreen, toggle } = useFullscreen();

  const handleFullScreen = () => {
    toggle();
  };
</script>

<style scoped></style>
