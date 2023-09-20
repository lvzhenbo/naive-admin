<template>
  <div class="flex items-center w-full justify-center h-full">
    <NResult status="404" title="404 资源不存在" description="抱歉，你访问的页面不存在">
      <template #footer>
        <NButton @click="hanldeToHome">回到首页</NButton>
      </template>
    </NResult>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter();
  const hanldeToHome = () => {
    router.replace('/');
  };
</script>

<style scoped></style>
