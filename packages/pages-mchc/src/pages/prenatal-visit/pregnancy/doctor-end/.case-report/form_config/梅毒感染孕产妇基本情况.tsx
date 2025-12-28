import { rt_ctx } from '@lm_fe/env'
import { defineFormConfig } from '@lm_fe/service'
import { base_conf, base_conf_info } from './base'
const ctx = rt_ctx
export default defineFormConfig([
    ...base_conf(),
    {
        title: '',
        inputType: 'MyButton',
        inputProps: {
            btn_text: '同步基本信息',
            on_btn_click(e, form) {
                if (form)
                    ctx.request
                        .get('/api/ic/getBaseInfo', {
                            params: { pregnancyId: form.getFieldValue('pregnancyId'), name: 'IC_SYPHILIS_PATIENT' },
                        })
                        .then(r => {
                            form.setFieldsValue({ icSyphilisPatient: r.data })
                        })
            },
        },
        span: 3

    },
    {
        inputType: 'MyButton',
        disabledDeps: { id(v) { return !v } },
        inputProps: {
            btn_text: '打印',
            on_btn_click(e, form) {
                if (form) {
                    const values = form.getFieldsValue()
                    ctx.print({
                        url: '/api/ic/pdf-preview',
                        data: {
                            resource: 'adIndividualCaseCard',
                            template: values.code,
                            id: values.id,
                        }
                    })
                }
            },
        },
        span: 3

    },
    {
        "title": "孕产妇登记卡-基本信息",
        "children": [
            ...base_conf_info('icSyphilisPatient'),

            {
                "label": "既往不良妊娠结局",
                layout: '1/3',
                inputProps: { size: 'small' },
                inputType: 'straw',
                children: [
                    {
                        key: 'icSyphilisPatient.adversePregnancy',
                        inputType: 'MS',
                        "inputProps": {
                            marshal: 0,
                            width: 90,
                            'options': [
                                { 'value': 1, 'label': '无', },
                                { 'value': 2, 'label': '自然流产', },
                                { 'value': 3, 'label': '死胎死产', },
                                { 'value': 4, 'label': '早产', },
                                { 'value': 5, 'label': '出生缺陷', },
                                { 'value': 6, 'label': '其他', }]
                        },


                    },
                    {
                        key: 'icSyphilisPatient.adversePregnancyNote',
                        inputType: 'MA',
                        inputProps: {
                            width: 120,

                        },
                        showDeps: { ['icSyphilisPatient.adversePregnancy'](v) { return v > 1 } }
                    },
                ]
            },

            {
                key: 'icSyphilisPatient.lmp',
                "label": "本次妊娠末次月经",
                "inputType": "single_date_picker",
                layout: '1/3',

            }, {
                key: 'icSyphilisPatient.edd',
                "label": "预产期",
                "inputType": "single_date_picker",
                layout: '1/3',

            }, {
                key: 'icSyphilisPatient.gestationalWeek',
                "label": "初检孕周",
                "inputType": "input",
                layout: '1/3',

            }]
    }, {
        "title": "孕产妇梅毒感染情况",
        "children": [



            {
                key: 'icSyphilisPatient.preSyphilis',
                "label": "既往诊断为梅毒",
                "inputType": "MS",
                "inputProps": { options: [{ value: 2, label: '否' }, { value: 1, label: '是' }], marshal: 0 },
                layout: '1/3',

            }, {
                key: 'icSyphilisPatient.preSyphilisDate',
                "label": "诊断时间",
                "inputType": "DatePicker",
                inputProps: { unknown: true },
                layout: '1/3',

            },

            {
                "label": "本次诊断梅毒感染时期",
                layout: '1/3',
                inputProps: { size: 'small' },
                inputType: 'straw',
                children: [
                    {
                        key: 'icSyphilisPatient.syphilis',
                        inputType: 'MS',
                        "inputProps": {
                            marshal: 0,
                            width: 90,
                            'options': [
                                { 'value': 1, 'label': '孕期', },
                                { 'value': 2, 'label': '产时', },
                                { 'value': 3, 'label': '产后', },
                                { 'value': 4, 'label': '其他', },

                            ]
                        },


                    },
                    {
                        key: 'icSyphilisPatient.syphilisNote',
                        inputType: 'MA',
                        inputProps: {
                            width: 120,

                        },
                        showDeps: { ['icSyphilisPatient.syphilis'](v) { return v === 1 || v == 4 } }
                    },
                ]
            },

            {
                key: 'icSyphilisPatient.syphilisDate',
                "label": "本次诊断感染时间",
                "inputType": "single_date_picker",
                inputProps: { unknown: true },
                span: 12,

            }, {
                key: 'icSyphilisPatient.syphilisStage',
                "label": "本次诊断分期",
                "inputType": "MS",
                "inputProps": { options: '隐性,一期,二期,三期,不详', marshal: 0 },
                span: 12,


            }, {
                key: 'icSyphilisPatient.syphilisWay',
                "label": "最可能的梅毒感染途径",
                "inputType": "MS",
                "inputProps": {
                    marshal: 0,
                    'options': [
                        { 'value': 1, 'label': '性传播', },
                        { 'value': 2, 'label': '血液传播', },
                        { 'value': 3, 'label': '母婴传播', },
                        { 'value': 4, 'label': '不详', },
                        { 'value': 5, 'label': '其他', }
                    ]
                },
                span: 12,


            }, {
                key: 'icSyphilisPatient.husbandSyphilis',
                "label": "现任丈夫/性伴目前的梅毒感染状况",
                "inputType": "MS",
                "inputProps": { options: '未检测,未感染,感染,检测结果不详,是否检测不详', marshal: 0 },
                span: 12,


            }, {
                key: 'icSyphilisPatient.husbandSyphilisDate',
                "label": "现任丈夫/丈夫/性伴的梅毒诊断时间",
                "inputType": 'MyDatePicker',
                "inputProps": { unknown: true },

                span: 12,


            }]
    }, {
        "title": "孕产妇本次妊娠梅毒实验室诊断依据",
        "children": [{
            key: 'icSyphilisPatient.syphilisTestDate',
            "label": "梅毒螺旋体血清试验时间",
            "inputType": "single_date_picker",
            "inputProps": { unknown: true },
            span: 12,


        }, {
            key: 'icSyphilisPatient.syphilisTest',
            "label": "梅毒螺旋体血清试验方法",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': [{ 'value': 1, 'label': 'TPPA', }, { 'value': 2, 'label': 'ELISA', }, { 'value': 3, 'label': 'CLIA', }, { 'value': 4, 'label': 'RT', }, { 'value': 5, 'label': '其他', }] },
            span: 12,

        }, {
            key: 'icSyphilisPatient.nonSyphilisTestDate',
            "label": "非梅毒螺旋体血清试验时间",
            "inputType": "single_date_picker",
            "inputProps": { 'placeholder': '请输入非梅毒螺旋体血清试验时间' },
            span: 12,

        }, {
            key: 'icSyphilisPatient.nonSyphilisTest',
            "label": "非梅毒螺旋体血清试验方法",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': [{ 'value': 1, 'label': 'RPR', }, { 'value': 2, 'label': 'TRUST', }, { 'value': 3, 'label': '其他', }] },
            span: 12,

        }, {
            key: 'icSyphilisPatient.nonSyphilisTiter',
            "label": "滴度结果",
            "inputType": "input",
            "inputProps": { 'placeholder': '请输入滴度结果' },
            span: 12,

        }, {
            key: 'icSyphilisPatient.darkSyphilis',
            "label": "暗视野显微镜梅毒螺旋体检测",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': [{ 'value': 1, 'label': '未检', }, { 'value': 2, 'label': '已检', }] },
            span: 12,

        }, {
            key: 'icSyphilisPatient.darkSyphilisResult',
            "label": "检测到梅毒螺旋体",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': [{ 'value': 1, 'label': '是', }, { 'value': 2, 'label': '否', }] },
            span: 12,

        }]
    }, {
        "title": "报告信息",
        "children": [{
            key: 'icSyphilisPatient.reportOrganization',
            "label": "报告单位",
            "inputType": "input",
            layout: '1/3',

        }, {
            key: 'icSyphilisPatient.reportTelephone',
            "label": "联系电话",
            "inputType": "input",
            layout: '1/3',

        }, {
            key: 'icSyphilisPatient.reportDoctor',
            "label": "报告医生",
            "inputType": "input",
            layout: '1/3',

        }, {
            key: 'icSyphilisPatient.reportDate',
            "label": "填报日期",
            "inputType": "single_date_picker",
            layout: '1/3',

        }, {
            key: 'icSyphilisPatient.reportNote',
            "label": "备注",
            "inputType": "input",
            layout: '2/3',

        }]
    }
])