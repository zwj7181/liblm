// TODO 将 所有的名命改为下划线名命法

import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { AnyObject } from "@lm_fe/utils";

// Checkbox
interface ExtraEditors {
  key: any;
  editors: FormConfig[];
}

interface RenderData {
  key: string;
  label: string;
  // 暂时仅用于custom
  options?: Array<{
    label: string | number | boolean;
    value: string | number | boolean;
  }>;
  extraEditors?: Array<ExtraEditors>;
}

// Table
interface TableColumns {
  key?: string;
  fixedKey?: string;
  title: string;
  children?: Array<TableColumns>;
  width?: number;
  editor?: FormConfig;
  suffix?: string;
  suffixNewLine?: boolean;
  selectOptions?: any;
  render?: any;
}

// input_props ??
export interface ComponentOption {
  type?: string | null;
  // select
  options?: Array<{
    value: string | number | boolean;
    label: string | number | boolean;
  }>;
  tags?: boolean;
  // date
  format?: string;
  picker?: string;
  // checkbox | select 公用
  radio?: boolean;
  extraEditors?: Array<ExtraEditors>;
  renderData?: Array<RenderData>;
  // table
  editable?: boolean;
  tableColumns?: Array<TableColumns>;
  hiddenBtn?: boolean;
  hiddenSelection?: boolean;
  isMerge?: boolean;
  ignoreKeys?: Array<String>;
  scroll?: any;
  pagination?: any;
  // ArrayCustom & Custom & ArrayCustomTab
  config?: FormConfig[];
  // ArrayCustomTab
  array_title?: string;
  // Button
  btn_text?: Array<string>;
  // input - template
  template_url?: string;
  template_type?: number;
  disabled?: boolean
}

export interface FormConfig extends IMchc_FormDescriptions_Field<true> {

  unit?: string;
  className?: string;
  header_label?: boolean;
  just_header?: boolean;
  is_new_row?: boolean;
  value?: any;
  unEditable?: boolean;
  labelSign?: any
  isIssue?: boolean
  rawKey: string
}

export interface MyFormProp {
  formHandler: any
  disabled_all?: boolean
  config: FormConfig[];
  value: any;
  getFormHandler?: (func: any) => void;
  submitChange: boolean;
  activeKey?: string;
  [key: string]: any;
}

export interface MyFormState {
  formHandler: any;
  myConfig: FormConfig[];
}

export interface FormItemProp {
  thisConfig: FormConfig

  disabled_all?: boolean
  config: FormConfig[];
  allValue?: AnyObject
  actions?: {
    setValue?: (val: any) => void;
    getValue?: () => any;
    valid?: () => any;
    reset?: () => void;
  };
  getActions: Function;
  dispatch: (fieldName: string, eventName: string, args: any) => void;
  subscribe: (fieldName: string, eventName: string, cb: Function) => void;
  value?: any;
  type: string;
  label: string;
  header_label: boolean;
  just_header: boolean;
  unit: string;
  input_props?: ComponentOption;
  validate?: [];
  path: string;
  name: string;
  className?: string;
  // 置为hidden 不可被修改与重置
  hidden: boolean;
  [key: string]: any;
}
export interface FormItemState {
  value: any;
  error: any;
  path: string;
  rules: [];
}
