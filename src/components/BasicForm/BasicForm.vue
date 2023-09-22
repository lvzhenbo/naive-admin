<template>
  <NForm v-bind="formProps">
    <NGrid v-bind="gridProps">
      <NGi v-for="item in schema" :key="item.field" :span="8">
        <!-- <NFormItem label="输入框"> <NInput /> </NFormItem> -->
        <FormItem :schema="item" />
      </NGi>
      <NGi v-if="showActionButton" v-bind="actionGridItemProps">
        <NSpace v-bind="actionSpaceProps">
          <NButton>重置</NButton>
          <NButton type="primary">提交</NButton>
        </NSpace>
      </NGi>
    </NGrid>
  </NForm>
</template>

<script setup lang="ts">
  import type { BasicFormProps } from './BasicFormTypes';
  import FormItem from './components/FormItem.vue';

  withDefaults(defineProps<BasicFormProps>(), {
    formProps: () => ({
      labelPlacement: 'left',
    }),
    showActionButton: true,
    actionGridItemProps: () => ({
      span: 24,
    }),
    actionSpaceProps: () => ({
      justify: 'end',
    }),
    schema: () => [],
  });
</script>

<style scoped></style>
