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
        <div
          class="px-2 fixed w-[calc(100%-272px)] transition-all duration-300 z-10 backdrop-blur"
          :class="collapsed ? 'w-[calc(100%-64px)]' : 'w-[calc(100%-272px)]'"
        >
          <NTabs type="card" size="small" closable>
            <NTab v-for="n in 20" :key="n" :name="n" @contextmenu="handleContextMenu">
              标签{{ n }}
            </NTab>
            <template #suffix>
              <div class="mr-3 cursor-pointer">
                <NDropdown
                  trigger="hover"
                  placement="bottom-end"
                  :options="dropDownOptions"
                  @select="handleSelect"
                >
                  <NIcon>
                    <DownOutlined />
                  </NIcon>
                </NDropdown>
              </div>
            </template>
          </NTabs>
        </div>
        <div class="px-2 mt-10 w-full">
          <RouterView />
        </div>
      </NLayoutContent>
    </NLayout>
    <NDropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="dropDownOptions"
      :show="showDropdownRef"
      :on-clickoutside="onClickoutside"
      @select="handleSelect"
    />
  </NLayout>
</template>

<script setup lang="tsx">
  import { NIcon, type DropdownOption } from 'naive-ui';
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    ReloadOutlined,
    CloseOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
    DownOutlined,
  } from '@vicons/antd';
  import { useFullscreen } from '@vueuse/core';
  import Menu from './menu/index.vue';

  const dropDownOptions: DropdownOption[] = [
    {
      label: '刷新当前',
      key: '1',
      icon: () => (
        <NIcon>
          <ReloadOutlined />
        </NIcon>
      ),
    },
    {
      label: '关闭当前',
      key: '2',
      icon: () => (
        <NIcon>
          <CloseOutlined />
        </NIcon>
      ),
    },
    {
      label: '关闭其他',
      key: '3',
      icon: () => (
        <NIcon>
          <ColumnWidthOutlined />
        </NIcon>
      ),
    },
    {
      label: '关闭全部',
      key: '4',
      icon: () => (
        <NIcon>
          <MinusOutlined />
        </NIcon>
      ),
    },
  ];
  const collapsed = ref(false);
  const { isFullscreen, toggle } = useFullscreen();
  const showDropdownRef = ref(false);
  const xRef = ref(0);
  const yRef = ref(0);

  const handleFullScreen = () => {
    toggle();
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    showDropdownRef.value = false;
    nextTick().then(() => {
      showDropdownRef.value = true;
      xRef.value = e.clientX;
      yRef.value = e.clientY;
    });
  };

  const onClickoutside = () => {
    showDropdownRef.value = false;
  };

  const handleSelect = (key: string) => {
    console.log(key);
    showDropdownRef.value = false;
  };
</script>

<style scoped></style>
