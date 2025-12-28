import { mchcStore, rt_ctx } from "@lm_fe/env";
import { peek_provoke } from "@lm_fe/provoke";
import { defineFormConfig } from "@lm_fe/service";


const ctx = rt_ctx
const React = rt_ctx.React
export const search_config = defineFormConfig([
    { label: '评定日期', name: 'eventDate', inputType: 'rangeDate' },
    { label: '预产期', name: 'edd', inputType: 'rangeDate' },
    { label: '预产期B超', name: 'sureEdd', inputType: 'rangeDate' },

    {
        label: '孕期状态', name: 'periodState', inputType: 'MS',
        inputProps: { uniqueKey: '孕期状态' }
    },


    { label: '姓名', name: 'name', inputType: 'Input' },
    { label: '居住地址', name: 'permanentResidenceAddress', inputType: 'Input' },
    { label: '高危因素', name: 'highriskNote', inputType: 'Input' },

    {
        label: '高危等级', name: 'highriskGrade', inputType: 'MS',
        inputProps: {
            width: 240,
            type: 'tags',
            options: peek_provoke(s => s.可选高危等级?.map(_ => ({ label: _.colorText, value: _.levelText })))
        }
    },
    {
        label: '传染病', name: 'infectionNote', inputType: 'MS',
        inputProps: {
            width: 360,
            type: 'tags',
            options: peek_provoke(s => s.可选传染病?.options)
        }
    },


])