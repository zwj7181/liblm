import { rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
export default defineFormConfig([
    {
        name: 'contentType',
        label: '任务类型',
        inputType: 'MS',
        inputProps: {
            uniqueKey: 'Task.contentType',
        },
    },
    {
        name: 'releaseStatus',
        label: '发布状态',
        inputType: 'MS',
        inputProps: {
            options: '开启,关闭',
        }
    },
    {
        name: 'runStatus',
        label: '运行情况',
        inputType: 'MS',
        inputProps: {
            uniqueKey: 'Task.runStatus'

        }
    },
])