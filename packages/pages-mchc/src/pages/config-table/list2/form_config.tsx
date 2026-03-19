import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { peek_provoke } from "@lm_fe/provoke";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
const React = ctx.React
export default defineFormConfig([

    { label: 'id', name: 'id', form_hidden: true },
    { label: '姓名', name: 'firstName', inputType: 'Input', layout: '1/3' },
    {
        "title": "类型",
        "dataIndex": "userType",
        "inputType": "MS",
        "width": 96,
        "inputProps": {
            "options": "临时用户,永久用户",
            "marshal": 0
        },
        "layout": "1/3"
    },
    {
        title: '活跃状态',
        dataIndex: 'activated',
        inputType: 'MSW',
        layout: '1/3',
        render(value, rowData, index) {

            return <ctx.ui.Switch value={value} onChange={v => {
                rowData.activated = v
                ctx.request.put('/api/users', rowData).then(() => ctx.props.table_helper.handleSearch())
            }} />
        },
    },
    {
        label: '跳转按钮',
        name: 'id',
        isActive: 0,
        render(value, rowData, index) {
            return ctx.ui.render_btn('跳跳', e => { ctx.safeTo('/prenatal-visit/pregnancy/list') })
        },

    },
    {
        title: '修改行数据',
        dataIndex: 'id',
        isActive: 0,

        render(value, rowData, index) {

            return ctx.ui.render_btn('修改姓名', e => {
                ctx.modal().
                    open('modal_form', {
                        width: '40vw',
                        styles: { body: { height: '40vh', } },
                        modal_data: {

                            onSubmit(new_data: any, old_data: any) {
                                return ctx.request.put('/api/users', new_data).then(() => {
                                    ctx.props.table_helper.handleSearch()
                                    return 1
                                })
                            },
                            getInitialData() {
                                return Promise.resolve(rowData)
                            },
                            formDescriptions: [
                                {
                                    label: 'id',
                                    name: 'id',
                                    inputProps: { disabled: true },
                                    layout: '1/1',
                                },
                                {
                                    label: '姓名',
                                    name: 'firstName',
                                    layout: '1/1',
                                },



                            ]
                        }
                    })
            })
        },
    },
    {
        title: '修改id=1数据',
        dataIndex: 'id',
        isActive: 0,

        render(value, rowData, index) {

            return ctx.ui.render_btn('修改姓名', e => {
                ctx.modal().
                    open('modal_form', {
                        width: '40vw',
                        styles: { body: { height: '40vh', } },
                        modal_data: {

                            onSubmit(new_data: any, old_data: any) {
                                return ctx.request.put('/api/users', new_data).then(() => {
                                    ctx.props.table_helper.handleSearch()
                                    return 1
                                })
                            },
                            getInitialData() {
                                return ctx.request.get('/api/users/1').then(res => {
                                    return res.data
                                })
                            },
                            formDescriptions: [
                                {
                                    label: 'id',
                                    name: 'id',
                                    inputProps: { disabled: true },
                                    layout: '1/1',
                                },
                                {
                                    label: '姓名',
                                    name: 'firstName',
                                    layout: '1/1',
                                },



                            ]
                        }
                    })
            })
        },
    },
    { inputType: 'check_invert_button', layout: '1/3', hidden: true },





])