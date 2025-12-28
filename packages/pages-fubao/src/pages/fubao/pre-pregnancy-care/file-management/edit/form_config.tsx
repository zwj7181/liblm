import { ICommonOption, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
const 无有option: ICommonOption[] = [
    { label: '无', value: 1 },
    { label: '有', value: 2, warning: true, inputType: 'MI' }
]
export default defineFormConfig(
    [
        {
            key: 'id',
            form_hidden: true
        },
        {
            key: 'womanProgestationCheckArchivesDetailVM.id',
            form_hidden: true

        },
        {
            form_hidden: true,
            key: 'manProgestationCheckArchivesDetailVM.id',

        },
        {
            "name": "女方信息",
            "children": [{
                "key": "womanName",
                "label": "姓名",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入姓名' },
                layout: '1/3',
            }, {
                "key": "womanOutpatientNo",
                "label": "门诊号",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入门诊号' },
                layout: '1/3',
            },
            {
                "key": "__obdriver_read",
                "inputType": 'IdNOButton',
                label: '外设读取',
                layout: '1/3',
            },

            {
                "key": "womanTelephone",
                "label": "电话号码",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入电话号码' },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.idType",
                "label": "证件类型",

                "inputType": "MS",
                inputProps: { uniqueKey: '证件类型', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.idNO",
                "label": "证件号码",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入证件号码' },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.dob",
                "label": "出生日期",
                "inputType": "single_date_picker",

                "inputProps": { 'placeholder': '请输入出生日期', 'maxDate': 'now' },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.ethnic",
                "label": "民族",
                "inputType": "MS",
                inputProps: { uniqueKey: '民族s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "womanAge",
                "label": "年龄",
                "inputType": "input_number",

                "inputProps": { 'placeholder': '请输入年龄' },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.permanentResidence",
                "label": "籍贯",
                "inputType": "MS",
                inputProps: { uniqueKey: '省份s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.education",
                "label": "文化程度",
                "inputType": "MS",
                inputProps: { uniqueKey: '文化程度s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.profession",
                "label": "职业",
                "inputType": "MS",
                inputProps: { uniqueKey: '职业s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.nationality",
                "label": "国籍",
                "inputType": "country_select",

                "inputProps": { 'placeholder': '请输入国籍' },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.menarche",
                "label": "初潮(岁)",
                "inputType": "input_number",

                "inputProps": { 'placeholder': '请输入初潮' },
                layout: '1/3'
                ,
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.menstrualCycle",
                "label": "月经周期(天)",
                "inputType": "input_number",

                "inputProps": { 'placeholder': '请输入月经周期' },
                layout: '1/3'
                ,
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.menstrualPeriod",
                "label": "月经持续天数",
                "inputType": "input_number",

                "inputProps": { 'placeholder': '请输入月经持续天数' },
                layout: '1/3'
                ,
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.menstrualVolume",
                "label": "经量",
                "inputType": "checkbox_group",

                "specialConfig": { 'type': 'single', 'options': [{ 'value': '多', 'label': '多', 'withInput': false, 'span': 6 }, { 'value': '中', 'label': '中', 'withInput': false, 'span': 6 }, { 'value': '少', 'label': '少', 'withInput': false, 'span': 6 }] },
                "inputProps": { 'placeholder': '请输入经量' },
                layout: '1/3'
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.dysmenorrhea__",
                "label": "痛经",
                "inputType": "MC",
                required: () => ctx.required,
                inputProps: { options: 无有option },
                layout: '1/3',
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.gravidity",
                "label": "孕次",
                "inputType": "input_number",

                "inputProps": { 'placeholder': '请输入孕次' },
                layout: '1/3'
                ,
            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.parity",
                "label": "产次",
                "inputType": "input_number",

                "inputProps": { 'placeholder': '请输入产次' },
                layout: '1/3'
                ,
            },
            {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.permanentResidenceAddress",
                "label": "户口地址",
                "inputType": "MyAddress",

                "inputProps": { 'placeholder': '请输入户口地址' },
                layout: '2/3',
                isNewRow: 1,

            }, {
                "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.residenceAddress",
                "label": "居住地址",
                "inputType": "MyAddress",

                "inputProps": {
                    addressBtns: [
                        { name: 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.permanentResidenceAddress', label: '同上' },
                    ]
                },
                layout: '2/3',
                isNewRow: 1,
            },
            {
                "label": "个人史",
                children: [
                    {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.previousHistory__",
                        "label": "既往史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.surgeryHistory__",
                        "label": "手术史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.presentIllness__",
                        "label": "现病史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.contactHazardousSubstances__",
                        "label": "接触有害物质",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.contactRadioactiveRays__",
                        "label": "接触放射线",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.contraception__",
                        "label": "避孕措施",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.personalSmoke__",
                        "label": "吸烟",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.personalDrink__",
                        "label": "饮酒",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.personalOther",
                        "label": "其他",
                        "inputType": "input",

                        "inputProps": { 'placeholder': '请输入其他' },
                        layout: '1/3',
                    },
                    {
                        "inputType": "check_invert_button",
                        "layout": "1/3"
                    },
                ]

            },
            {
                "label": "家族史",

                children: [
                    {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.familyHeritableDisease__",
                        "label": "遗传疾病",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.familyPsychosis__",
                        "label": "精神病",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.birthDefects__",
                        "label": "先天畸形",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.familyHistoryOther",
                        "label": "其他",
                        "inputType": "input",

                        "inputProps": { 'placeholder': '请输入其他' },
                        layout: '1/3'
                    },
                    {
                        "inputType": "check_invert_button",
                        "layout": "1/3"
                    },
                ]

            },
            {
                "name": "女方体格检查",
                "children": [{
                    "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.weight",
                    "label": "体重(kg)",
                    "inputType": "input_number",
                    processLocal(v, form) {
                        if (form) {
                            const values = form.getFieldsValue()
                            const height = ctx.utils.get<number>(values, 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.height')
                            form.setFieldsValue({
                                womanProgestationCheckArchivesDetailVM: {
                                    progestationCheckArchivesPhysicalExamination: {
                                        bmi: ctx.utils.calc_bmi(v, height)
                                    }
                                }
                            })
                        }
                    },

                    layout: '1/3',
                },
                {
                    "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.height",
                    "label": "身高(cm)",
                    "inputType": "input_number",
                    processLocal(v, form) {
                        if (form) {
                            const values = form.getFieldsValue()

                            const weight = ctx.utils.get<number>(values, 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.weight')

                            form.setFieldsValue({
                                womanProgestationCheckArchivesDetailVM: {
                                    progestationCheckArchivesPhysicalExamination: {
                                        bmi: ctx.utils.calc_bmi(weight, v)
                                    }
                                }
                            })
                        }
                    },
                    layout: '1/3',
                }, {
                    "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.bmi",
                    "label": "BMI",
                    "inputType": "InputNumber",

                    "specialConfig": { 'tip': 'BMI的正常范围值是18.5~24.9kg/㎡', 'min': 18.5, 'max': 24.9 },
                    "inputProps": { 'placeholder': '请输入BMI', 'disabled': true },
                    layout: '1/3',
                },

                {

                    "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.systolic",
                    layout: '1/3',
                    inputType: 'InputNumber',
                    "label": "收缩压(mmHg)",

                },
                {

                    "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.diastolic",
                    "label": "舒张压(mmHg)",
                    inputType: 'InputNumber',
                    layout: '1/3',
                },

                {
                    "key": "womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.heartRate",
                    "label": "心率(次/分钟)",
                    "inputType": "input_number",

                    "inputProps": { 'placeholder': '请输入心率' },
                    layout: '1/3',
                }]
            },
            ]
        },
        {
            "name": "男方信息",
            "children": [{
                "key": "manName",
                "label": "姓名",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入姓名' },
                layout: '1/3',
            }, {
                "key": "manOutpatientNo",
                "label": "门诊号",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入门诊号' },
                layout: '1/3',
            }, {
                "key": "manTelephone",
                "label": "电话号码",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入电话号码' },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.idType",
                "label": "证件类型",
                "inputType": "MS",
                inputProps: { uniqueKey: '证件类型', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.idNO",
                "label": "证件号码",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入证件号码' },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.dob",
                "label": "出生日期",
                "inputType": "single_date_picker",

                "inputProps": { 'placeholder': '请输入出生日期', 'maxDate': 'now' },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.ethnic",
                "label": "民族",
                "inputType": "MS",
                inputProps: { uniqueKey: '民族s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "manAge",
                "label": "年龄",
                "inputType": "input_number",

                "inputProps": { 'placeholder': '请输入年龄' },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.permanentResidence",
                "label": "籍贯",
                "inputType": "MS",
                inputProps: { uniqueKey: '省份s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.education",
                "label": "文化程度",
                "inputType": "MS",
                inputProps: { uniqueKey: '文化程度s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.profession",
                "label": "职业",
                "inputType": "MS",
                inputProps: { uniqueKey: '职业s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.nationality",
                "label": "国籍",
                "inputType": "country_select",

                "inputProps": { 'placeholder': '请输入国籍' },
                layout: '1/3',
            },
            {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.permanentResidenceAddress",
                "label": "户口地址",
                "inputType": "MyAddress",

                "inputProps": {
                    addressBtns: [
                        { name: 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.permanentResidenceAddress', label: '同女方' },
                    ]
                },
                layout: '2/3',
                isNewRow: 1,
            }, {
                "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.residenceAddress",
                "label": "居住地址",
                "inputType": "MyAddress",

                "inputProps": {
                    addressBtns: [
                        { name: 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation.permanentResidenceAddress', label: '同女方' },
                    ]
                },
                layout: '2/3',
                isNewRow: 1,
            },

            {
                "label": "个人史",

                children: [
                    {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.previousHistory__",
                        "label": "既往史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.surgeryHistory__",
                        "label": "手术史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.presentIllness__",
                        "label": "现病史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.contactHazardousSubstances__",
                        "label": "接触有害物质",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.contactRadioactiveRays__",
                        "label": "接触放射线",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.personalOther",
                        "label": "其他",
                        "inputType": "input",

                        "inputProps": { 'placeholder': '请输入其他' },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.personalSmoke__",
                        "label": "吸烟",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.personalDrink__",
                        "label": "饮酒",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    },
                    {
                        "inputType": "check_invert_button",
                        "layout": "1/3"
                    },
                ]
            },
            {
                "label": "家族史",
                children: [
                    {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.familyHeritableDisease__",
                        "label": "遗传疾病",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.familyPsychosis__",
                        "label": "精神病",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.birthDefects__",
                        "label": "先天畸形",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {
                        "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory.familyHistoryOther",
                        "label": "其他",
                        "inputType": "input",

                        "inputProps": { 'placeholder': '请输入其他' },
                        layout: '1/3'
                    },
                    {
                        "inputType": "check_invert_button",
                        "layout": "1/3"
                    },
                ]


            },
            {
                "name": "体格检查",
                "children": [{
                    "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.weight",
                    "label": "体重(kg)",
                    "inputType": "input_number",

                    processLocal(v, form) {
                        if (form) {
                            const values = form.getFieldsValue()
                            const height = ctx.utils.get<number>(values, 'manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.height')
                            form.setFieldsValue({
                                manProgestationCheckArchivesDetailVM: {
                                    progestationCheckArchivesPhysicalExamination: {
                                        bmi: ctx.utils.calc_bmi(v, height)
                                    }
                                }
                            })
                        }
                    },
                    layout: '1/3',
                }, {
                    "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.height",
                    "label": "身高(cm)",
                    "inputType": "input_number",
                    processLocal(v, form) {
                        if (form) {
                            const values = form.getFieldsValue()

                            const weight = ctx.utils.get<number>(values, 'manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.weight')

                            form.setFieldsValue({
                                manProgestationCheckArchivesDetailVM: {
                                    progestationCheckArchivesPhysicalExamination: {
                                        bmi: ctx.utils.calc_bmi(weight, v)
                                    }
                                }
                            })
                        }
                    },

                    layout: '1/3',
                }, {
                    "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.bmi",
                    "label": "BMI",
                    "inputType": "InputNumber",

                    "specialConfig": { 'tip': 'BMI的正常范围值是18.5~24.9kg/㎡', 'min': 18.5, 'max': 24.9 },
                    "inputProps": { 'placeholder': '请输入BMI', 'disabled': true },
                    layout: '1/3',
                },
                {

                    "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.systolic",
                    layout: '1/3',
                    inputType: 'InputNumber',
                    "label": "收缩压(mmHg)",

                },
                {

                    "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.diastolic",
                    "label": "舒张压(mmHg)",
                    inputType: 'InputNumber',
                    layout: '1/3',
                },
                {
                    "key": "manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination.heartRate",
                    "label": "心率(次/分钟)",
                    "inputType": "input_number",

                    "inputProps": { 'placeholder': '请输入心率' },
                    layout: '1/3',
                }]
            },
            ]
        },
        {
            "name": "其他信息",
            "children": [{
                "key": "nearRelation__",
                "label": "近亲结婚",
                "inputType": "MC",
                required: () => ctx.required,
                inputProps: { options: [{ value: 1, label: '否' }, { value: 2, label: '是', inputType: 'MI' }], },
                layout: '1/3',
            }, {
                "key": "filingDay",
                "label": "建档日期",
                "inputType": "single_date_picker",

                "inputProps": { 'placeholder': '请输入建档日期', 'maxDate': 'now' },
                layout: '1/3',
            }, {
                "key": "auditor",
                "label": "审核人",
                "inputType": "input",

                "inputProps": { 'placeholder': '请输入审核人' },
                layout: '1/3',
            }]
        }]
    , { containerType: 'tabs' }
)