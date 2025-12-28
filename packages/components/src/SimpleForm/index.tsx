import { lazy } from "react"
import { SimpleFormProps } from "./types"
import { FormInstance } from "antd"
import { Rule } from "antd/es/form"
export * from './types'
const Inner = lazy(() => import('./Inner'))

type InternalFormType = React.ForwardRefExoticComponent<SimpleFormProps & React.RefAttributes<FormInstance<any>>>
export interface SimpleFormType extends InternalFormType {
    getPresetRules: (name: keyof typeof basicRules, required?: boolean) => Rule[]
    requiredRules: Rule[]
}


//@ts-ignore
const SimpleForm: SimpleFormType = Inner
SimpleForm.getPresetRules = (name, required) => {
    return [
        {
            required,
            ...basicRules[name],
        },
    ]
}
SimpleForm.requiredRules = [{ required: true, message: '' }]
const basicRules = {
    telephone: {
        validator: (_: any, value: any) =>
            /^1([0-9][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value) ? Promise.resolve() : Promise.reject(),
        message: '请输入手机号',
    },
}

export { SimpleForm }