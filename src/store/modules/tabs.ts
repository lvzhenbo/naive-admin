interface TabList {
  name: string;
  path: string;
  query: any;
  affix?: boolean;
}

export const useTabsStore = defineStore(
  'tabs',
  () => {
    const tabsList = ref<TabList[]>([
      {
        name: '主控台',
        path: '/dashboard/main',
        query: null,
        affix: true,
      },
    ]);

    const getTabsList = computed(() => {
      return tabsList.value;
    });
    const changeTabsList = (list: TabList[]) => {
      tabsList.value = list;
    };
    const clearTabsList = () => {
      tabsList.value = [
        {
          name: '主控台',
          path: '/dashboard/main',
          query: null,
          affix: true,
        },
      ];
    };

    return {
      tabsList,
      getTabsList,
      changeTabsList,
      clearTabsList,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);
