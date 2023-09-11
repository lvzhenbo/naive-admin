<script setup lang="ts">
  import { zhCN, dateZhCN, useOsTheme, darkTheme, lightTheme } from 'naive-ui';
  import { usePermissionStore } from '@/stores/modules/permission';

  const osThemeRef = useOsTheme();
  const theme = computed(() => {
    return osThemeRef.value === 'dark' ? darkTheme : lightTheme;
  });
  usePermissionStore().buildRoutes();
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
