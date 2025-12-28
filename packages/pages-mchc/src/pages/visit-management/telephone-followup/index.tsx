import { BF_Wrap2, MyBaseList } from '@lm_fe/pages'
import { mchcLogger, rt_ctx } from "@lm_fe/env"
import { formatDate, getMomentRange, request } from "@lm_fe/utils"
import { Button } from "antd"
import React from "react"
import { peek_provoke } from '@lm_fe/provoke'
const ctx = rt_ctx
export default function BreastCancerDataReport(prop: any) {
    const { config, Wrap } = BF_Wrap2({
        default_conf: {
            title: '复诊追踪-超时电话随访',
            name: '/api/prenatal-visit-logs/timeoutToPhoneData',
            handleBeforePopup(v) {

                return Object.assign(v, { remindType: 3, remindWay: 3, sendTime: ctx.utils.formatDateTime() })
            },
            beforeSubmit(v) {

                return v
            },
            showAdd: 0,
            tableColumns: () => import('./form_config'),
            searchConfig: [
                { label: '就诊卡号', name: 'outpatientNO', inputType: 'Input' },
                { label: '姓名', name: 'name', inputType: 'Input' },
                { label: '预约时间', name: 'appointmentDate', inputType: 'rangeDate' },
                {
                    label: '高危等级', name: 'highriskGrade', inputType: 'MS',
                    inputProps: {
                        width: 240,
                        type: 'tags',
                        options: peek_provoke(s => s.可选高危等级?.map(_ => ({ label: _.colorText, value: _.levelText })))
                    }
                },
                { label: '随访情况', name: 'phoneStatus', inputType: 'MS', inputProps: { options: '已接通,未接通' } },
            ]
        }
    })
    return <Wrap>
        <MyBaseList
            // apiPrefix="/fb/api"
            showRowDelBtn={false}
            useListSourceCount
            editText='电话随访'
            bf_conf={config}

        />
    </Wrap>
}

