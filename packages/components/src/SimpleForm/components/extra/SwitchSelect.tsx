import { Select_L } from "@noah-libjs/components";
import { SelectProps } from "antd";
import React from "react";
export { SelectProps }
export default function SwitchSelect(props: SelectProps<any>) {
    const { value } = props
    return <Select_L {...props} value={typeof value === 'undefined' ? value : +value} options={['否', '是'].map((_, idx) => ({ label: _, value: idx }))} onChange={(a, b) => {
        props.onChange?.(typeof a === 'undefined' ? a : !!a, b)
    }} />
}




