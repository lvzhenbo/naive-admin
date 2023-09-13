<template>
  <NLayout content-style="min-height: 100vh" has-sider>
    <Menu :collapsed="collapsed" />
    <NLayout>
      <Header v-model:collapsed="collapsed" />
      <NLayoutContent
        class="!top-[4.375rem]"
        position="absolute"
        :native-scrollbar="false"
        content-style="display: flex;min-height: calc(100vh - 4.375rem);"
      >
        <Tabs :collapsed="collapsed" />
        <div class="px-2 mt-10 w-full">
          <RouterView />
        </div>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup lang="ts">
  import Menu from './menu/index.vue';
  import Tabs from './tabs/index.vue';
  import Header from './header/index.vue';

  const collapsed = ref(false);
</script>

<style scoped></style>
