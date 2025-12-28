import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";


export function 辅助检查_config(): IMchc_FormDescriptions_Field_Nullable[] {

    return [

        {
            "id": 785,
            "moduleName": "mammary-cancer-screening",
            "name": "辅助检查",
            "flag": "妇女保健-乳腺癌筛查-辅助检查",
            "sort": 4,
            "children": [{
                "id": 18110,
                "key": "breastCancerAuxiliaryExamination.breastUltrasoundExamination",
                "label": "乳腺彩色超声检查",
                "sort": 0,
                "inputType": "checkbox_with_single_input",
                "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "已查", "span": 4, "withInput": false }, { "value": 2, "label": "未查", "withInput": false, "isIssue": true, "span": 4 }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18111,
                "key": "breastCancerAuxiliaryExamination.leftBiRadsClassification",
                "label": "超声评估BI-RADS分级 左乳",
                "sort": 1,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18112,
                "key": "breastCancerAuxiliaryExamination.rightBiRadsClassification",
                "label": "右乳",
                "sort": 2,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18116,
                "key": "breastCancerAuxiliaryExamination.breastXBiRadsExamination",
                "label": "乳腺X线BI-RADS分级",
                "sort": 3,
                "inputType": "checkbox_with_single_input",
                "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "已查", "span": 4, "withInput": false }, { "value": 2, "label": "未查", "withInput": false, "isIssue": true, "span": 4 }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18113,
                "key": "breastCancerAuxiliaryExamination.leftBreastXBiRadsClassification",
                "label": "乳腺X线BI-RADS分级 左乳",
                "sort": 4,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18114,
                "key": "breastCancerAuxiliaryExamination.rightBreastXBiRadsClassification",
                "label": "右乳",
                "sort": 5,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18115,
                "key": "breastCancerAuxiliaryExamination.other",
                "label": "其他",
                "sort": 6,
                "inputType": "input",
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }]
        },
    ]
}
