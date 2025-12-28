import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { formatDate } from "@lm_fe/utils";
export function form_config(): IMchc_FormDescriptions_Field[] {
    return [{
        "id": 777,
        "moduleName": "pathological-biopsy",
        "name": "体格检查1",
        "flag": "妇女保健-宫颈癌病理活检-体格检查",
        "sort": 0,
        "fields": [{
            "id": 18066,
            "key": "womenHealthcarePhysicalExamination.weight",
            "label": "体重(kg)",
            "inputType": "input_number",
            "rules": [{ "required": true, "message": "体重(kg)是必填项" }],

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 16 } },
        }, {
            "id": 18067,
            "key": "womenHealthcarePhysicalExamination.systolic",
            "label": "血压(mmHg)",
            "inputType": "pressure",
            "rules": [{ "required": true, "message": "血压(mmHg)是必填项" }],

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 16 } },
        }, {
            "id": 18068,
            "key": "womenHealthcarePhysicalExamination.heartRate",
            "label": "心率(次/分钟)",
            "inputType": "input_number",
            "rules": [{ "required": true, "message": "心率(次/分钟)是必填项" }],

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 16 } },
        }]
    }, {
        "id": 778,
        "moduleName": "pathological-biopsy",
        "name": "阴道镜检查",
        "flag": "妇女保健-宫颈癌病理活检-阴道镜检查",
        "sort": 0,
        "fields": [{
            "id": 18069,
            "key": "cervicalCancerColposcopyCheck.colposcopyCheckAppraise",
            "label": "阴道镜检查评价",
            "inputType": "checkbox_group",

            "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "满意", "withInput": false, "span": 12 }, { "value": 2, "label": "不满意", "withInput": false, "span": 12 }] },

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 16 } },
        }, {
            "id": 18070,
            "key": "cervicalCancerColposcopyCheck.colposcopyCheckResult",
            "label": "阴道镜检查结果",
            "inputType": "checkbox_with_single_input",

            "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "未见异常", "withInput": false, "span": 12 }, { "value": 2, "label": "异常", "withInput": true, "isIssue": true, "inputSpan": 12, "span": 12 }] },

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 16 } },
        }, {
            "id": 18071,
            "key": "cervicalCancerColposcopyCheck.histologicalExamination",
            "label": "是否需要病组织检查",
            "inputType": "checkbox_group",

            "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "是", "withInput": false, "span": 12 }, { "value": 2, "label": "否", "withInput": false, "span": 12 }] },

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 14 } },
        }]
    }, {
        "id": 779,
        "moduleName": "pathological-biopsy",
        "name": "病理活检",
        "flag": "妇女保健-宫颈癌病理活检-病理活检",
        "sort": 0,
        "fields": [{
            "id": 18072,
            "key": "cervicalCancerPathologicalBiopsy.pathologicalBiopsyAppraise",
            "label": "病理活检评价",
            "inputType": "checkbox_group",

            "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "满意", "withInput": false, "span": 12 }, { "value": 2, "label": "不满意", "withInput": false, "span": 12 }] },

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 16 } },
        }, {
            "id": 18073,
            "key": "cervicalCancerPathologicalBiopsy.pathologicalBiopsyResult",
            "label": "病理活检结果",
            "inputType": "checkbox_with_single_input",

            "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "未见异常", "withInput": false, "span": 12 }, { "value": 2, "label": "异常", "withInput": true, "isIssue": true, "inputSpan": 12, "span": 12 }] },

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 16 } },
        }]
    }, {
        "id": 780,
        "moduleName": "pathological-biopsy",
        "name": "诊断及建议",
        "flag": "妇女保健-宫颈癌病理活检-诊断及建议",
        "sort": 0,
        "fields": [{
            "id": 18074,
            "key": "cervicalCancerDiagnosisAndGuidance.screeningResults",
            "label": "筛查结果",
            "inputType": "checkbox_with_single_input",
            "rules": [{ "required": true, "message": "筛查结果是必填项" }],
            "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "正常", "span": 6, "withInput": false }, { "value": 2, "label": "异常", "withInput": true, "isIssue": true, "span": 6, "inputSpan": 12, "inputType": "autoComplete", "inputOption": [{ "value": "低级别病变（原CIN1）" }, { "value": "高级别病变（原CIN 2及CIN3）" }, { "value": "宫颈原位腺癌（AIS）" }, { "value": "宫颈微小浸润癌（鳞癌／腺癌）" }, { "value": "宫颈浸润癌（鳞癌／腺癌）" }, { "value": "滴虫性阴道炎" }, { "value": "外阴阴道假丝酵母菌病" }, { "value": "细菌性阴道病" }, { "value": "外生殖器尖锐湿疣" }, { "value": "子宫肌瘤" }, { "value": "黏液脓性宫颈炎" }, { "value": "宫颈息肉" }] }] },

            "span": 16,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 16 } },
        }, {
            "id": 18075,
            "key": "cervicalCancerDiagnosisAndGuidance.screeningSuggest",
            "label": "筛查建议",
            "inputType": "checkbox_group",
            "rules": [{ "required": true, "message": "筛查建议是必填项" }],
            "specialConfig": { "type": "single", "options": [{ "value": "定期检查", "label": "定期检查", "withInput": false, "span": 6 }, { "value": "治疗", "label": "治疗", "withInput": false, "span": 6 }] },

            "span": 16,
            "offset": 0,
            "isNewRow": 1,
            "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 16 } },
        }, {
            "id": 18076,
            "key": "cervicalCancerDiagnosisAndGuidance.checkUnit",
            "label": "检查单位",
            "inputType": "input",
            "rules": [{ "required": true, "message": "检查单位是必填项" }],

            "span": 8,
            "offset": 0,
            "isNewRow": 1,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 12 } },
        }, {
            "id": 18077,
            "key": "cervicalCancerDiagnosisAndGuidance.checkDate",
            "label": "检查日期",
            "inputType": 'DatePicker',
            "required": true,
            "inputProps": { format: formatDate.format },
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 12 } },
        }, {
            "id": 18078,
            "key": "cervicalCancerDiagnosisAndGuidance.checkDoctorName",
            "label": "检查医生",
            "inputType": "MA",
            inputProps: { memorieskey: '妇保-检查医生' },
            "required": true,

            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 12 } },
        }]
    }]
}