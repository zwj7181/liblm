import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
export function 病史情况_config() {
 
    const cache: IMchc_FormDescriptions_Field[] = [

        {
            "id": 783,
            "name": "病史情况",
            "children": [{
                "id": 18097,
                "key": "breastCancerMedicalHistory.previousBreastScreening__",
                "label": "既往接受乳腺癌筛查",
                "inputType": "MC",
                inputProps: { options: [{ label: '否', value: 1 }, { label: '是', value: 2, inputType: 'Input' }] },
                // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "否", "span": 4, "withInput": false }, { "value": 2, "label": "是", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12 }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18098,
                "key": "breastCancerMedicalHistory.breastSurgeryOrBiopsy__",
                "label": "乳腺手术或活检史",
                "inputType": "MC",
                inputProps: { options: [{ label: '否', value: 1 }, { label: '是', value: 2, inputType: 'Input' }] },
                // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "无", "span": 4, "withInput": false }, { "value": 2, "label": "有", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12, "inputType": "autoComplete", "inputOption": [{ "value": "病历结果良性" }, { "value": "病历结构恶性" }] }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18099,
                "key": "breastCancerMedicalHistory.hormoneReplacementTherapyHistory__",
                "label": "激素替代治疗史",
                "inputType": "MC",
                inputProps: { options: [{ label: '否', value: 1 }, { label: '是', value: 2, inputType: 'Input' }] },
                // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "无", "span": 4, "withInput": false }, { "value": 2, "label": "有", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12, "placeholder": "请输入用药时长" }] },
                layout: '1/1',
            }, {
                "id": 18103,
                "key": "breastCancerMedicalHistory.familyTumorHistoryVOS",
                "label": "家族肿瘤史",
                "inputType": "family_tumor_history",
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }]
        },
    ]
    return cache
}



