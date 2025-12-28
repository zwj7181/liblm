import { rt_ctx } from '@lm_fe/env'
import { defineFormConfig } from '@lm_fe/service'
import { base_conf, base_conf_info } from './base'
const ctx = rt_ctx
export default defineFormConfig([
    ...base_conf(),
    {
        inputType: 'MyButton',
        inputProps: {
            btn_text: '同步基本信息',
            on_btn_click(e, form) {
                if (form)
                    ctx.request
                        .get('/api/ic/getBaseInfo', {
                            params: { pregnancyId: form.getFieldValue('pregnancyId'), name: 'IC_HIV_PATIENT' },
                        })
                        .then(r => {
                            form.setFieldsValue({ icHivPatient: r.data })
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
        "name": "基本信息",
        "children": [
            ...base_conf_info('icHivPatient'),
        ]
    }, {
        "name": "艾滋病病毒感染相关情况",
        "children": [{
            key: 'icHivPatient.infectHiv',
            "label": "本次妊娠前是否已知HIV感染",
            "inputType": "MS",
            span: 12,
            "inputProps": { marshal: 0, 'options': [{ 'value': 1, 'label': '是', }, { 'value': 2, 'label': '否', }] },
        }, {
            key: 'icHivPatient.infectHivGravidity',
            "label": "本次是确诊HIV后第几次妊娠",
            span: 12,

            "inputType": "input_number",
        }, {
            key: 'icHivPatient.infectPeriod',
            "label": "既往确诊艾滋病感染时所处的服务时期",
            "inputType": "MS",
            span: 12,
            isNewRow: true,
            "inputProps": { marshal: 0, 'options': '婚前检查,人工流产,引产,孕期保健,产时,产后,其他', useDefault: false },
        }, {
            key: 'icHivPatient.infectPeriodNote',
            "label": "其他说明",
            "inputType": "input",
            showDeps: { ['icHivPatient.infectPeriod']: [7] },
            span: 12,



        }, {
            key: 'icHivPatient.diagnosisDate',
            "label": "确诊艾滋病病毒感染时间",
            "inputType": "single_date_picker",
            span: 12,

        }, {
            key: 'icHivPatient.currentInfectPeriod',
            "label": "本次接受艾滋病检测服务所处的时期",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': '婚前检查,人工流产,引产,孕期保健,产时,产后,其他', useDefault: false },

            span: 12,

        }, {
            key: 'icHivPatient.infectWay',
            "label": "最可能的艾滋病病毒感染途径",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': '注射毒品,性传播,采血（浆）,输血/血制品,母婴传播,职业暴露,不详,其他', useDefault: false },

            span: 12,

        }, {
            key: 'icHivPatient.infectWayNote',
            "label": "其他说明",
            "inputType": "input",
            showDeps: {
                ['icHivPatient.infectWay'](v) {
                    return v == 8
                }
            },
            span: 12

        },
        {
            key: 'icHivPatient.riskBehavior',
            "label": "相关危险行为",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': '无,与HIV感染配偶或男友的性生活,多性伴,商业性行为,注射吸毒,有偿采供血,输血或使用血制品,纹身或穿耳等身体刺伤,意外伤害,职业暴露,医源性感染,不详,其他', useDefault: false },
            span: 12,
        },
        {
            key: 'icHivPatient.riskBehaviorNote',
            "label": "相关危险行为备注",
            "inputType": "MA",
            showDeps: {
                ['icHivPatient.riskBehavior'](v) {
                    return v > 0
                }
            },
            span: 12,
        },
        {
            key: 'icHivPatient.lmp',
            "label": "本次妊娠末次月经时间",
            "inputType": "single_date_picker",
            layout: '1/3',
        }, {
            key: 'icHivPatient.edd',
            "label": "预产期",
            "inputType": "single_date_picker",
            layout: '1/3',

        }, {
            key: 'icHivPatient.gestationalWeek',
            "label": "初检孕周",
            "inputType": "input",
            layout: '1/3',

        }]
    }, {
        "name": "丈夫/性伴检测情况",
        "children": [{
            key: 'icHivPatient.husbandHiv',
            "label": "HIV检测情况",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': [{ 'value': 1, 'label': '未检测', }, { 'value': 2, 'label': '检测', }, { 'value': 3, 'label': '不详', }] },
            layout: '1/3',

        }, {
            key: 'icHivPatient.husbandHivResult',
            "label": "HIV检测结果 ",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': [{ 'value': 1, 'label': '阴性', }, { 'value': 2, 'label': '阳性', }, { 'value': 3, 'label': '不详', }] },
            layout: '1/3',

        }, {
            key: 'icHivPatient.husbandInfectDate',
            "label": "明确感染的时间",
            "inputType": "MyDatePicker",
            inputProps: { unknown: true },
            layout: '1/3',

        },
        {
            key: 'icHivPatient.husbandInfectWay',
            "label": "最可能的艾滋病病毒感染途径",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': '注射毒品,性传播,采血（浆）,输血/血制品,母婴传播,职业暴露,不详,其他', useDefault: false },

            span: 12
        },
        {
            key: 'icHivPatient.husbandInfectWayNote',
            "label": "其他说明",
            "inputType": "input",
            showDeps: {
                ['icHivPatient.husbandInfectWay'](v) {
                    return v == 8
                }
            },
            span: 12

        },
        {
            key: 'icHivPatient.husbandRiskBehavior',
            "label": "相关危险行为",
            "inputType": "MS",
            "inputProps": { marshal: 0, 'options': '无,多性伴,嫖娼,同性性行为,注射吸毒,有偿采供血,输血或使用血制品,纹身或穿耳等身体刺伤,意外伤害,职业暴露,医源性感染,不详,其他', useDefault: false },
            span: 12,
        },
        {
            key: 'icHivPatient.husbandRiskBehaviorNote',
            "label": "相关危险行为备注",
            "inputType": "MA",
            showDeps: {
                ['icHivPatient.husbandRiskBehavior'](v) {
                    return v > 0
                }
            },
            span: 12,
        },
        ]



    }, {
        "name": "报告信息",
        "children": [{
            key: 'icHivPatient.reportOrganization',
            "label": "报告单位",
            "inputType": "input",
            layout: '1/3',
        }, {
            key: 'icHivPatient.reportTelephone',
            "label": "联系电话",
            "inputType": "input",
            layout: '1/3',

        }, {
            key: 'icHivPatient.reportDoctor',
            "label": "报告医生",
            "inputType": "input",
            layout: '1/3',

        }, {
            key: 'icHivPatient.reportDate',
            "label": "报告日期",
            "inputType": "single_date_picker",
            layout: '1/3',

        }, {
            key: 'icHivPatient.reportNote',
            "label": "备注",
            "inputType": "text_area",
            layout: '2/3',

        }]
    }
])