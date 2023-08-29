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
        <div class="p-4 flex">
          <NButton quaternary @click="collapsed = !collapsed">
            <NIcon size="22">
              <MenuFoldOutlined v-if="!collapsed" />
              <MenuUnfoldOutlined v-else />
            </NIcon>
          </NButton>
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
  import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd';

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

  const currentMenu = computed(() => {
    return route.name as string;
  });
</script>

<style scoped></style>
