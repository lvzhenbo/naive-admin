<template>
  <NFormItem :label="schema.label">
    <component
      :is="componentMap.get(schema.component)"
      v-bind="schema.componentProps"
      v-model:value="value"
    />
  </NFormItem>
</template>

<script lang="tsx" setup>
  import type { FormSchema } from '../BasicFormTypes';
  import { componentMap } from '../componentMap';

  interface FormItemProps {
    schema: FormSchema;
  }

  const props = defineProps<FormItemProps>();
  const value = ref(props.schema.defaultValue || undefined);
  const emit = defineEmits(['update:value']);

  watch(
    value,
    (val) => {
      emit('update:value', { [props.schema.field]: val });
    },
    { immediate: true },
  );
</script>
