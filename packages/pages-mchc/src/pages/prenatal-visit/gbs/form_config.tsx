import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
const React = ctx.React

const width = 66
export default defineFormConfig(
    [
        {
            label: '就诊卡号',
            inputType: 'PatientAutoComplete',
            dataIndex: 'outpatientNO',
            layout: '1/3',
            disabledDeps(f) {
                return !!f.getFieldValue('id')
            },
            inputProps: {
                onPatientAutoComplete(v, form) {
                    if (form) {
                        v.pregnancyId = v.id
                        v.id = undefined
                        form.setFieldsValue(v)
                    }
                },
            },
            // hidden: true,
        },
        {
            dataIndex: 'id',
            hidden: true,
            form_hidden: true
        },
        {
            dataIndex: 'pregnancyId',
            hidden: true,
            form_hidden: true
        },
        {
            title: '姓名',
            dataIndex: 'name',
            inputProps: { disabled: true },
            layout: '1/3',
            width,
            render(name, rowData, index) {
                return <ctx.ui.Button size='small' onClick={() => ctx.safeTo(`/prenatal-visit/pregnancy/doctor-end?id=` + rowData.pregnancyId)}>{name}</ctx.ui.Button>
            },
        },
        {
            title: '证件号码',
            dataIndex: 'idNO',
            inputProps: { disabled: true },
            layout: '1/3',
        },

        // {
        //     title: '就诊卡号',
        //     inputProps: { disabled: true },
        //     layout: '1/3',
        //     dataIndex: 'outpatientNO',
        // },
        {
            title: '年龄',
            dataIndex: 'age',
            inputProps: { disabled: true },
            layout: '1/3',
            width: width / 2,
            inputType: 'InputNumber'
        },
        {
            title: '孕周',
            width,
            dataIndex: 'gestationalWeek',
            layout: '1/3',
        },

        {
            title: '标本类别',
            dataIndex: 'sampleType',
            width,
            layout: '1/3',
        },
        {
            title: '标本编号',
            dataIndex: 'sampleNO',
            width,
            layout: '1/3',
        },
        {
            title: '验证时间',
            layout: '1/3',
            dataIndex: 'testTime',
            // width: APP_CONFIG.CELL_WIDTH_LARGE,
            inputType: 'DatePicker',
            inputProps: {
                showTime: true
            }
        },
        {
            isNewRow: 1,
            title: '诊断',
            width,
            layout: '2/3',
            dataIndex: 'diagnosis',
        },
        {
            title: '医生',
            layout: '2/3',
            dataIndex: 'doctor',
            width,
            "inputType": "textareaWithTemplate",
            inputProps: {
                TemplateTextarea_type: [
                    { title: '科室', type: 38, depid: 2 },
                ]
            },
        },
        {
            title: '操作人',
            layout: '2/3',
            width,
            dataIndex: 'operator',
            "inputType": "textareaWithTemplate",
            inputProps: {
                TemplateTextarea_type: [
                    { title: '科室', type: 37, depid: 2 },
                ]
            },
        },
        {
            title: '结果',
            layout: '2/3',
            width,
            inputType: 'MA',
            inputProps: { options: '阴性,阳性' },
            dataIndex: 'result',
        },



    ]
)