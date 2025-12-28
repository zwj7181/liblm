import { defineFormConfig } from '@lm_fe/service'

export function base_conf() {
    return defineFormConfig([
        {
            key: 'id',
            form_hidden: true,
        },
        {
            key: 'pregnancyId',
            form_hidden: true,
        },
        {
            key: 'way',
            form_hidden: true,
        },
        {
            key: 'neonateOrder',
            form_hidden: true,
        },
        {
            title: '登记卡',
            key: 'name',
            inputProps: {
                disabled: true
            },
            layout: '1/3',
        },
        {
            title: '编码',
            key: 'code',
            inputProps: {
                disabled: true
            },
            form_hidden: true,
            layout: '1/3'
        },

        {
            title: '状态',
            inputType: 'MS',
            key: 'state',
            inputProps: {
                marshal: 0,
                options: '未提交,已提交,驳回,已审核,已上报',
                disabled: true
            },
            layout: '1/3'
        },

    ]).__lazy_config
}

export function base_conf_info(prefix: string) {
    return defineFormConfig(
        [{
            key: `${prefix}.name`,
            "label": "姓名",
            "inputType": "input",
            layout: '1/3',
        }, {
            key: `${prefix}.idNO`,
            "label": "身份证号",
            "inputType": "input",
            layout: '1/3',
        }, {
            key: `${prefix}.dob`,
            "label": "出生日期",
            "inputType": "single_date_picker",
            layout: '1/3',
        }, {
            key: `${prefix}.age`,
            "label": "年龄",
            "inputType": "input_number",
            layout: '1/3',
        }, {
            key: `${prefix}.ethnic`,
            "label": "民族",
            "inputType": "MS",
            "inputProps": { 'uniqueKey': '民族', },
            layout: '1/3',
        }, {
            key: `${prefix}.lmp`,
            "label": "末次月经",
            "inputType": "single_date_picker",
            layout: '1/3',
        }, {
            key: `${prefix}.degree`,
            "label": "文化程度",
            "inputType": "MS",
            "inputProps": { 'uniqueKey': '文化程度' },
            layout: '1/3',
        }, {
            key: `${prefix}.occupation`,
            "label": "职业",
            "inputType": "MS",
            "inputProps": { 'uniqueKey': '职业' },
            layout: '1/3',
        }, {
            key: `${prefix}.gravidity`,
            "label": "孕次",
            "inputType": "input_number",
            layout: '1/3',
        }, {
            key: `${prefix}.parity`,
            "label": "产次",
            "inputType": "input_number",
            layout: '1/3',
        }, {
            key: `${prefix}.childrenNum`,
            "label": "现有子女数",
            "inputType": "input_number",
            layout: '1/3',
        }, {
            key: `${prefix}.maritalStatus`,
            "label": "婚姻状况",
            "inputType": "MS",
            "inputProps": { 'uniqueKey': '婚姻' },
            layout: '1/3',
        }, {
            key: `${prefix}.telephone`,
            "label": "手机号码",
            "inputType": "input",
            layout: '1/3',
        }, {
            key: `${prefix}.residenceAddress`,
            "label": "现住址",
            "inputType": "MyAddress",
            layout: '1/1',
        }, {
            key: `${prefix}.permanentResidenceAddress`,
            "label": "户口所在地",
            "inputType": "MyAddress",
            layout: '1/1',
        }]
    ).__lazy_config
}