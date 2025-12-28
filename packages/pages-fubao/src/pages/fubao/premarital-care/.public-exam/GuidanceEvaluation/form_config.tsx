import { rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx

export default defineFormConfig(
    [{
        "key": "medicalAdvice",
        "label": "医学意见",
        "inputType": "MA",
        required: () => ctx.required,
        inputProps: {
            options: '未发现医学上不宜结婚的情形,建议不宜结婚,建议不宜生育,建议暂缓结婚,建议采取医学措施，尊重受检者意愿',
        },
        layout: '1/1',
    }, {
        "key": "premaritalSanitationGuidance",
        "label": "婚前卫生指导",
        "inputType": "template_textarea",
        required: () => ctx.required,
        layout: '1/1',
    }, {
        "key": "subsequentVisitFate",
        "label": "预约复诊时间",
        "inputType": "single_date_picker",
        "tranferRules": { 'type': 'dayjs()' },
        layout: '1/1',
    }, {
        "key": "zzdj",
        "label": "转诊登记",
        "inputType": "button",
        "specialConfig": { 'label': '转诊登记' },
        "inputProps": { 'type': 'default' },
        layout: '1/1',
    }, {
        "key": "consultGuidanceResult",
        "label": "咨询指导结果",
        "inputType": "MA",
        inputProps: {
            options: '接受指导意见,不接受指导意见，知情后选择结婚，后果自己承担',
        },
        layout: '1/1',
    }, {
        "key": "checkDate",
        "label": "检查日期",
        "inputType": "single_date_picker",
        "tranferRules": { 'type': 'dayjs()' },
        required: () => ctx.required,
        "inputProps": { 'placeholder': '请输入检查日期' },
        layout: '1/1',
    }, {
        "key": "checkDoctor",
        "label": "检查医生",
        "inputType": "MA",
        inputProps: { memorieskey: '妇保-检查医生' },
        required: () => ctx.required,
        layout: '1/1',
    }]
)
