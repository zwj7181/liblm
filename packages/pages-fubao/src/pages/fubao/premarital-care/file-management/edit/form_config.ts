import { ICommonOption, rt_ctx } from "@lm_fe/env";
import { defineFormConfig, parseFormDescriptions } from "@lm_fe/service";
const ctx = rt_ctx
// ctx.required = false
const 无有option: ICommonOption[] = [
    { label: '无', value: 1 },
    { label: '有', value: 2, warning: true, inputType: 'MI' }
]
export default defineFormConfig([
    {
        key: 'id',
        form_hidden: true
    },
    {
        key: 'womanPremaritalCheckArchivesDetailVM.id',
        form_hidden: true

    },
    {
        form_hidden: true,
        key: 'manPremaritalCheckArchivesDetailVM.id',

    },
    {


        "name": "女方信息.",


        "children": [

            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.name",
                "label": "姓名",

                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            },
            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.outpatientNo",
                "label": "门诊号",

                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            },
            {
                "key": "__obdriver_read",
                "inputType": 'IdNOButton',
                label: '外设读取',
                layout: '1/3',
            },

            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.telephone",
                "label": "电话号码",

                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            },
            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idType",
                "label": "证件类型",

                "inputType": "MS",
                inputProps: {
                    uniqueKey: '证件类型',

                },
                required: () => ctx.required,
                layout: '1/3',
            },
            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idNO",
                "label": "证件号码",
                processLocal(v, form) {
                    if (form) {

                        var value = ctx.utils.trim(v) // 去掉空格
                        var len = ctx.utils.size(value) // 用户输入的长度
                        var values = form.getFieldsValue() // 获取整体表单值
                        var idType = ctx.utils.get(values, 'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idType') // 获取证件类型
                        // 证件类型为身份证，输入长度为 18 才计算
                        if (idType === 1 && len === 18) {
                            var id_info = ctx.utils.checkIdNo_new(value) // 通过身份证计算

                            // 说明身份证正确
                            if (id_info) {
                                // 设置对应的字段
                                var baseInfo = {
                                    dob: id_info.birth,
                                    nationality: id_info.nationality,
                                    nativeplace: id_info.province,
                                    age: id_info.age,
                                }
                                var new_values = ctx.utils.set({}, 'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation', baseInfo) // 新的表单值
                                form.setFieldsValue(new_values);
                            } else {
                                ctx.mchcEnv.error('请输入符合规范的身份证号码！');
                            }
                        }
                        form.setFieldsValue({})
                    }


                },
                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            },
            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.dob",
                "label": "出生日期",

                "inputType": "single_date_picker",
                "tranferRules": { 'type': 'dayjs()' },
                required: () => ctx.required,
                layout: '1/3',
            },
            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.ethnic",
                "label": "民族",

                "inputType": "MS",
                required: () => ctx.required,
                "inputProps": { marshal: 0, uniqueKey: '民族s' },
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.age",
                "label": "年龄",

                "inputType": "input_number",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidence",
                "label": "籍贯",

                "inputType": "MS",
                required: () => ctx.required,
                "inputProps": { marshal: 0, uniqueKey: '省份s' },
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.education",
                "label": "文化程度",

                "inputType": "MS",
                "inputProps": { marshal: 0, uniqueKey: '文化程度s' },
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.profession",
                "label": "职业",

                "inputType": "MS",
                "inputProps": { marshal: 0, uniqueKey: '职业s' },
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.nationality",
                "label": "国籍",

                "inputType": "country_select",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menarche",
                "label": "初潮(岁)",

                "inputType": "input_number",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menstrualCycle",
                "label": "月经周期(天)",

                "inputType": "input_number",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menstrualPeriod",
                "label": "月经持续天数",

                "inputType": "input_number",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menstrualVolume",
                "label": "经量",

                "inputType": "checkbox_group",
                required: () => ctx.required,
                "specialConfig": { 'type': 'single', 'options': [{ 'value': '多', 'label': '多', 'withInput': false, 'span': 6 }, { 'value': '中', 'label': '中', 'withInput': false, 'span': 6 }, { 'value': '少', 'label': '少', 'withInput': false, 'span': 6 }] },
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.dysmenorrhea__",
                "label": "痛经",

                "inputType": "MC",
                required: () => ctx.required,
                inputProps: { options: 无有option },
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.gravidity",
                "label": "孕次",

                "inputType": "input_number",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.parity",
                "label": "产次",

                "inputType": "input_number",
                required: () => ctx.required,
                layout: '1/3',
            },
            {
                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.whetherPregnancy",
                "label": "是否怀孕",

                "inputType": "MC",

                "inputProps": { 'placeholder': '请输入是否怀孕', options: '否,是', marshal: 0 },
                layout: '1/3',
            },
            {
                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.lmd",
                "label": "末次月经",

                "inputType": "single_date_picker",

                showDeps: {
                    'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.whetherPregnancy'(v) { return v }
                },
                layout: '1/3',
            },
            {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidenceAddress",
                "label": "户口地址",

                "inputType": "MyAddress",
                required: () => ctx.required,

                "isNewRow": 1,
                layout: '2/3',
            }, {

                "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.residenceAddress",
                "label": "居住地址",

                "inputType": "MyAddress",
                required: () => ctx.required,
                "inputProps": {
                    addressBtns: [
                        { name: 'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidenceAddress', label: '同上' },
                    ]
                },
                "isNewRow": 1,
                layout: '2/3',
            },
            {

                "label": "个人史",
                children: [
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.previousHistory__",
                        "label": "既往史",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.surgeryHistory__",
                        "label": "手术史",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.presentIllness__",
                        "label": "现病史",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactHazardousSubstances__",
                        "label": "接触有害物质",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactRadioactiveRays__",
                        "label": "接触放射线",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.personalOther",
                        "label": "其他",

                        "inputType": "input",

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

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHeritableDisease__",
                        "label": "遗传疾病",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyPsychosis__",
                        "label": "精神病",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.birthDefects__",
                        "label": "先天畸形",

                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHistoryOther",
                        "label": "其他",

                        "inputType": "input",

                        layout: '1/3',
                    },
                    {
                        "inputType": "check_invert_button",
                        "layout": "1/3"
                    },
                ]

            },
            {


                "name": "女方体格检查",


                "children": [
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.weight",
                        "label": "体重(kg)",
                        "inputType": "input_number",
                        processLocal(v, form) {
                            if (form) {
                                var values = form.getFieldsValue()
                                var height = ctx.utils.get<number>(values, 'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.height')
                                form.setFieldsValue({
                                    womanPremaritalCheckArchivesDetailVM: {
                                        premaritalCheckArchivesPhysicalExamination: {
                                            bmi: ctx.utils.calc_bmi(v, height)
                                        }
                                    }
                                })
                            }
                        },
                        layout: '1/3',
                    }, {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.height",
                        "label": "身高(cm)",
                        "inputType": "input_number",
                        processLocal(v, form) {
                            if (form) {
                                var values = form.getFieldsValue()

                                var weight = ctx.utils.get<number>(values, 'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.weight')

                                form.setFieldsValue({
                                    womanPremaritalCheckArchivesDetailVM: {
                                        premaritalCheckArchivesPhysicalExamination: {
                                            bmi: ctx.utils.calc_bmi(weight, v)
                                        }
                                    }
                                })
                            }
                        },
                        layout: '1/3',
                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.bmi",
                        "label": "BMI",
                        "inputType": "InputNumber",

                        "inputProps": { 'tip': 'BMI的正常范围值是18.5~24.9kg/㎡', 'min': 18.5, 'max': 24.9, disabled: true },
                        layout: '1/3',
                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.systolic",
                        layout: '1/3',
                        inputType: 'InputNumber',
                        "label": "收缩压(mmHg)",

                    },
                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.diastolic",
                        "label": "舒张压(mmHg)",
                        inputType: 'InputNumber',
                        layout: '1/3',
                    },

                    {

                        "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.heartRate",
                        "label": "心率(次/分钟)",
                        "inputType": "input_number",

                        layout: '1/3',
                    }]
            },
        ]
    },

    {


        "name": "男方信息",


        "children": [

            {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.name",
                "label": "姓名",
                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.outpatientNo",
                "label": "门诊号",
                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.telephone",
                "label": "电话号码",
                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idType",
                "label": "证件类型",
                "inputType": "MS",
                required: () => ctx.required,
                inputProps: {
                    uniqueKey: '证件类型',
                },
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idNO",
                "label": "证件号码",
                "inputType": "input",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.dob",
                "label": "出生日期",
                "inputType": "single_date_picker",
                required: () => ctx.required,

                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.ethnic",
                "label": "民族",
                "inputType": "MS",
                required: () => ctx.required,

                "inputProps": { marshal: 0, uniqueKey: '民族s' },
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.age",
                "label": "年龄",
                "inputType": "input_number",
                required: () => ctx.required,
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidence",
                "label": "籍贯",
                "inputType": "MS",
                required: () => ctx.required,
                "inputProps": { marshal: 0, uniqueKey: '省份s' },

                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.education",
                "label": "文化程度",
                "inputType": "MS",
                "inputProps": { marshal: 0, uniqueKey: '文化程度s' },
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.profession",
                "label": "职业",
                "inputType": "MS",
                "inputProps": { marshal: 0, uniqueKey: '职业s' },
                layout: '1/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.nationality",
                "label": "国籍",
                "inputType": "country_select",

                layout: '1/3',
            },
            {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidenceAddress",
                "label": "户口地址",
                "inputType": "MyAddress",
                required: () => ctx.required,
                "inputProps": {
                    addressBtns: [
                        { name: 'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidenceAddress', label: '同女方' },
                    ]
                },
                "isNewRow": 1,
                layout: '2/3',
            }, {

                "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.residenceAddress",
                "label": "居住地址",
                "inputType": "MyAddress",
                required: () => ctx.required,
                "inputProps": {
                    addressBtns: [
                        { name: 'womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidenceAddress', label: '同女方' },
                    ]
                },
                "isNewRow": 1,
                layout: '2/3',
            },

            {

                "label": "个人史",
                children: [
                    {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.previousHistory__",
                        "label": "既往史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.surgeryHistory__",
                        "label": "手术史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.presentIllness__",
                        "label": "现病史",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactHazardousSubstances__",
                        "label": "接触有害物质",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },

                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactRadioactiveRays__",
                        "label": "接触放射线",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.personalOther",
                        "label": "其他",
                        "inputType": "input",

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

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHeritableDisease__",
                        "label": "遗传疾病",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },

                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyPsychosis__",
                        "label": "精神病",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.birthDefects__",
                        "label": "先天畸形",
                        "inputType": "MC",
                        required: () => ctx.required,
                        inputProps: { options: 无有option },
                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHistoryOther",
                        "label": "其他",
                        "inputType": "input",

                        layout: '1/3',
                    },
                    {
                        "inputType": "check_invert_button",
                        "layout": "1/3"
                    },
                ],

            },
            {


                "name": "男方体格检查",


                "children": [
                    {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.weight",
                        "label": "体重(kg)",
                        "inputType": "input_number",
                        processLocal(v, form) {
                            if (form) {
                                var values = form.getFieldsValue()
                                var height = ctx.utils.get<number>(values, 'manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.height')
                                form.setFieldsValue({
                                    manPremaritalCheckArchivesDetailVM: {
                                        premaritalCheckArchivesPhysicalExamination: {
                                            bmi: ctx.utils.calc_bmi(v, height)
                                        }
                                    }
                                })
                            }
                        },
                        layout: '1/3',
                    }, {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.height",
                        "label": "身高(cm)",
                        "inputType": "input_number",
                        processLocal(v, form) {
                            if (form) {
                                var values = form.getFieldsValue()

                                var weight = ctx.utils.get<number>(values, 'manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.weight')

                                form.setFieldsValue({
                                    manPremaritalCheckArchivesDetailVM: {
                                        premaritalCheckArchivesPhysicalExamination: {
                                            bmi: ctx.utils.calc_bmi(weight, v)
                                        }
                                    }
                                })
                            }
                        },
                        layout: '1/3',
                    },

                    {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.bmi",
                        "label": "BMI",
                        "inputType": "InputNumber",
                        "inputProps": { 'tip': 'BMI的正常范围值是18.5~24.9kg/㎡', 'min': 18.5, 'max': 24.9, disabled: true },
                        layout: '1/3',
                    },
                    {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.systolic",
                        "label": "收缩压(mmHg)",
                        "inputType": "InputNumber",

                        layout: '1/3',
                    },
                    {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.diastolic",
                        "label": "舒张压(mmHg)",
                        "inputType": "InputNumber",
                        layout: '1/3',
                    },
                    {

                        "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.heartRate",
                        "label": "心率(次/分钟)",
                        "inputType": "input_number",

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
            required: () => ctx.required,
            layout: '1/3',
        }, {

            "key": "auditor",
            "label": "审核人",
            "inputType": "input",
            required: () => ctx.required,
            layout: '1/3',
        },
            // {
            //     "key": "fileStatus",
            //     "label": "审核状态",
            //     "inputType": "MS",
            //     inputProps: { options: '未审核,已审核', marshal: 0 },
            //     layout: '1/3',
            // },

        ]
    }
],
    { containerType: 'tabs' }
)