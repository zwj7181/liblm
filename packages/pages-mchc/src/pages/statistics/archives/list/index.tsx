import { rt_ctx } from "@lm_fe/env";
import { MyBaseList } from "@lm_fe/pages";
import React from "react";

const ctx = rt_ctx
export default function Archive(props: any) {

    return <MyBaseList
        table_preset={{
            title: '统计管理-建档统计',
            tableColumns: () => import('./table_config'),
            searchConfig: () => import('./serch_config'),
            name: '/api/pregnancies',
            showAction: 0,
            showAdd: 0,
            renderBtns: () => {
                return <>
                    {
                        ctx.ui.render_btn('导出', () => {
                            ctx.request
                                .get('/api/pregnancies/createPregnancyExport', {
                                    params: ctx.props.table_helper.getSearchParams(),
                                    responseType: 'blob',
                                })
                                .then(res => {
                                    ctx.utils.downloadFile(res.data, `建档统计表` + ctx.utils.formatDate() + `.xls`, 'application/vnd.ms-excel');
                                })
                        })
                    }
                </>
            }
        }}


    />
}