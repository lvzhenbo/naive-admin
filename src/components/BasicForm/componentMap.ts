import type { Component } from 'vue';
import {
  NInput,
  NInputNumber,
  NInputGroup,
  NAutoComplete,
  NSelect,
  NTreeSelect,
  NSwitch,
  NRadioGroup,
  NCheckbox,
  NCheckboxGroup,
  NCascader,
  NSlider,
  NRate,
  NTransfer,
  NDatePicker,
  NTimePicker,
  NColorPicker,
  NUpload,
} from 'naive-ui';

import type {
  InputProps,
  InputNumberProps,
  InputGroupProps,
  AutoCompleteProps,
  SelectProps,
  TreeSelectProps,
  SwitchProps,
  RadioGroupProps,
  CheckboxProps,
  CheckboxGroupProps,
  CascaderProps,
  SliderProps,
  RateProps,
  TransferProps,
  DatePickerProps,
  TimePickerProps,
  ColorPickerProps,
  UploadProps,
} from 'naive-ui';

export type ComponentProps = {
  Input: InputProps;
  InputNumber: InputNumberProps;
  InputGroup: InputGroupProps;
  AutoComplete: AutoCompleteProps;
  Select: SelectProps;
  TreeSelect: TreeSelectProps;
  Switch: SwitchProps;
  RadioGroup: RadioGroupProps;
  Checkbox: CheckboxProps;
  CheckboxGroup: CheckboxGroupProps;
  Cascader: CascaderProps;
  Slider: SliderProps;
  Rate: RateProps;
  Transfer: TransferProps;
  DatePicker: DatePickerProps;
  TimePicker: TimePickerProps;
  ColorPicker: ColorPickerProps;
  Upload: UploadProps;
};

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'InputGroup'
  | 'AutoComplete'
  | 'Select'
  | 'TreeSelect'
  | 'Switch'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'Cascader'
  | 'Slider'
  | 'Rate'
  | 'Transfer'
  | 'DatePicker'
  | 'TimePicker'
  | 'ColorPicker'
  | 'Upload';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', NInput);
componentMap.set('InputNumber', NInputNumber);
componentMap.set('InputGroup', NInputGroup);
componentMap.set('AutoComplete', NAutoComplete);

componentMap.set('Select', NSelect);
componentMap.set('TreeSelect', NTreeSelect);
componentMap.set('Switch', NSwitch);
componentMap.set('RadioGroup', NRadioGroup);
componentMap.set('Checkbox', NCheckbox);
componentMap.set('CheckboxGroup', NCheckboxGroup);
componentMap.set('Cascader', NCascader);
componentMap.set('Slider', NSlider);
componentMap.set('Rate', NRate);
componentMap.set('Transfer', NTransfer);

componentMap.set('DatePicker', NDatePicker);
componentMap.set('TimePicker', NTimePicker);

componentMap.set('ColorPicker', NColorPicker);
componentMap.set('Upload', NUpload);

export { componentMap };
