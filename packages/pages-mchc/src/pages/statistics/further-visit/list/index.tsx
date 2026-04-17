import { OkButton } from "@lm_fe/components_m";
import { rt_ctx } from "@lm_fe/env";
import { MyBaseList } from "@lm_fe/pages";
import React from "react";
const ctx = rt_ctx

export default function Archive(props: any) {

    return <MyBaseList
        table_preset={{
            title: '统计管理-门诊就诊统计',
            tableColumns: () => import('./table_config'),
            searchConfig: () => import('./serch_config'),
            name: '/api/getPrenatalVisitStatistics',
            initialSearchValue: () => ({ visitDate: ctx.utils.getMomentRange()['年初至今'].map(ctx.utils.formatDate) }),

            showAction: 0,
            showAdd: 0,
            renderBtns: () => {
                return <>
                    {
                        ctx.ui.render_btn('导出', () => {
                            ctx.request
                                .get('/api/exportPrenatalVisitStatistics', { params: ctx.props.table_helper.getSearchParams(), responseType: 'blob', })
                                .then(res => {
                                    ctx.utils.downloadFile(res.data, `就诊统计表` + ctx.utils.formatDate() + `.xls`, 'application/vnd.ms-excel');
                                })
                        })
                    }
                </>
            }
        }}

    />
}