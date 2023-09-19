<template>
  <div
    class="bg-gradient-to-br from-[#50a3a2] to-[#53e3a6] w-screen h-screen flex items-center justify-center"
  >
    <Background />
    <div class="max-w-sm min-w-[20rem] flex-1 px-3">
      <NCard
        hoverable
        title="登录"
        class="backdrop-blur"
        :theme-overrides="cardThemeOverrides"
        :bordered="false"
      >
        <NForm ref="formRef" label-placement="left" :rules="rules" :model="formValue">
          <NFormItem path="username">
            <NInput v-model:value="formValue.username" placeholder="请输入用户名">
              <template #prefix>
                <NIcon>
                  <UserOutlined />
                </NIcon>
              </template>
            </NInput>
          </NFormItem>
          <NFormItem path="password">
            <NInput v-model:value="formValue.password" placeholder="请输入密码" type="password">
              <template #prefix>
                <NIcon>
                  <LockOutlined />
                </NIcon>
              </template>
            </NInput>
          </NFormItem>
          <NFormItem>
            <NButton type="primary" block :loading="loading" @click="handleLogin">登录</NButton>
          </NFormItem>
        </NForm>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Background from './components/Background.vue';
  import type { CardProps, FormInst, FormRules } from 'naive-ui';
  import { UserOutlined, LockOutlined } from '@vicons/antd';
  import { useUserStore } from '@/store/modules/user';
  import { usePermissionStore } from '@/store/modules/permission';

  type CardThemeOverrides = NonNullable<CardProps['themeOverrides']>;

  const osThemeRef = useOsTheme();
  const message = useMessage();
  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  const cardThemeOverrides = computed(() => {
    return {
      color: osThemeRef.value === 'dark' ? '#00000066' : '#FFFFFF44',
    } as CardThemeOverrides;
  });
  const loading = ref(false);
  const formRef = ref<FormInst | null>(null);
  const formValue = ref({
    username: 'admin',
    password: '123456',
  });
  const rules: FormRules = {
    username: { required: true, message: '请输入用户名' },
    password: { required: true, message: '请输入密码' },
  };

  const handleLogin = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        loading.value = true;
        message.loading('登录中');
        setTimeout(async () => {
          userStore.setUserInfo({
            name: 'admin',
            avatar: 'https://avatars.githubusercontent.com/u/499550?v=4',
            token: '123456',
          });
          if (!permissionStore.isDynamicAddedRoute) {
            const routes = await permissionStore.buildRoutes();
            routes.forEach((route) => {
              router.addRoute(route);
            });
            permissionStore.setDynamicAddedRoute(true);
          }
          loading.value = false;
          message.destroyAll();
          message.success('登录成功');
          router.replace((route.query.redirect as string) || '/');
        }, 1000);
      }
    });
  };
</script>

<style scoped></style>
