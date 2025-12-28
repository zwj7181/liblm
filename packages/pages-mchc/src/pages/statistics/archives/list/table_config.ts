import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
export default defineFormConfig([
    {
        title: '就诊卡号',
        dataIndex: 'outpatientNO',
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,

    },
    {
        title: '姓名',
        dataIndex: 'name',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
        ellipsis: true,

    },
    {
        title: '年龄',
        dataIndex: 'age',
        width: APP_CONFIG.CELL_WIDTH_SMALL,

    },
    {
        title: '建档日期',
        dataIndex: 'validateDate',
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,

    },
    {
        title: '末次月经',
        dataIndex: 'lmp',
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,

    },
    {
        title: '孕/产',
        dataIndex: 'gravidity',
        width: APP_CONFIG.CELL_WIDTH_SMALL,


        render: (value: any, rowData: any) => ctx.utils.format_gp(rowData),
    },
    {
        title: '建档孕周',
        dataIndex: 'gestationalWeek',
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    },
    {
        title: '当前孕周',
        dataIndex: 'currentGestationalWeek',
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    },
    {
        title: '预产期-日期',
        dataIndex: 'edd',
        width: APP_CONFIG.CELL_WIDTH_LARGE,

    },
    {
        title: '预产期-B超',
        dataIndex: 'sureEdd',
        width: APP_CONFIG.CELL_WIDTH_LARGE,

    },
    {
        title: '手机号码',
        dataIndex: 'telephone',
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,

    },
    {
        title: '证件号码',
        dataIndex: 'idNO',
        width: APP_CONFIG.CELL_WIDTH_LARGE,

    },
    {
        title: '户口地址',
        dataIndex: 'permanentResidenceAddress',
        width: APP_CONFIG.CELL_WIDTH_LARGE,

        render: (text: string) => text && text.replace('&', ''),
    },
    {
        title: '产休地址',
        dataIndex: 'postpartumAddress',
        width: APP_CONFIG.CELL_WIDTH_LARGE,

        render: (text: string) => text && text.replace('&', ''),
    },
])