<template>
  <NForm v-bind="formProps">
    <NGrid v-bind="gridProps">
      <NGi>
        <NFormItem label="输入框"> <NInput /> </NFormItem>
      </NGi>
      <NGi :span="gridProps.cols">
        <NButton type="primary">提交</NButton>
      </NGi>
    </NGrid>
  </NForm>
</template>

<script setup lang="ts">
  import type { FormProps, GridProps } from 'naive-ui';
  interface Props {
    formProps: FormProps;
    gridProps: GridProps;
  }
  withDefaults(defineProps<Props>(), {
    formProps: () => ({
      labelPlacement: 'left',
    }),
    gridProps: () => ({
      cols: 1,
    }),
  });
</script>

<style scoped></style>
