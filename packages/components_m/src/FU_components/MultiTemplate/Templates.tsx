import { Button, Col, Empty, Form, Input, Row, Space, Tabs } from 'antd';
import React, { Children, useEffect, useRef, useState } from 'react';
import { IMultiTemplateProps, IMultiTemplateType, IRemoteTemplates } from './types';
import { isEmpty, request } from '@lm_fe/utils';
import { MyFormSectionForm } from '../FormSection/FormSectionForm';

const SPLIT_KEY = ' / '
export function MultiTemplateTemplateGroup(props: IMultiTemplateProps) {
    const { value = '', btn_text = '导入', onChange, style, type, MultiTemplate_type = [], modal_props = {}, rows = 3, disabled, defaultExpandAll, canOperate, ...others } = props
    const [_value, set_value] = useState(value)
    const [active_group, set_active_group] = useState(MultiTemplate_type[0])
    useEffect(() => {
        if (active_group) {

        }
    }, [active_group])



    return <Tabs activeKey={active_group?.label} items=
        {MultiTemplate_type.map(_ => {
            return {
                label: _.label,
                key: _.label,
                children: <ActiveTemplates parent_props={props} item={_} />
            }
        })} />
}
function ActiveTemplates(props: { item: IMultiTemplateType, parent_props: IMultiTemplateProps }) {
    const { item, parent_props } = props
    const { url = '/api/multiTemplate', fds = [] } = parent_props
    const [templates, set_templates] = useState<IRemoteTemplates>()
    const [active, set_active] = useState<IRemoteTemplates['data'][number]>()
    const [title_to_add, set_title_to_add] = useState('')
    const [form] = Form.useForm()


    useEffect(() => {
        fetch_data()
    }, [item])

    function fetch_data() {
        if (item) {
            request
                // .get<IRemoteTemplates[]>(url, { params: item.params })
                .get<IRemoteTemplates[]>(url, { params: { 'type.equals': item?.params?.type } })
                .then(res => {
                    const res_data = res.data[0]
                    set_templates(res_data)
                    select_template(res_data?.data?.[0])
                })
        }
    }

    function op_init() {
        request
            .post<IRemoteTemplates>(url, { ...item.params, data: [] }, { successText: '操作成功' })
            .then(res => set_templates(res.data))
    }
    function op_add() {
        if (!templates) return
        request
            .put<IRemoteTemplates>(url, { ...templates, data: [...templates.data, { title: title_to_add }] }, { successText: '操作成功' })
            .then(res => {
                set_templates(res.data)
                set_title_to_add('')
            })
    }
    function op_edit() {
        if (!active || !templates) return
        const form_data = form.getFieldsValue()
        console.log('form_data', form_data)
        const old = templates.data.find(_ => _.title === active.title) ?? {}
        Object.assign(old, form_data)
        request
            .put<IRemoteTemplates>(url, templates, { successText: '操作成功' })
            .then(res => {
                set_templates(res.data)
            })
    }
    function select_template(t: IRemoteTemplates['data'][number]) {
        set_active(t)
        form.resetFields()
        form.setFieldsValue(t)
    }
    return <div>
        {
            templates
                ? <Row>
                    <Col span={6} style={{ height: '60vh' }}>
                        <div style={{ height: 'calc(100% - 50px)' }}>
                            {
                                isEmpty(templates.data)
                                    ? <Empty />
                                    : templates.data?.map(t => {
                                        return <div onClick={() => select_template(t)} style={{ background: active?.title === t.title ? 'red' : '' }}>{t.title}</div>
                                    })
                            }
                        </div>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input onChange={e => set_title_to_add(e.target.value)} value={title_to_add} placeholder='请输入模板标题' />
                            <Button onClick={op_add} type="primary">添加</Button>
                        </Space.Compact>

                    </Col>
                    <Col span={18}>
                        <MyFormSectionForm form={form} formDescriptions={fds} data={active} />
                        <Button disabled={!active} onClick={op_edit} block>修改模板</Button>
                    </Col>
                </Row>
                : <Button onClick={op_init}>初始化{item.label}模板</Button>

        }

    </div>
}
