<template>
  <div
    class="px-2 fixed w-[calc(100%-272px)] transition-all duration-300 z-10 backdrop-blur"
    :class="collapsed ? 'w-[calc(100%-64px)]' : 'w-[calc(100%-272px)]'"
  >
    <NTabs
      v-model:value="currentTab"
      type="card"
      size="small"
      closable
      @update:value="handleToPage"
      @close="handleClose"
    >
      <NTab
        v-for="tab in tabList"
        :key="tab.path"
        :name="tab.path"
        :closable="!tab.affix"
        @contextmenu="handleContextMenu($event, tab.path)"
      >
        {{ tab.name }}
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
  </div>
</template>

<script setup lang="tsx">
  import { NIcon, type DropdownOption } from 'naive-ui';
  import {
    ReloadOutlined,
    CloseOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
    DownOutlined,
  } from '@vicons/antd';
  import { useTabsStore } from '@/store/modules/tabs';

  interface TabList {
    name: string;
    path: string;
    query: any;
    affix?: boolean;
  }

  defineProps({
    collapsed: Boolean,
  });

  const tabList = ref<TabList[]>([]);
  const showDropdownRef = ref(false);
  const xRef = ref(0);
  const yRef = ref(0);
  const isAffix = ref(false);
  const dropDownOptions = computed(() => {
    const disabled = tabList.value.length === 1 ? true : false;
    return [
      {
        label: '刷新当前',
        key: '1',
        icon: () => (
          <NIcon>
            <ReloadOutlined />
          </NIcon>
        ),
        disabled: !isCurrent.value,
      },
      {
        label: '关闭当前',
        key: '2',
        icon: () => (
          <NIcon>
            <CloseOutlined />
          </NIcon>
        ),
        disabled: isAffix.value,
      },
      {
        label: '关闭其他',
        key: '3',
        icon: () => (
          <NIcon>
            <ColumnWidthOutlined />
          </NIcon>
        ),
        disabled,
      },
      {
        label: '关闭全部',
        key: '4',
        icon: () => (
          <NIcon>
            <MinusOutlined />
          </NIcon>
        ),
        disabled: disabled || isAffix.value,
      },
    ] as DropdownOption[];
  });
  const route = useRoute();
  const router = useRouter();
  const tabsStore = useTabsStore();
  const currentTab = ref(route.fullPath);
  const isCurrent = ref(true);

  onMounted(() => {
    tabList.value = tabsStore.getTabsList;
    if (!route.meta.affix && !tabList.value.find((item) => item.path === route.fullPath)) {
      tabList.value.push({
        name: (route.meta.title as string) || (route.name as string),
        path: route.fullPath,
        query: route.query.length ? route.query : null,
      });
    } else {
      isAffix.value = true;
    }
  });

  watch(route, (val) => {
    const index = tabList.value.findIndex((item) => item.path === val.fullPath);
    currentTab.value = val.fullPath;
    isAffix.value = val.meta.affix ? true : false;
    if (index === -1) {
      tabList.value.push({
        name: (val.meta.title as string) || (val.name as string),
        path: val.fullPath,
        query: val.query.length ? val.query : null,
      });
    }
  });

  watch(tabList, (val) => {
    tabsStore.changeTabsList(val);
  });

  const handleContextMenu = (e: MouseEvent, path: string) => {
    e.preventDefault();
    showDropdownRef.value = false;
    isCurrent.value = currentTab.value === path;
    isAffix.value = tabList.value.find((item) => item.path === path)?.affix || false;
    nextTick().then(() => {
      showDropdownRef.value = true;
      xRef.value = e.clientX;
      yRef.value = e.clientY;
    });
  };

  const onClickoutside = () => {
    showDropdownRef.value = false;
    isCurrent.value = true;
  };

  const handleSelect = (key: string) => {
    showDropdownRef.value = false;
    isCurrent.value = true;
    switch (key) {
      // 刷新当前
      case '1':
        router.replace(currentTab.value);
        break;
      // 关闭当前
      case '2': {
        handleClose(currentTab.value);
        break;
      }
      // 关闭其他
      case '3':
        tabList.value = tabList.value.filter(
          (item) => item.path === currentTab.value || item.affix,
        );
        break;
      // 关闭全部
      case '4':
        tabList.value = tabList.value.filter((item) => item.affix);
        router.push(tabList.value[0].path);
        break;
      default:
        break;
    }
  };

  const handleToPage = (path: string) => {
    if (path === route.fullPath) return;
    currentTab.value = path;
    router.push(path);
  };

  const handleClose = (path: string) => {
    const index = tabList.value.findIndex((item) => item.path === path);
    tabList.value.splice(index, 1);
    if (path === route.fullPath) {
      const path = tabList.value[index - 1].path;
      currentTab.value = path;
      router.push(path);
    }
  };
</script>

<style scoped></style>
