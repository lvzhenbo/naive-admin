<template>
  <NLayoutSider
    :native-scrollbar="false"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :collapsed="collapsed"
  >
    <NMenu
      v-model:value="currentMenu"
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :expanded-keys="openKeys"
      accordion
      @update:expanded-keys="openKeys = $event"
    />
  </NLayoutSider>
</template>

<script setup lang="tsx">
  import { NIcon, type MenuOption } from 'naive-ui';
  import { RouterLink } from 'vue-router';
  import { HomeOutlined } from '@vicons/antd';
  import { usePermissionStore } from '@/store/modules/permission';

  interface MenuList {
    key: string;
    label?: string;
    icon?: string;
    ignoreRoute?: boolean;
    children?: MenuList[];
  }

  defineProps({
    collapsed: Boolean,
  });
  const route = useRoute();
  const menuOptions = ref<MenuOption[]>([]);
  const currentMenu = ref<string>(route.name as string);
  const openKeys = ref<string[]>(route.matched.map((item) => item.name as string));

  // 临时
  onMounted(() => {
    const permissionStore = usePermissionStore();
    menuOptions.value = createMenu(permissionStore.getFrontMenuList());
  });

  watch(route, (val) => {
    currentMenu.value = val.name as string;
  });

  function createMenu(menu: MenuList[]) {
    const menuList: MenuOption[] = [];
    menu.forEach((item) => {
      const temp: MenuOption = { key: item.key };
      if (item.children) {
        temp.children = createMenu(item.children);
      }
      temp.icon = () => (
        <NIcon>
          <HomeOutlined />
        </NIcon>
      );
      if (item.ignoreRoute) {
        temp.label = item.label;
      } else {
        temp.label = () => <RouterLink to={{ name: item.key }}>{item.label}</RouterLink>;
      }
      menuList.push(temp);
    });
    return menuList;
  }
</script>

<style scoped></style>
