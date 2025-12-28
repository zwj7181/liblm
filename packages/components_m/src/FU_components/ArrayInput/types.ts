import { ICommonOption } from '@lm_fe/env';
import { InputNumberProps } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { ICusDatePickerProps } from '../../GeneralComponents/DatePicker';
import { IInputWithLabelProps } from '../../GeneralComponents/InputWithLabel';
import { IMultipleInputWithLabelProps } from '../../GeneralComponents/MultipleInputWithLabel';
import { MyAutoCompleteProps } from '../MyAutoComplete';

import { IMyCheckboxProps, IMyInputProps } from '@lm_fe/components';
import { FocusEventHandler } from 'react';
import { IMySelectProps } from '../MySelect';





export type TOption =
    { inputType: 'MyAutoComplete', props?: MyAutoCompleteProps } |
    { inputType: 'MA', props?: MyAutoCompleteProps } |
    { inputType: 'MySelect', props?: IMySelectProps } |
    { inputType: 'MS', props?: IMySelectProps } |
    { inputType: 'InputWithLabel', props?: IInputWithLabelProps } |
    { inputType: 'MultipleInputWithLabel', props?: IMultipleInputWithLabelProps } |
    { inputType: 'CusDatePicker', props?: ICusDatePickerProps } |
    { inputType: 'DatePicker', props?: ICusDatePickerProps } |
    { inputType: 'MyInput', props?: IMyInputProps } |
    { inputType: 'Input', props?: IMyInputProps } |
    { inputType: 'input', props?: IMyInputProps } |
    { inputType: 'CheckboxGroup', props?: CheckboxGroupProps } |
    { inputType: 'InputNumber', props?: InputNumberProps } |
    { inputType: 'input_number', props?: InputNumberProps } |
    { inputType: 'MyInputNumber', props?: InputNumberProps } |
    { inputType: 'CheckboxWithInput', props?: IMyCheckboxProps } |
    { inputType: 'MyCheckbox', props?: IMyCheckboxProps } |
    { inputType: 'MC', props?: IMyCheckboxProps } |
    { inputType: 'Checkbox', props?: IMyCheckboxProps }

export interface IArrayInputProps {
    autoFocus?: boolean
    disabled?: boolean
    inputWidth?: number,
    value?: string
    uniqueKey?: string
    onChange?(v: string | any[]): void
    separator?: string
    marshal?: number
    onBlur?: FocusEventHandler<any>,
    options?: (TOption & ICommonOption)[]
    sp?: (TOption & ICommonOption)[]
}