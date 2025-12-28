import { Checkbox } from 'antd';
import GeneralComponents_InputWithLabel from '../../GeneralComponents/InputWithLabel';
import MultipleInputWithLabel from '../../GeneralComponents/MultipleInputWithLabel';
import { TOption } from './types';

import { pack_components } from '@lm_fe/components';
import { AnyObject } from '@lm_fe/utils';
export const componentMap: { [x in TOption['inputType']]: any } = {
    // MyAutoComplete,
    // MA: MyAutoComplete,
    InputWithLabel: GeneralComponents_InputWithLabel,
    MultipleInputWithLabel,
    // CusDatePicker,
    // DatePicker: CusDatePicker,
    CheckboxGroup: Checkbox.Group,
    // InputNumber: MyInputNumber,
    // MyInputNumber,
    // input_number: MyInputNumber,
    // CheckboxWithInput: MyCheckbox,
    // MyCheckbox,
    // Checkbox: MyCheckbox,
    // MC: MyCheckbox,
    // MySelect,
    // MS: MySelect,
    ...pack_components,

}
export const displayComponentMap: AnyObject = {

    // CheckboxWithInput: MyCheckbox,
}


