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
        <template
          v-for="routeItem in breadcrumbList"
          :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name"
        >
          <NBreadcrumbItem>
            <span class="link-text">
              <component :is="routeItem.meta.icon" />
              {{ routeItem.meta.title }}
            </span>
          </NBreadcrumbItem>
        </template>
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
</template>

<script setup lang="ts">
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
  } from '@vicons/antd';
  import { useFullscreen } from '@vueuse/core';

  const props = defineProps({
    collapsed: Boolean,
  });

  const emit = defineEmits(['update:collapsed']);

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
  const generator: any = (routerMap: any[]) => {
    return routerMap.map((item) => {
      const currentMenu = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/',
      };
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        // Recursion
        currentMenu.children = generator(item.children, currentMenu);
      }
      return currentMenu;
    });
  };

  const breadcrumbList = computed(() => {
    return generator(route.matched);
  });
</script>

<style scoped></style>
