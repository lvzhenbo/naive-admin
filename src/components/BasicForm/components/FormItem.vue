<template>
  <NFormItem :label="schema.label">
    <component :is="componentMap.get(schema.component)" />
  </NFormItem>
</template>

<script lang="tsx" setup>
  import type { FormSchema } from '../BasicFormType';
  import { componentMap } from '../componentMap';

  interface FormItemProps {
    schema: FormSchema;
  }

  defineProps<FormItemProps>();
</script>
