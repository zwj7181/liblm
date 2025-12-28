import { FormInstance, FormProps } from 'antd'
import { Rule } from 'antd/lib/form'

import { AllTypes } from './types/metaTypes'
type TLayoutType = 6 | 8 | 12 | 16 | 24
type TFormItemMix = AllTypes & { layoutType?: TLayoutType }

export interface SimpleFormProps {
    onValuesChange?: FormProps['onValuesChange']
    blocks?: {
        title?: string
        rows: IRowSchema[]
    }[]
    disabled?: boolean
    form?: FormInstance
    formProps?: FormProps
    formItems?: AllTypes[]
}
interface IRowSchema {
    itemsInRow: TFormItemMix[]
    layoutType?: TLayoutType
    label?: string
    disabled?: boolean
}


