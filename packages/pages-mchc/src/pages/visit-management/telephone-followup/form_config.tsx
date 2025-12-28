import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { peek_provoke } from "@lm_fe/provoke";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
const React = ctx.React
export default defineFormConfig(
    [

        {
            title: 'prenatalVisit.id',
            dataIndex: 'prenatalVisit.id',
            hidden: true,
            form_hidden: true,
        },
        {
            hidden: true,
            inputType: 'component',
            inputProps: {
                "component": () => <h1 style={{ textAlign: 'center', fontSize: 38 }}>请拨号</h1>,
            }
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
            align: 'center',
            layout: '1/3',
            inputProps: { disabled: true },
        },
        {
            title: '身份证号',
            dataIndex: 'idNO',
            layout: '1/3',
            inputProps: { disabled: true },
            width: APP_CONFIG.CELL_WIDTH_LARGE,
        },
        {
            title: '就诊卡号',
            dataIndex: 'outpatientNO',
            layout: '1/3',
            inputProps: { disabled: true },
            width: APP_CONFIG.CELL_WIDTH_MIDDLE,
        },
        {
            title: '手机号',
            dataIndex: 'telephone',
            layout: '1/3',
            inputProps: { disabled: true },
            width: APP_CONFIG.CELL_WIDTH_MIDDLE,
        },
        {
            title: '当前孕周',
            dataIndex: 'currentGestationalWeek',
            layout: '1/3',
            inputProps: { disabled: true },
            width: APP_CONFIG.CELL_WIDTH_SMALL,
        },
        {
            title: '上次复诊日期',
            layout: '1/3',
            dataIndex: 'lastVisitDate',
            inputProps: { disabled: true },
            width: APP_CONFIG.CELL_WIDTH_MIDDLE,
        },
        {
            title: '复诊预约日期',
            layout: '1/3',
            dataIndex: 'appointmentDate',
            inputProps: { disabled: true },
            width: APP_CONFIG.CELL_WIDTH_MIDDLE,
        },
        {
            title: '超时天数',
            inputProps: { disabled: true },
            layout: '1/3',
            dataIndex: 'timeoutDays',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
        },
        {
            title: '高危等级',
            dataIndex: 'highriskGrade',
            layout: '1/3',
            width: APP_CONFIG.CELL_WIDTH_SMALL,

            inputType: 'MS',
            inputProps: {
                marshal: 0,
                disabled: true,
                options: peek_provoke(s => s.可选高危等级?.map(_ => ({ label: _.colorText, value: _.levelText })))
            }

        },
        { inputType: 'Divider', hidden: true },
        {
            title: '电话状态',
            dataIndex: 'phoneStatus',
            layout: '1/3',
            inputType: 'MS',
            inputProps: {
                marshal: 0,

                options: '接通,未接通'
            },
            width: APP_CONFIG.CELL_WIDTH_SMALL,

        },
        {
            title: '超时原因',
            dataIndex: 'timeoutReason',
            width: APP_CONFIG.CELL_WIDTH_LARGE,
            layout: '1/3',
            inputType: 'MS',
            inputProps: {
                marshal: 0,

                options: '住院,转院,已分娩,终止妊娠,其他'
            },

        },
        {
            layout: '1/1',
            title: '其他原因',
            dataIndex: 'reasonOther',
            width: APP_CONFIG.CELL_WIDTH_LARGE,
        },
        {
            layout: '1/1',
            title: '备注',
            dataIndex: 'remark',
            width: APP_CONFIG.CELL_WIDTH_LARGE,
        },
    ]
)