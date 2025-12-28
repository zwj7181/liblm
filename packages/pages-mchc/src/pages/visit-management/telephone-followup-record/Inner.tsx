import { formatTimeToDate, formatTimeToStandard } from "@lm_fe/components_m";
import { APP_CONFIG } from "@lm_fe/env";
import { MyBaseList } from "@lm_fe/pages";
import React from "react";


// remindType 预约提醒1 超时提醒2 超时电话提醒3
export default function RemindRecord(prop: any) {
    const remindType = prop.remindType ?? 3
    return <MyBaseList
        name="/api/prenatal-visit-logs"

        searchParams={{
            'remindType.equals': remindType,
        }}
        needChecked
        useListSourceCount
        initialSearchValue={{

        }}
        searchConfig={[
            { label: '就诊卡号', name: 'prenatalVisitCriteria.pregnancy.outpatientNO', inputType: 'Input' },
            { label: '姓名', name: 'prenatalVisitCriteria.pregnancy.name', inputType: 'Input' },
            { label: '预约时间', name: 'appointmentDate', inputType: 'rangeDate' },
        ]}

        showAction={false}
        showAdd={false}


        genColumns={ctx => {
            return [
                {
                    title: '姓名',
                    dataIndex: ['prenatalVisit', 'pregnancy', 'name'],
                    width: APP_CONFIG.CELL_WIDTH_SMALL,
                    showSorter: false,
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '就诊卡号',
                    dataIndex: ['prenatalVisit', 'pregnancy', 'outpatientNO'],
                    width: APP_CONFIG.CELL_WIDTH_SMALL,
                    ellipsis: true,
                },
                {
                    title: '预产期',
                    dataIndex: ['prenatalVisit', 'pregnancy', 'edd'],
                    width: APP_CONFIG.CELL_WIDTH_SMALL,
                },
                {
                    title: '当前孕周',
                    dataIndex: ['prenatalVisit', 'pregnancy', 'currentGestationalWeek'],
                    width: APP_CONFIG.CELL_WIDTH_SMALL,
                    showSorter: false,
                    showFilter: false,
                },
                {
                    title: '上次复诊日期',
                    dataIndex: 'lastVisitDate',
                    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
                    render: (value: string) => formatTimeToDate(value),
                },
                {
                    title: '复诊预约日期',
                    dataIndex: 'appointmentDate',
                    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
                    render: (value: string) => formatTimeToDate(value),
                },
                {
                    title: '随访时间',
                    dataIndex: 'sendTime',
                    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
                    render: (value: string) => formatTimeToStandard(value),
                },
                {
                    title: '电话状态',
                    dataIndex: 'phoneStatus',
                    width: APP_CONFIG.CELL_WIDTH_SMALL,
                    render: (text) => {
                        let index = text ? text : 0;
                        const state = ['', '接听', '未接听', '未知'];
                        return state[index];
                    },
                },
                {
                    title: '超时原因',
                    dataIndex: 'timeoutReason',
                    width: APP_CONFIG.CELL_WIDTH_LARGE,
                    render: (text) => {
                        const state = ['', '住院', '转院', '已分娩', '终止妊娠', '其他'];
                        const index = text ? text : 0;
                        return state[index];
                    },
                },
                {
                    title: '其他原因',
                    dataIndex: 'reasonOther',
                    width: APP_CONFIG.CELL_WIDTH_LARGE,
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    width: APP_CONFIG.CELL_WIDTH_LARGE,
                },
            ]
        }}
    />
}

