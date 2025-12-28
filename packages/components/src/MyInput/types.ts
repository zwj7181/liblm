import { IMchc_FormDescriptions_Field } from '@lm_fe/service';
import { FormInstance, InputProps } from 'antd';




export interface IMyInputProps extends Omit<InputProps, 'value' | 'onChange' | 'form'> {
    value?: string
    onChange?(v: string): void
    form?: FormInstance
    config?: IMchc_FormDescriptions_Field
    warn?: boolean
}