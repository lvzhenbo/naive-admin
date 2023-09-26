<template>
  <NForm v-bind="formProps">
    <NGrid v-bind="gridProps">
      <NGi v-for="item in schema" :key="item.field" v-bind="item.gridItemProps">
        <!-- <NFormItem label="输入框"> <NInput /> </NFormItem> -->
        <FormItem :schema="item" @update:value="setFieldValue" />
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

  type Recordable<T = any> = Record<string, T>;

  withDefaults(defineProps<BasicFormProps>(), {
    formProps: () => ({
      labelPlacement: 'left',
    }),
    gridProps: () => ({
      xGap: 12,
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

  const setFieldValue = (value: Recordable) => {
    console.log(value);
  };
</script>

<style scoped></style>
