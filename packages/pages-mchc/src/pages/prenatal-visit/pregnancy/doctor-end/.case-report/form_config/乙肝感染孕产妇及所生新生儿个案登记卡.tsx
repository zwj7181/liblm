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
                            params: { pregnancyId: form.getFieldValue('pregnancyId'), name: 'IC_HBV_REGISTER' },
                        })
                        .then(r => {
                            form.setFieldsValue({ icHbvRegister: r.data })
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
        "title": "基本信息",
        "children": [
            ...base_conf_info('icHbvRegister')
        ]
    },
    {
        "title": "孕产妇乙肝病毒相关检测情况",
        "children": [{
            key: 'icHbvRegister.icHbvExams',
            "inputType": 'MyEditTable',
            "inputProps": {
                marshal: 0,
                formDescriptions: [
                    { 'title': '孕周', 'dataIndex': 'gestationalWeek', 'inputType': 'MA', },
                    { 'title': 'HBsAG', 'dataIndex': 'hbsag', 'inputType': 'MA', 'inputProps': { 'options': '阴性,阳性' } },
                    { 'title': 'HBsAb', 'dataIndex': 'hbsab', 'inputType': 'MA', 'inputProps': { 'options': '阴性,阳性' } },
                    { 'title': 'HBeAg', 'dataIndex': 'hbeag', 'inputType': 'MA', 'inputProps': { 'options': '阴性,阳性' } },
                    { 'title': 'HBeAb', 'dataIndex': 'hbeab', 'inputType': 'MA', 'inputProps': { 'options': '阴性,阳性' } },
                    { 'title': 'HBcAb', 'dataIndex': 'hbcab', 'inputType': 'MA', 'inputProps': { 'options': '阴性,阳性' } }],
            },
        }, {
            key: 'icHbvRegister.hbvDna',
            "label": "HBV DNA(IU/ml)",
            "inputType": "input",
            "inputProps": { 'placeholder': '请输入HBV DNA' },
            layout: '1/1'
        }]
    }, {
        "title": "孕产妇孕期接收抗病毒治疗情况",
        "children": [
            {
                "label": "是否用药",
                layout: '1/2',
                inputProps: { size: 'small' },
                inputType: 'straw',
                children: [
                    {
                        key: 'icHbvRegister.useMedicine',
                        inputType: 'MS',
                        inputProps: {
                            options: '用药,未用药',
                            marshal: 0,
                        },
                    },
                    {
                        key: 'icHbvRegister.useMedicineNote',
                        inputType: 'MA',
                        inputProps: {
                            width: 90
                        },
                        showDeps: { ['icHbvRegister.useMedicine']: [1] }
                    },
                ]
            },
            {
                "label": "药物",
                layout: '1/2',
                inputProps: { size: 'small' },
                inputType: 'straw',
                children: [
                    {
                        key: 'icHbvRegister.medicine',
                        inputType: 'MS',
                        inputProps: {
                            options: [
                                { value: 1, label: '替诺福伟', },
                                { value: 2, label: '提比夫定', },
                                { value: 3, label: '拉米夫定', },
                                { value: 4, label: '其他', },
                            ],
                            marshal: 0,
                        },
                    },
                    {
                        key: 'icHbvRegister.medicineNote',
                        inputType: 'MA',
                        inputProps: {
                            width: 90
                        },
                        showDeps: { ['icHbvRegister.medicine']: [4] }
                    },
                ]
            },
        ]
    }, {
        "title": "本次怀孕、孕产期保健及接触情况",
        "children": [{
            key: 'icHbvRegister.labourDate',
            "label": "分娩日期",
            "inputType": "single_date_picker",
            layout: '1/3'
        }, {
            key: 'icHbvRegister.labourWeek',
            "label": "分娩孕周",
            "inputType": "input",
            layout: '1/3'
        }, {
            key: 'icHbvRegister.labourType',
            "label": "分娩方式",
            "inputType": "MS",
            "inputProps": { uniqueKey: '分娩方式', 'marshal': 0 },
            layout: '1/3'


        },
        {
            "label": "分娩地点",
            layout: '1/3',


            inputProps: { size: 'small' },
            inputType: 'straw',
            children: [
                {
                    key: 'icHbvRegister.labourPlace',
                    inputType: 'MS',
                    inputProps: {
                        width: 120,
                        options: [
                            { value: 1, label: '市级以上助产机构', },
                            { value: 2, label: '县（区）级助产机构', },
                            { value: 3, label: '乡（街道）助产机构', },
                            { value: 4, label: '家中', },
                            { value: 5, label: '其他', },
                        ],
                        marshal: 0,
                    },
                },
                {
                    key: 'icHbvRegister.labourPlaceNote',
                    inputType: 'MA',
                    inputProps: {
                        width: 90
                    },
                    showDeps: { ['icHbvRegister.labourPlace']: [5] }
                },
            ]
        },
        {
            key: 'icHbvRegister.labourOrganization',
            "label": "分娩机构名称",
            "inputType": "input",
            layout: '1/3'
        }]
    }, {
        "title": "新生婴儿情况",
        "children": [
            // {
            //     key: 'icHbvRegister.hepatitisbaby',
            //     "label": "婴儿",
            //     "inputType": "hepatitis-new-baby",
            //     "inputProps": { 'placeholder': '请输入分娩机构名称' },
            //     "span": 24,
            //     "offset": 0,
            // }
            {
                "title": "基本信息",
                "children": [{
                    key: 'icHbvRegister.neonateName',
                    "label": "姓名",
                    "inputType": "input",
                    layout: '1/3'
                }, {
                    key: 'icHbvRegister.neonateGender',
                    "label": "性别",
                    "inputType": "MS",
                    "inputProps": { uniqueKey: '性别2' },
                    layout: '1/3'
                }, {
                    key: 'icHbvRegister.neonateWeight',
                    "label": "体重(g)",
                    "inputType": "input_number",
                    layout: '1/3'
                }, {
                    key: 'icHbvRegister.neonateHeight',
                    "label": "身长(cm)",
                    "inputType": "input_number",
                    layout: '1/3'
                }, {
                    key: 'icHbvRegister.labourDate',
                    "label": "出生时间",
                    "inputType": "single_date_picker",
                    layout: '1/3'
                },
                {
                    "label": "存活情况",
                    layout: '1/3',
                    key: 'icHbvRegister.neonateDeath',
                    inputType: 'MS',
                    inputProps: {
                        options: '存活,死亡',
                        marshal: 0,
                    },
                },
                {
                    key: 'icHbvRegister.neonateDeathNote',
                    "label": "死亡原因",
                    inputType: 'MA',
                    layout: '1/3',
                    showDeps: { ['icHbvRegister.neonateDeath']: [2] }
                },
                {
                    key: 'icHbvRegister.neonateDeathTime',
                    "label": "死亡时间",
                    inputType: 'DatePicker',
                    layout: '1/3',
                    inputProps: {

                    },
                    showDeps: { ['icHbvRegister.neonateDeath']: [2] }
                },
                ]
            }, {
                "title": "第一针乙肝疫苗接种情况",
                "children": [
                    {
                        key: 'icHbvRegister.firstHbv',
                        "label": "接种情况",
                        "inputType": "MS",
                        "inputProps": { 'placeholder': '请输入接种情况', options: '接种,未接种', marshal: 0 },
                        layout: '1/3',
                    },
                    {
                        key: 'icHbvRegister.firstHbvNote',
                        "label": "未接种原因",
                        inputType: 'MA',
                        layout: '1/3',
                        showDeps: { ['icHbvRegister.firstHbv']: [2] }
                    },
                    {
                        key: 'icHbvRegister.firstHbvDate',
                        "label": "接种时间",
                        "inputType": "single_date_picker",
                        layout: '1/3',
                        isNewRow: 1,
                        showDeps: { ['icHbvRegister.firstHbv']: [1] }
                    },
                    {
                        key: 'icHbvRegister.firstHbvType',
                        "label": "疫苗种类",
                        "inputType": "MS",
                        "inputProps": { options: '重组酵母,重组CHO', marshal: 0 },
                        layout: '1/3',
                        showDeps: { ['icHbvRegister.firstHbv']: [1] }
                    },
                    {
                        key: 'icHbvRegister.firstHbvDosage',
                        "label": "接种剂量",
                        "inputType": "MS",
                        "inputProps": { options: [{ value: 1, label: '10ug' }, { value: 2, label: '20ug' }, { value: 3, label: '其他' }], marshal: 0 },
                        layout: '1/3',

                        showDeps: { ['icHbvRegister.firstHbv']: [1] }

                    },
                    {
                        key: 'icHbvRegister.firstHbvDosageNote',
                        "label": "其他剂量",
                        "inputType": "MA",
                        layout: '1/3',

                        showDeps: { ['icHbvRegister.firstHbvDosage']: [3] }

                    },
                ]
            }, {
                "title": "乙肝免疫球蛋白注射情况",
                "children": [
                    {
                        key: 'icHbvRegister.hbig',
                        "label": "注射情况",
                        "inputType": "MS",
                        "inputProps": { 'placeholder': '请输入接种情况', options: '12小时内注射,>12小时内注射,未注射', marshal: 0 },
                        layout: '1/2',
                    },
                    {
                        key: 'icHbvRegister.hbigNote',
                        "label": "未注射原因",
                        inputType: 'MA',
                        layout: '1/3',
                        showDeps: { ['icHbvRegister.hbig']: [3] }
                    },
                    {
                        key: 'icHbvRegister.hbigDate',
                        "label": "注射时间",
                        "inputType": "single_date_picker",
                        layout: '1/3',
                        isNewRow: 1,
                        showDeps: { ['icHbvRegister.hbig']: [1, 2] }
                    },

                    {
                        key: 'icHbvRegister.hbigDosage',
                        "label": "注射剂量",
                        "inputType": "MS",
                        "inputProps": { options: [{ value: 1, label: '100IU' }, { value: 2, label: '其他' }], marshal: 0 },
                        layout: '1/3',

                        showDeps: { ['icHbvRegister.hbig']: [1, 2] }

                    },
                    {
                        key: 'icHbvRegister.hbigDosageNote',
                        "label": "其他剂量",
                        "inputType": "MA",
                        layout: '1/3',

                        showDeps: { ['icHbvRegister.hbigDosage']: [2] }

                    },


                ]
            }
        ]
    }, {
        "title": "报告信息",
        "children": [{
            key: 'icHbvRegister.reportOrganization',
            "label": "报告单位",
            "inputType": "input",
            layout: '1/3'
        }, {
            key: 'icHbvRegister.reportDoctor',
            "label": "报告医生",
            "inputType": "input",
            layout: '1/3'
        }, {
            key: 'icHbvRegister.reportTelephone',
            "label": "联系电话",
            "inputType": "input",
            layout: '1/3'
        }, {
            key: 'icHbvRegister.reportDate',
            "label": "填报日期",
            "inputType": "single_date_picker",
            layout: '1/3'
        }, {
            key: 'icHbvRegister.reportNote',
            "label": "备注",
            "inputType": "text_area",
            layout: '2/3'
        }]
    }
])