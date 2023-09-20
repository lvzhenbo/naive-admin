import { pinia } from '@/store';

interface UserInfo {
  name: string;
  avatar: string;
  token: string;
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo>();

    const setUserInfo = (info: UserInfo) => {
      userInfo.value = info;
    };

    const clearUserInfo = () => {
      userInfo.value = undefined;
    };
    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  },
);

export function useUserStoreWithOut() {
  return useUserStore(pinia);
}
