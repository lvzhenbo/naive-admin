<template>
  <div>
    <BasicForm ref="basicFormRef" :schema="schema" />
    <NButton @click="handleSubmit">提交</NButton>
  </div>
</template>

<script setup lang="ts">
  import type { FormSchema, BasicFormInst } from '@/components/BasicForm/BasicFormTypes';

  const basicFormRef = ref<BasicFormInst | null>(null);
  const schema = ref<FormSchema[]>([
    {
      field: 'input',
      component: 'Input',
      label: '输入框',
      gridItemProps: {
        span: 8,
      },
      defaultValue: '默认值',
    },
    {
      field: 'select',
      component: 'Select',
      label: '选择器',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        options: [
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ],
      },
    },
    {
      field: 'inputNumber',
      component: 'InputNumber',
      label: '数字输入框',
      gridItemProps: {
        span: 8,
      },
    },
  ]);

  onMounted(async () => {
    await basicFormRef.value?.setFieldsValue({
      input: '123',
      select: '2',
      inputNumber: 123,
    });
  });

  const handleSubmit = async () => {
    const values = await basicFormRef.value?.getFieldsValue();
    console.log(values);
  };
</script>

<style scoped></style>
