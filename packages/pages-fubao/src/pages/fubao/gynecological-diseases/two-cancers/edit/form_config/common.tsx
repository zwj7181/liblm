import { getSameOptions, mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { formatDate } from "@lm_fe/utils";
const required = false

export function 两癌月经史form_config(append = false): IMchc_FormDescriptions_Field[] {
    return [
        {
            "moduleName": "two-cancers",
            "name": "月经史",
            "sort": 0,
            hidden: true,
            "children": [
                {
                    "key": "womenHealthcareMenstrualHistory.menarche",
                    "label": "初潮(岁)",
                    "inputType": "input_number",
                    required,
                    inputProps: { unknown: true },
                    layout: '1/3',
                },
                {
                    "key": "womenHealthcareMenstrualHistory.primiparityAge",
                    "label": "初产(岁)",
                    "inputType": "input_number",
                    required,
                    layout: '1/3',
                },
                mchcEnv.in(['建瓯'])
                    ? null
                    : {
                        "key": "womenHealthcareMenstrualHistory.menstrualCycle",
                        "label": "月经周期(天)",
                        "inputType": "input_number",
                        required,
                        layout: '1/3',
                    },
                mchcEnv.in(['建瓯'])
                    ? null
                    : {
                        "key": "womenHealthcareMenstrualHistory.menstrualPeriod",
                        "label": "月经持续天数",
                        "inputType": "input_number",
                        required,
                        layout: '1/3',
                    },
                mchcEnv.in(['建瓯'])
                    ? null
                    : {
                        "key": "womenHealthcareMenstrualHistory.menstrualVolume",
                        "label": "经量",
                        "inputType": "MC",
                        required,
                        inputProps: {
                            options: getSameOptions('多,中,少'),
                            marshal: 0
                        },
                        layout: '1/3',
                    },
                mchcEnv.in(['建瓯'])
                    ? null
                    : {
                        "key": "womenHealthcareMenstrualHistory.dysmenorrhea__",
                        "label": "痛经",
                        "inputType": "MC",
                        // "inputType": "checkbox_with_input",
                        required,
                        // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "无", "withInput": false, "span": 6 }, { "value": 2, "label": "有", "withInput": true, "isIssue": true, "inputSpan": 12, "span": 6 }] },
                        inputProps: { options: '否,是i', marshal: 2, },
                        layout: '1/3',
                    },
                {
                    "key": "womenHealthcareMenstrualHistory.lmd",
                    "label": "末次月经",
                    "inputType": "DatePicker",
                    inputProps: { format: formatDate.format },
                    layout: '1/3',
                },
                {
                    "key": "womenHealthcareMenstrualHistory.menopause",
                    "label": "绝经",
                    "inputType": "MC",
                    // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "否", "withInput": false, "span": 6 }, { "value": 2, "label": "是", "withInput": true, "isIssue": true, "inputSpan": 12, "span": 6 }] },
                    inputProps: { marshal: 0, options: '否,是,不详', },
                    layout: '1/3',
                },
                {
                    "key": "womenHealthcareMenstrualHistory.menopauseNote",
                    "label": "绝经年龄",
                    "inputType": 'input_number',
                    // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "否", "withInput": false, "span": 6 }, { "value": 2, "label": "是", "withInput": true, "isIssue": true, "inputSpan": 12, "span": 6 }] },
                    layout: '1/3',
                    requiredDeps: {
                        'womenHealthcareMenstrualHistory.menopause': [1]
                    }
                },
                //  {
                //     
                //     "key": "womenHealthcareMenstrualHistory.menopauseAge",
                //     "label": "绝经年龄",
                //     "inputType": "input_number",
                //     
                //     "inputProps": { "dependency": { "show": { "key": "womenHealthcareMenstrualHistory.menopause", "value": [2] } } },
                //     layout: '1/3',
                //     
                // }, 
                mchcEnv.in(['建瓯'])
                    ? null
                    : {
                        "key": "womenHealthcareMenstrualHistory.menopauseSurgery",
                        "label": "绝经手术",
                        "inputType": "checkbox_group",
                        "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "否", "span": 6, "withInput": false }, { "value": 2, "label": "是", "withInput": false, "isIssue": true, "span": 6, "inputSpan": 12 }] },
                        layout: '1/3',
                    },

                append ? {
                    "key": "womenHealthcareMenstrualHistory.sfbr",
                    "label": "是否哺乳",
                    "inputType": "checkbox_group",
                    required,
                    "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "否", "span": 8, "withInput": false }, { "value": 2, "label": "是", "withInput": false, "span": 8, "inputSpan": 8 }] },
                    layout: '1/3',

                } : null,
                {
                    "key": "womenHealthcareMenstrualHistory.conceived",
                    "label": "孕次",
                    "inputType": "input_number",
                    layout: '1/3',
                }, {
                    "key": "womenHealthcareMenstrualHistory.parity",
                    "label": "产次",
                    "inputType": "input_number",
                    layout: '1/3',
                },
            ]
        },
    ]
}