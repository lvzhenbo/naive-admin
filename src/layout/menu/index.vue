<template>
  <NLayoutSider
    :native-scrollbar="false"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :collapsed="collapsed"
  >
    <NMenu
      ref="menuInstRef"
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
  import { NIcon, type MenuOption, type MenuInst } from 'naive-ui';
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
  const menuInstRef = ref<MenuInst | null>(null);
  const permissionStore = usePermissionStore();

  onMounted(() => {
    menuOptions.value = createMenu(permissionStore.getFrontMenuList);
  });

  watch(route, (val) => {
    currentMenu.value = val.name as string;
    menuInstRef.value?.showOption(val.name as string);
  });

  function createMenu(menu: MenuList[], menuList: MenuOption[] = []): MenuOption[] {
    if (menu.length === 0) {
      return menuList;
    }
    const [first, ...rest] = menu;
    const temp: MenuOption = { key: first.key };
    if (first.children) {
      temp.children = createMenu(first.children);
    }
    temp.icon = () => (
      <NIcon>
        <HomeOutlined />
      </NIcon>
    );
    if (first.ignoreRoute) {
      temp.label = first.label;
    } else {
      temp.label = () => <RouterLink to={{ name: first.key }}>{first.label}</RouterLink>;
    }
    return createMenu(rest, [...menuList, temp]);
  }
</script>

<style scoped></style>
