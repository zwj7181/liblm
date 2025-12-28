import { rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx

export default defineFormConfig(
    [
        {
            "key": "riskAssessment",
            "label": "风险评估",
            "inputType": "MA",
            required: () => ctx.required,
            inputProps: {
                options: '低风险,高风险',
            },
            layout: '1/1',
        },
        {
            "key": "evaluate",
            "label": "评估建议",
            "inputType": "MA",
            inputProps: {
                options: '在已接受的检查项目中，暂未发现夫妻双方存在对怀孕不利的风险因素，建议定期检查健康教育与指导。,夫妻仅一方（妻子/丈夫）接受检查评估，在已接受的检查项目中，暂未发现存在对怀孕不利的风险因素，建议另外一方（妻子/丈夫）尽快前来接受孕前优生健康检查。,在已接受的检查项目中，发现对怀孕不利的风险因素，建议进一步咨询及查治。,在已接受的检查项目中，发现对怀孕不利的风险因素，建议您改变不良生活方式，规避有害环境因素，以更健康的状态备孕。',
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
