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
</script>

<style scoped></style>
