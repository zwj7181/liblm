import { MyLazyComponent, Table_L } from '@lm_fe/components';
import { OkButton } from '@lm_fe/components_m';
import { mchcUtils } from '@lm_fe/env';
import { BF_Wrap2, mchcModal__ } from '@lm_fe/pages';
import { IMchc_Doctor_Diagnoses, IMchc_Doctor_OutpatientHeaderInfo, IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient, IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient_Record } from '@lm_fe/service';
import { Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { use_provoke } from '@lm_fe/provoke';
import { expect_array, identity } from '@lm_fe/utils';
import React from 'react';
interface IProps {
    visitsData?: IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient,
    headerInfo: IMchc_Doctor_OutpatientHeaderInfo,
    setDiagnosesList?(list: IMchc_Doctor_Diagnoses[]): void
    setFormData(v: Partial<IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient_Record>): void

    formData?: Partial<IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient_Record>,
    furtherRefresh(): void
}

export default function FurtherTable(props: IProps) {
    const sys_theme = use_provoke(s => s.sys_theme)
    const { setFormData, setDiagnosesList, visitsData, furtherRefresh, formData, } = props;

    const preg_id = mchcUtils.single_id(visitsData);



    const [selectKeys, set_selectKeys] = useState<any[]>([])
    const [selectRows, set_selectRows] = useState<any[]>([])

    const printTableRef = useRef<HTMLDivElement>(null)
    const { config, Wrap } = BF_Wrap2({ default_conf: { title: '产后复诊记录-产检记录表格', tableColumns: () => import('./config') } })

    useEffect(() => {



    }, [])

    const filtered_rvisits = (visitsData?.recordsAfterDelivery ?? []).filter(_ => _.id)







    async function handlePrint() {

        mchcModal__.open('print_modal', {
            modal_data: {
                requestData: {
                    url: '/api/pdf-preview',
                    id: preg_id,
                    resource: 'prenatalRVisitCH'
                }
            }
        })
    };







    const renderTable = (isAll = false) => {
        return <Wrap>
            <Table_L
                bordered
                title={
                    isAll ? undefined : () => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>共 {filtered_rvisits.length} 条记录</span>
                            <Space>
                                <OkButton type="text" size="small" onClick={furtherRefresh} >
                                    刷新
                                </OkButton>
                                <OkButton type="text" size="small" onClick={handlePrint} >
                                    打印
                                </OkButton>
                                <OkButton type='text' size="small" onClick={() => mchcModal__.open('modal_page', { modal_data: { content: renderTable(true) } })}>
                                    更多...
                                </OkButton>
                            </Space>
                        </div>
                    )
                }
                scroll={isAll ? undefined : { y: 160 }}
                pagination={false}
                size={isAll ? 'large' : 'small'}
                // rowSelection={{
                //     selectedRowKeys: selectKeys,
                //     onChange(keys, rows) {
                //         mchcLogger.log({ keys, rows })
                //         set_selectKeys(keys)
                //         set_selectRows(rows)
                //     }
                // }}

                onRow={(record) => {
                    const is_target = record.id === formData?.id
                    const background = is_target ? sys_theme.colors?.light[3] : undefined
                    const cursor = is_target ? undefined : 'pointer'
                    const color = is_target ? '#fff' : undefined
                    return {
                        style: { background, cursor, color },
                        onClick(event) {
                            set_selectKeys([record.id])
                            set_selectRows([record])

                        },
                        onDoubleClick() {
                            setFormData(record);
                            mchcModal__.pop()

                        },

                    };
                }}
                // rowClassName={r => {
                //     return r.id === formData?.id ? styles['selected-row'] : ''
                // }}
                rowHoverable={false}
                rowKey={'id'}
                dataSource={isAll ? filtered_rvisits : filtered_rvisits.slice(0, 5)}
                columns={[
                    ...expect_array<any>(config?.tableColumns),

                ].filter(identity)}
            />
        </Wrap>

    }
    return (
        <div style={{ marginBottom: 8 }} >
            <MyLazyComponent size='middle'>

                {renderTable()}


            </MyLazyComponent>

        </div>
    );
}
