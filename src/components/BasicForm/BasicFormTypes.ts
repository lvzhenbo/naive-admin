import type { FormProps, GridProps, GridItemProps, SpaceProps } from 'naive-ui';
import type { ComponentType, ComponentProps } from './componentMap';
import BasicForm from './BasicForm.vue';

export type BasicFormInst = InstanceType<typeof BasicForm>;

export interface BasicFormProps {
  formProps?: FormProps;
  gridProps?: GridProps;
  showActionButton?: boolean;
  actionGridItemProps?: GridItemProps;
  actionSpaceProps?: SpaceProps;
  schema?: FormSchema[];
}

export const defaultProps: BasicFormProps = {
  formProps: {
    labelPlacement: 'left',
  },
  showActionButton: true,
  actionGridItemProps: {
    span: 24,
  },
  actionSpaceProps: {
    justify: 'end',
  },
};

export interface FormSchema {
  field: string;
  label?: string;
  component: ComponentType;
  componentProps?: ComponentProps[ComponentType];
  gridItemProps?: GridItemProps;
  defaultValue?: unknown;
  // rules?: unknown[];
  // slot?: string;
}
