import { BF_Wrap2, MyBaseList } from '@lm_fe/pages'
import { formatDate, getMomentRange } from "@lm_fe/utils"
import React from "react"
import { Follow_up_btn_两癌 } from '../../gynecological-diseases/two-cancers/.两癌随访'
import { defineFormConfig } from '@lm_fe/service'
export default function BreastCancerDataReport(prop: any) {

    const { Wrap, config } = BF_Wrap2({
        default_conf: {
            title: '两癌筛查-宫颈癌异常统计',
            name: "/api/statistics/cervical/cancer/exception/findAll",
            tableColumns: [
                { title: '门诊号', dataIndex: 'outpatientNO' },
                { title: '姓名', dataIndex: 'name' },
                { title: '年龄', dataIndex: 'age' },
                { title: '电话', dataIndex: 'telephone' },
                { title: '证件号码', dataIndex: 'idNO' },
                { title: '身份证地址', dataIndex: 'residenceAddress' },
                { title: '建档日期', dataIndex: 'registerDate', },
                { title: 'hpv结果', dataIndex: 'hpvResult', },


            ],
            searchConfig: defineFormConfig(
                [

                    { label: '门诊号', name: 'outpatientNO', inputType: 'Input' },
                    { label: '姓名', name: 'name', inputType: 'Input' },
                    { label: '证件号码', name: 'idNO', inputType: 'Input' },
                    { label: '建档日期', name: 'registerDate', inputType: 'rangeDate' },
                    { label: '身份证地址', name: 'residenceAddress', inputType: 'MyAddress', inputProps: {} },
                    { label: '分类', name: 'type', inputType: 'MS', inputProps: { uniqueKey: 'cancer.pathologyResultErrorType', type: 'tags', width: 360 } },

                ]
            )
        }
    })

    return <Wrap>
        <MyBaseList
            // apiPrefix="/fb/api"
            name={config?.name}
            searchParams={{
                // 'visitType.equals': 1,
            }}
            baseTitle="宫颈癌统计"
            needChecked
            useListSourceCount
            initialSearchValue={{
                validateDate: getMomentRange().近一周.map(formatDate)
            }}
            RenderAction={(ctx) => <Follow_up_btn_两癌 rowData={ctx.rowData} handleSearch={ctx.handleSearch} />}
            searchConfig={config?.searchConfig}

            showAdd={false}
            showExport

            tableColumns={config?.tableColumns}
        />
    </Wrap>
}

