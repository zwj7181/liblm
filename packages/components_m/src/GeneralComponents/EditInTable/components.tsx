import { MyIcon, MyLazyComponent, Select_L } from "@lm_fe/components"
import { AnyObject, expect_array, request } from "@lm_fe/utils"
import { Button, Form, Popconfirm } from "antd"
import React, { useEffect, useState } from "react"
import { MyFormSectionForm } from "src/FU_components/FormSection/FormSectionForm"
import { IEditInTable_Row_Append_Config } from "./utils"

export function FFF(props: { arr: { recordTime: string, key: string }[], config: IEditInTable_Row_Append_Config, onSelect(values: any | any[]): void, hidden?: boolean, disabled?: boolean }) {
    const { config, onSelect, hidden, arr, disabled, } = props
    const { fds, processDataAsync, btnProps = {}, popProps = {}, process_url, process_args = {} } = config
    if (hidden) return null
    async function process(values: AnyObject, arr: any[]) {
        if (processDataAsync)
            return processDataAsync(values, arr)
        if (process_url)
            return (await request.post(process_url, { ...values, ...process_args }, { successText: '操作成功' })).data
        return values
    }
    const [form] = Form.useForm()
    return <Popconfirm

        {...popProps}
        onConfirm={async () => {
            let values = form.getFieldsValue()
            console.log('ssbb 0', { values })

            values = await process(values, arr)
            values = expect_array(values, [values ?? {}])
            onSelect(values)
        }}
        title={
            <MyFormSectionForm form={form} formDescriptions={fds.map(_ => ({
                ..._, inputProps:
                    Object.assign({}, _?.inputProps, {
                        popupStyle: { zIndex: 9999 },
                        dropdownStyle: { zIndex: 9999 },
                    })
            }))} />
        }>
        <Button disabled={disabled} type='dashed' icon={<MyIcon value="PlusOutlined" />} size='small' {...btnProps}>{btnProps.children}</Button>
    </Popconfirm>
}

export function CalInputOutput(props: { arr: { recordTime: string, key: string }[], onSelect(key: string): void, hidden?: boolean }) {
    const { arr, onSelect, hidden } = props
    const [selectKey, setSelectKey] = useState('')
    if (hidden) return null
    return <Popconfirm
        icon={'日期：'}
        onConfirm={() => {
            selectKey && onSelect(selectKey)
        }}
        title={
            <div>
                <Select_L style={{ width: 140 }} value={selectKey} dropdownStyle={{ zIndex: 9999 }} options={arr.map(_ => ({ label: _.recordTime, value: _.key }))} onSelect={setSelectKey} />
            </div>
        }>
        <Button size='small'>计算出入量</Button>
    </Popconfirm>
}

export
    function PopconfirmComponent({ children, C, value, onChange, CProps, onBlur }: { C: any, CProps: any, children?: any, value?: any, onChange?: any, onBlur?: any }) {
    const [_value, set_value] = useState()
    useEffect(() => {


        set_value(value)
    }, [value])

    return <Popconfirm icon={null} placement="right"
        // trigger='hover'

        style={{ zIndex: 999, }}
        styles={{ root: { zIndex: 999, } }}
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{ hidden: true }}
        title={
            <div style={{}}>
                <MyLazyComponent>
                    <C
                        // onBlur={() => {F
                        //   // onBlur(e)
                        //   message.info('blur')
                        //   onChange(_value)
                        // }}
                        {...CProps} value={_value} onChange={onChange} />
                </MyLazyComponent>

            </div>
        }>
        <div style={{ minHeight: 40 }}>
            {children}
        </div>
    </Popconfirm >
}
