
import { IMchc_FormDescriptions_Field } from '@lm_fe/service';
import { ButtonProps, FormInstance } from 'antd';
import { IFormSectionFormProps } from '../FormSection/FormSectionForm';


export interface IToggleFormProps<T = any> {
    value?: T
    title?: string,
    onChange(data: T): void
    btnProps?: ButtonProps
    formSectionFormProps: IFormSectionFormProps
    formDescriptions: IMchc_FormDescriptions_Field[]
    defaultValue?: any
    form?: FormInstance
    plainForm?: boolean
}


