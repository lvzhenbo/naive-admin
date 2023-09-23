<template>
  <div>
    <BasicForm :schema="schema" />
  </div>
</template>

<script setup lang="ts">
  import type { FormSchema } from '@/components/BasicForm/BasicFormTypes';

  const schema = ref<FormSchema[]>([
    {
      field: 'input',
      component: 'Input',
      label: '输入框',
      gridItemProps: {
        span: 12,
      },
    },
    {
      field: 'select',
      component: 'Select',
      label: '选择器',
      gridItemProps: {
        span: 12,
      },
      componentProps: {
        options: [
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ],
      },
    },
  ]);
</script>

<style scoped></style>
