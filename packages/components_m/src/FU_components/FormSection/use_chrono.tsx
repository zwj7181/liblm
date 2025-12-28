import { Dropdown_L, MyIcon, Table_L } from "@lm_fe/components"
import { IMchc_FormDescriptions_Field, IMchc_LabExamReport_Detail } from "@lm_fe/service"
import { is_fuck_abnormal, isNil, request, speculate_on_display } from "@lm_fe/utils"
import { Button, Divider, Space, Tag } from "antd"
import { get, isBoolean } from "lodash"
import React, { FC, useMemo, useRef } from "react"
import { DoctorEnd_ImageReport_Report, DoctorEnd_SurveyReport_Report } from "src/FB_components"

import { FormInstance } from "antd/lib/form"
import styles from './use_chrone.module.less'
import { OkButton } from "../OkButton"

interface IChronoConfig {
    "columnCode": "nt",
    "columnValue": "20",
    "isNormal": 'true' | 'false',
    "isOut": 'true' | 'false',
    "reportId": "",
    "chrono": boolean,
    "history": "/api/prenatalExam/column/history/value?recordId=25&columnCode=nt",
    "labReport": "/api/prenatalExam/column/history/value?recordId=25&columnCode=nt",
    "imageReport": "/api/prenatalExam/column/history/value?recordId=25&columnCode=nt",
    "markIsNormal": "/api/prenatalExam/column/markIsNormal?recordId=734&columnCode=downsScreenEarly&isNormal=false",
}
interface IChronoHistory {
    "valueTime": string
    "isNormal": 'true' | 'false',

    "reportId": null,
    "labReport": string,
    "imageReport": string,
    "isOut": null,
    "columnValue": string
    "version": number
}
export function use_chrono<V = any>(props: { value?: any, onChange?: (...v: any[]) => void, config?: IMchc_FormDescriptions_Field, form?: FormInstance }) {
    const { form, config } = props
    // const _value = props.value ?? xx
    const _value = props.value

    const has_chrono = isBoolean(get(_value, 'chrono'))
    const chrono_conf: IChronoConfig | null = _value
    const __value = has_chrono ? get(_value, 'columnValue') : _value


    const chrono_cache = useRef(chrono_conf)
    chrono_cache.current = chrono_conf

    const safe_onchange = useRef(props.onChange)
    safe_onchange.current = props.onChange
    function onChange(...arg: any[]) {
        config?.inputProps?.onChange?.(...arg, form)
        if (has_chrono) {
            return props.onChange?.({ ...chrono_cache.current, columnValue: arg[0], modifyFlag: true } as IChronoConfig)
        }
        return props.onChange?.(...arg)

    }


    const fuck_abnormal = is_fuck_abnormal(_value)
    const Wrap = useMemo<FC<any>>(() =>
        (props) => {
            const { children } = props
            if (!chrono_conf || !chrono_conf.chrono) return <>{children}</>
            const history_url = chrono_conf.history

            const menus = <div style={{ padding: 4, background: '#fff', boxShadow: '#999 6px 6px 12px 0', display: 'flex', flexDirection: 'column' }}>
                {/* <Button onClick={() => request.get(chrono_conf.markIsNormal, { params: { isNormal: fuck_abnormal } }).then(() => set_fuck_abnormal(!fuck_abnormal))}>标记{fuck_abnormal ? '正常' : '异常'}</Button> */}
                <OkButton
                    btn_text={`标记${fuck_abnormal ? '正常' : '异常'}`}
                    onClick={() => {
                        safe_onchange.current?.({ ...chrono_cache.current, isNormal: fuck_abnormal ? 'true' : 'false', markFlag: true })
                    }}
                />
                <Divider style={{ margin: '2px 0' }} />

                <OkButton

                    disabled={!history_url}
                    onClick={() => {
                        request.get<IChronoHistory[]>(history_url)
                            .then(list => {
                                window.mchc_modal.open('test', {
                                    title: '查看历史',
                                    modal_data: {

                                        content: <Table_L
                                            dataSource={list.data}
                                            columns={[
                                                { title: '历史值', align: 'center', width: 320, ellipsis: true, dataIndex: 'columnValue', render: speculate_on_display },
                                                { title: '变更时间', align: 'center', dataIndex: 'valueTime' },
                                                { title: '变更人', align: 'center', dataIndex: 'modifiedBy' },
                                                {
                                                    title: '是否正常', align: 'center', dataIndex: 'isNormal', render(v, rowData) {
                                                        if (isNil(v)) return ''
                                                        return is_fuck_abnormal(rowData) ? <Tag color="red">异常</Tag> : '正常'
                                                    }
                                                },
                                                {
                                                    title: '查看', align: 'center', dataIndex: 'isNormal', render(v, rowData) {
                                                        if (isNil(v)) return ''
                                                        return <Space.Compact size="small">
                                                            <ReportButton data={rowData} />
                                                            <ImageButton data={rowData} />
                                                        </Space.Compact>
                                                    }
                                                },
                                            ]} />
                                    }
                                })
                            })
                    }}
                >
                    {/* <HistoryOutlined /> */}
                    查看历史

                </OkButton>
                <Divider style={{ margin: '2px 0' }} />
                <ReportButton data={chrono_conf} />
                <Divider style={{ margin: '2px 0' }} />
                <ImageButton data={chrono_conf} />
            </div>
            const is_out = chrono_conf?.isOut === 'true'
            return <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }} className={fuck_abnormal ? styles['abnormal'] : ''}>{children}</div>
                {/* <Button icon={<HistoryOutlined />} onClick={() => {

                }} /> */}
                {
                    is_out
                        ? null
                        : <Dropdown_L
                            trigger={['click']}
                            // icon={< DownOutlined />}
                            overlay={menus}
                        >
                            <OkButton type={'text'} danger={fuck_abnormal} icon={<MyIcon value='MoreOutlined' style={{}} />} />
                        </Dropdown_L >
                }

            </div>

        }
        , [
            chrono_conf?.history,
            chrono_conf?.isNormal,

        ])

    return {
        Wrap,
        chrono_conf: chrono_conf,
        value: __value,
        onChange
    }

}
function ReportButton({ data }: { data: { labReport: string } }) {
    const url = data.labReport
    return <OkButton

        disabled={!url}
        onClick={() => {
            return request.get<IMchc_LabExamReport_Detail>(url)
                .then(list => {
                    window.mchc_modal.open('test', {
                        title: '查看报告',
                        modal_data: {

                            content: <DoctorEnd_SurveyReport_Report detailData={list.data} />
                        }
                    })
                })
        }}
    >
        检验报告

    </OkButton>
}


function ImageButton({ data }: { data: { imageReport: string } }) {
    const url = data.imageReport
    return <OkButton

        disabled={!url}
        onClick={() => {
            return request.get<{ imageExamList: any[] }>(url)
                .then(list => {
                    window.mchc_modal.open('test', {
                        title: '查看报告',
                        modal_data: {

                            content: <DoctorEnd_ImageReport_Report tableData={list.data.imageExamList} />
                        }
                    })
                })
        }}
    >
        影像报告

    </OkButton>
}
export const ChronoWrapper: FC<any> = (props) => {
    return null
}