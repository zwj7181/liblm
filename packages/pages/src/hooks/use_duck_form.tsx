import { MyFormSectionForm, OkButton } from "@lm_fe/components_m";
import { mchcEnv } from "@lm_fe/env";
import { ModelService, TIdTypeCompatible } from "@lm_fe/service";
import { AnyObject } from "@lm_fe/utils";
import { Form, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BF_Wrap2, IBF_props } from "../components";

export interface IDuckFormConf {
    init_values: AnyObject & { id?: TIdTypeCompatible }
    name: string
    bf_conf: IBF_props
    save_cb?(): void
    [x: string]: any
}

export function use_duck_form(props: IDuckFormConf) {
    const { init_values, name, save_cb, bf_conf } = props
    const { Wrap, config } = BF_Wrap2(bf_conf, props)
    const [form] = Form.useForm()
    const fetcher = useRef(new ModelService({ n: name }))
    const [remote_data, set_remote_data] = useState({})
    useEffect(() => {
        const id = init_values.id
        if (id) {
            fetcher.current
                .getOne(id)
                .then(d => {
                    form.setFieldsValue(d)
                    set_remote_data(d)
                })
        } else {
            form.setFieldsValue(init_values)
        }

        return () => {

        }
    }, [])
    function save() {
        fetcher
            .current
            .postOrPut(Object.assign(init_values, remote_data, form.getFieldsValue()))
            .then(() => mchcEnv.success('操作成功！'))
            .then(save_cb)
    }
    const node = <Wrap>
        <MyFormSectionForm form={form} formDescriptions={config?.tableColumns} />
        <Space.Compact style={{ position: 'fixed', right: 24, bottom: 24 }}>
            <OkButton btn_text="提交" onClick={save} />
        </Space.Compact>
    </Wrap>

    return {
        node,
        form,
        fetcher
    }


}