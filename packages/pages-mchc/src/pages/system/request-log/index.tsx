import { MyBaseList } from '@lm_fe/pages';
import { APP_CONFIG } from "@lm_fe/env";
import { formatDateTime, getSearchParamsAll, safe_json_parse } from "@lm_fe/utils";

import React from "react";

export default function RequestLog() {
    return <MyBaseList
        modalFormConfig={{
            bodyStyle: {
                // height: '80vh'
                height: undefined,
            },
            modal_data: {
                disableAll: true
            }
        }}
        name="/api/http-logs"
        beforeSearch={v => {
            // const str = v['reqTime.equals']
            // if (str) {
            //     v['reqTime'] = getMomentObj(str).toISOString()
            // }
            return v
        }}
        initialSearchValue={{
            reqTime: formatDateTime()
        }}
        searchConfig={[
            {
                name: 'reqTime',
                label: '请求时间',
                inputType: 'DatePicker',
                inputProps: {
                    showTime: true,
                    // format: formatDateTimeNoSecond.format,
                    format: formatDateTime.format,
                }
            },
            {
                label: '请求地址',
                inputType: 'input',
                name: 'url',
            },
            {
                name: 'clientIp',
                label: '请求IP',
                inputType: 'input',
            },
            {
                label: '响应状态码',
                inputType: 'input',
                name: 'status',
            },


            {
                label: '登陆账号',
                inputType: 'input',
                name: 'login',
            },
            {
                label: '登录名',
                inputType: 'input',
                name: 'userName',
            },
        ]}
        tableColumns={[
            {
                title: '请求地址',
                dataIndex: 'url',
                ellipsis: true,
                width: APP_CONFIG.CELL_WIDTH_SMALL,
                align: 'center',
                layout: '1/3',
            },
            {
                title: '请求时间',
                dataIndex: 'reqTime',
                ellipsis: true,
                width: APP_CONFIG.CELL_WIDTH_SMALL,
                sortType: 'date',
                align: 'center',
                layout: '1/3',
            },
            // {
            //     title: '请求结束时间',
            //     dataIndex: 'resTime',
            //     ellipsis: true,
            //     width: APP_CONFIG.CELL_WIDTH_SMALL,
            //     sortType: 'date',
            //     align: 'center',
            //     layout: '1/3',
            // },
            {
                title: '客请求IP',
                dataIndex: 'clientIp',
                ellipsis: true,
                width: APP_CONFIG.CELL_WIDTH_SMALL,
                showSorter: false,
                align: 'center',
                layout: '1/3',
            },
            {
                title: '响应状态码',
                dataIndex: 'status',
                width: APP_CONFIG.CELL_WIDTH_SMALL,
                align: 'center',
                layout: '1/3',
            },
            {
                title: '响应时长',
                dataIndex: 'timetaken',
                width: APP_CONFIG.CELL_WIDTH_SMALL,
                showSorter: false,
                align: 'center',
                layout: '1/3',
            },

            {
                title: 'method',
                dataIndex: 'method',
                // hidden: true,
                inputType: 'Input',
                layout: '1/3',
            },
            {
                title: '请求参数',
                dataIndex: 'params',
                hidden: true,
                inputType: 'Input',
                layout: '1/1',
            },
            {
                title: 'headers',
                containerType: 'tabs',
                hidden: true,
                children: [{
                    dataIndex: 'headers',
                    inputType: 'MyMonaco',
                    inputProps: { language: 'json', height: 520 },
                }]
            },

            {
                title: 'resData',
                containerType: 'tabs',
                hidden: true,
                children: [
                    {
                        dataIndex: 'resData',
                        inputType: 'MyMonaco',
                        inputProps: { language: 'json', height: 520 },
                    }
                ]
            },
            {
                title: 'exception',
                containerType: 'tabs',
                hidden: true,
                children: [
                    {
                        dataIndex: 'exception',
                        inputType: 'MyMonaco',
                        inputProps: { language: 'json', height: 520 },
                    }
                ]
            },
            {
                title: 'params',
                containerType: 'tabs',
                hidden: true,
                children: [
                    {
                        dataIndex: 'params',
                        inputType: 'MyMonaco',
                        processRemote(v, form) {
                            if (!v) return
                            const maybeObj = safe_json_parse(v)
                            if (maybeObj) return JSON.stringify(maybeObj, null, 2)
                            const url = location.href + `?${v}`
                            const u = new URL(url)
                            const obj = getSearchParamsAll(u)
                            return JSON.stringify(obj, null, 2)
                        },
                        inputProps: { language: 'json', height: 520 },
                    }
                ]
            },
        ]}
    />
}