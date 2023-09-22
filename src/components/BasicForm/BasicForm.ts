import type { FormProps, GridProps, GridItemProps, SpaceProps } from 'naive-ui';
import type { ComponentType } from './componentMap';

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
  // componentProps?: Record<string, unknown>;
  // gridItemProps?: GridItemProps;
  // rules?: unknown[];
  // slot?: string;
}
