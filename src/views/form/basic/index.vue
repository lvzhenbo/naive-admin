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
    },
    {
      field: 'select',
      component: 'Select',
      label: '选择器',
    },
  ]);
</script>

<style scoped></style>
