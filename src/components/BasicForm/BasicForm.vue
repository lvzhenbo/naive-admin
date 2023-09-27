<template>
  <NForm v-bind="formProps" :model="formModel">
    <NGrid v-bind="gridProps">
      <NGi v-for="item in schema" :key="item.field" v-bind="item.gridItemProps">
        <!-- <NFormItem label="输入框"> <NInput /> </NFormItem> -->
        <FormItem :schema="item" :value="formModel[item.field]" @update:value="setFieldValue" />
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

  const props = withDefaults(defineProps<BasicFormProps>(), {
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

  const formModel = ref<Recordable>({});

  const setFieldValue = (value: Recordable) => {
    formModel.value = { ...formModel.value, ...value };
  };

  const setFieldsValue = async (values: Recordable) => {
    formModel.value = values;
  };

  const getFieldsValue = async () => {
    return formModel.value;
  };

  // const setDefaultValue = async () => {
  //   const values: Recordable = {};
  //   props.schema.forEach((item) => {
  //     if (item.defaultValue) {
  //       values[item.field] = item.defaultValue;
  //     }
  //   });
  //   await setFieldsValue(values);
  // };

  const setDefaultValue = async () => {
    const values = props.schema.reduce((acc, item) => {
      if (item.defaultValue) {
        acc[item.field] = item.defaultValue;
      }
      return acc;
    }, {} as Recordable);
    await setFieldsValue(values);
  };

  onMounted(async () => {
    await setDefaultValue();
  });

  defineExpose({
    setFieldsValue,
    getFieldsValue,
  });
</script>

<style scoped></style>
