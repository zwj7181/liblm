import { Select_L } from "@noah-libjs/components"
import { SelectProps, Radio } from "antd"
import React from "react"


export default function SimpleSelect(props: SelectProps<any> & { optionsArr: string[], type?: 'Select' | 'Radio' }) {
    const { optionsArr, type = 'Select', ...others } = props
    if (type === 'Select') return <Select_L {...others} options={optionsArr.map((label, value) => ({ label, value }))} />
    //@ts-ignore
    return <Radio.Group {...others} options={optionsArr.map((label, value) => ({ label, value }))} />
}
