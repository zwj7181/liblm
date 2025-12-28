// import { ILmFormItemConfigMixin } from "@/lmTypes"
import { DatePicker_L, LazyAntd, RangePicker_L, TimePicker_L } from "@lm_fe/components";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { Form, FormInstance, Input, SelectProps, Space, Switch } from "antd";
import React from "react";
import CusDatePicker from "../../GeneralComponents/DatePicker";
import { MyFormSection } from "../FormSection";
import { ILmFormItemConfigMixin } from "../SimpleForm/types/lmTypes";
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

// import { ArrayInput } from "../ArrayInput";

// import { HospitalTreeSelect } from "../../demain-components/HospitalTreeSelect";
const m = {
    Input,
    Select,
    // HospitalTreeSelect,
    // ArrayInput: ArrayInput,
    RangePicker: RangePicker_L,
    DatePicker: DatePicker_L,
    MyDatePicker: CusDatePicker,
    TimePicker: TimePicker_L,
    Switch,
    SwitchSelect
}

export function MyBaseListRenderFormSection({ config, disabled, form }: { config: IMchc_FormDescriptions_Field_Nullable[], disabled?: boolean, form?: FormInstance }) {

    return (
        <MyFormSection form={form} defaultOptions={{}} inline formDescriptions={config.map(_ => {
            if (!_) return _
            const props = _.inputProps ?? _.props ?? {}
            props.allowClear = true
            if (['Select', 'select', 'MySelect', 'MS'].includes(_.inputType!) && !_.inputProps?.width) {
                props.width = 180
            }
            _.inputProps = props

            return _
        })} disableAll={disabled} />

    )
}
function SwitchSelect(props: SelectProps<any>) {
    const { value } = props
    return <Select {...props} value={typeof value === 'undefined' ? value : +value} options={['否', '是'].map((_, idx) => ({ label: _, value: idx }))} onChange={(a, b) => {
        props.onChange?.(typeof a === 'undefined' ? a : !!a, b)
    }} />
}