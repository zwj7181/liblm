import { IMyCheckboxProps, IMyInputProps } from '@lm_fe/components';
import { ICommonOption, T_FETCH_OPTIONS } from '@lm_fe/env';
import { AutoCompleteProps, InputNumberProps, SelectProps } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { ICusDatePickerProps } from '../../GeneralComponents/DatePicker';
import { IInputWithLabelProps } from '../../GeneralComponents/InputWithLabel';
import { IMultipleInputWithLabelProps } from '../../GeneralComponents/MultipleInputWithLabel';




interface IBase<T, P> {
    inputType: T
    props: P
    text: string
}


export type TOption =
    IBase<'AutoComplete', AutoCompleteProps> |
    IBase<'InputWithLabel', IInputWithLabelProps> |
    IBase<'MultipleInputWithLabel', IMultipleInputWithLabelProps> |
    IBase<'CusDatePicker', ICusDatePickerProps> |
    IBase<'DatePicker', ICusDatePickerProps> |
    IBase<'MyInput', IMyInputProps> |
    IBase<'CheckboxGroup', CheckboxGroupProps> |
    IBase<'InputNumber', InputNumberProps> |
    IBase<'CheckboxWithInput', IMyCheckboxProps>



export interface IMySelectProps extends Omit<SelectProps<any>, 'options'> {
    // options?: (Partial<TOption> & { prefix?: string, suffix?: string, label: string, value: any, warning?: boolean })[]
    type?: 'multiple' | 'tags';
    options?: ICommonOption[]
    uniqueKey?: string
    value?: any;
    onChange?(v: any): void;
    marshal?: number
    startIndex?: number
    useString?: boolean
    fetch_options?: T_FETCH_OPTIONS
}