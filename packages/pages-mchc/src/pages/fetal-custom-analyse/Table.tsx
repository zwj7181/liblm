import { SimpleForm } from '@lm_fe/components';
import { mchcEvent, mchcLogger } from '@lm_fe/env';
import { IZsy_CtgRecord, SZsy_CtgRecord } from '@lm_fe/service';
import { Button, Checkbox, Form, Input, InputNumber, message, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import strategies from './strategies/strategies';
import { emptyValue } from './strategies/utils';
import { AnalyseType, tableData } from './tableData';
import useSign from './useSign';

import { mchcModal__ } from '@lm_fe/pages';
import { request } from '@lm_fe/utils';
import { HistoryTable } from '../fetal-custom-analyse-list/HistoryTable';
interface IProps {
    name: string
    hidden?: boolean
    pv?: IZsy_CtgRecord
    fetchData: () => Promise<any>
    [x: string]: any
}
const T = function (props: IProps) {
    const { hidden, pv, fetchData } = props
    const [isSaved, setIsSaved] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [form0] = Form.useForm()
    const [form1] = Form.useForm()
    const [cacheType, setCacheType] = useState<AnalyseType>('Nst')

    const dataSource = tableData[cacheType]
    const deformed = dataSource.deformed


    const { fetchQrCode, qrCodeBase64, modalVisible, setModalVisible } = useSign()


    async function saveCb(qrCodeIdentity: string, userToken: string) {

        const res = await do_save({
            signOriginData: qrCodeIdentity,
            signedData: userToken
        })

        return res
    }
    async function do_save(data: Partial<IZsy_CtgRecord> = {}) {
        if (!pv) return false
        const save = {
            ...form0.getFieldsValue(),
            ...form1.getFieldsValue()
        }
        const res = await SZsy_CtgRecord.saveRecord({
            ...pv,
            ...save,
            state: 1,
            ...data,
            id: pv.id,
        })

        await fetchData()
        message.info('保存成功')
        return res
    }

    useEffect(() => {


        mchcEvent.on('signed', saveCb)

        return () => {
            mchcEvent.off('signed', saveCb)

        };
    }, [saveCb])
    const c = { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: 200 }
    const columns: any = [
        {
            title: '项目',
            dataIndex: 'name',
            render(a: any) {
                return (
                    <span style={{ whiteSpace: 'nowrap', }}>{a}</span>
                )
            }
        },
        {
            title: deformed ? '正常' : '0分',
            dataIndex: '0',
            render(a) {
                return (
                    <div title={a} style={{ cursor: 'help', fontSize: 12, }}>{a}</div>
                )
            }
        },
        {
            title: deformed ? '可疑' : '1分',
            dataIndex: '1',
            render(a) {
                return (
                    <div title={a} style={{ cursor: 'help', fontSize: 12, }}>{a}</div>
                )
            }
        },
        {
            title: deformed ? '异常' : '2分',
            dataIndex: '2',
            render(a) {
                return (
                    <div title={a} style={{ cursor: 'help', fontSize: 12, }}>{a}</div>
                )
            }
        },
        false ? null : {
            // width: deformed ? 180 : undefined,
            title: (
                <Form.Item name={deformed ? 'result' : 'total'} label={deformed ? '结果' : '总分'} style={{ margin: '0 12px', marginBottom: 0, display: 'flex', justifyContent: 'center' }}>
                    <InputNumber disabled style={{ marginRight: 0 }} />
                </Form.Item>
            ),
            dataIndex: 'result',
            render(a, { key, R }) {
                return (
                    <Form.Item name={`${key}value`} style={{ margin: -8, marginTop: -8, marginBottom: -8 }}>
                        {
                            R ? <R disabled={isDisabled} /> : <Input size="small" disabled={isDisabled} style={{ width: '80%' }} />

                        }
                    </Form.Item>
                )
            }
        },
        false ? null : {
            title: deformed ? '类型' : '得分',
            dataIndex: 'score',
            render(a, { key, S }) {
                return (

                    <Form.Item name={`${key}score`} style={{ margin: -8, marginTop: -8, marginBottom: -8, padding: '0 8px' }}>
                        {
                            S ? <S disabled={true} /> : <InputNumber size="small" disabled={true} style={{}} />
                        }
                    </Form.Item>
                )

            }
        },

    ]
        .filter(_ => !!_)
        .map(_ => ({ ..._, align: 'center' }))
    useEffect(() => {
        form1.setFieldsValue({
            type: cacheType
        })
        // form0.setFieldsValue(emptyValue[cacheType])
    }, [cacheType])

    useEffect(() => {
        if (pv?.type) {
            form0.setFieldsValue(pv)
            form1.setFieldsValue(pv)
            setCacheType(pv?.type)

        } else {
            setCacheType('Nst')
            form0.setFieldsValue(emptyValue['Nst'])

        }
        if (pv?.state === 1) {
            setIsSaved(true)
        }
        setIsEditing(false)
    }, [pv])
    const isDisabled = isSaved && !isEditing
    return (
        <>

            <Form form={form0} size="small" style={{ display: (false && hidden) ? 'none' : 'block', position: 'relative', margin: 12 }}
                initialValues={{ deformed }}
                layout="inline"
                onValuesChange={(a, b) => {
                    const vk = Object.keys(b)
                    const k_ = Object.keys(a)[0]
                    if (/score$/.test(k_)) {
                        const total = vk
                            .filter((k) => /score$/.test(k))
                            .map(_ => b[_])
                            .reduce((a: any, b: any) => a + b, 0)
                        form0.setFieldsValue({ total })
                    }
                    const newData = strategies(form1.getFieldsValue().type, form0.getFieldsValue(),)
                    newData && form0.setFieldsValue(newData)

                }}>
                {/* <Form.Item name={deformed ? 'result' : 'total'} label={deformed ? '结果' : '总分'} style={{ position: 'absolute', top: -44, right: 260 }}>
                <InputNumber disabled style={{ width: 120 }} />
            </Form.Item> */}

                <Form.Item name={'deformed'} style={{ display: 'none', visibility: 'hidden' }} valuePropName="checked">
                    <Checkbox />
                </Form.Item>



                {/* <Table bordered size="small" pagination={false} columns={columns} dataSource={dataSource} /> */}
            </Form>
            <SimpleForm
                onValuesChange={(a, b) => {
                    const keys = ['nst', 'cst', 'oct']
                    const [k, v] = Object.entries(a)[0]
                    const index = keys.indexOf(k)

                    let old: string = b.diagnosis || ''
                    const nstReg = /【NST：.*】/
                    const cstReg = /【CST：.*】/
                    const octReg = /【OCT：.*】/

                    if (index === 0) {
                        const text = `【NST：${v}】`
                        old = old.replace(cstReg, '')
                        old = old.replace(octReg, '')
                        const diagnosis = nstReg.test(old) ? old.replace(nstReg, () => text) : old.concat(text)

                        form1.setFieldsValue({ cst: undefined, oct: undefined, diagnosis })

                    } else if (index === 1) {
                        const text = `【CST：${v}】`

                        old = old.replace(nstReg, '')
                        old = old.replace(octReg, '')
                        const diagnosis = cstReg.test(old) ? old.replace(cstReg, () => text) : old.concat(text)

                        form1.setFieldsValue({ nst: undefined, oct: undefined, diagnosis })

                    } else if (index === 2) {
                        const text = `【OCT：${v}】`

                        old = old.replace(nstReg, '')
                        old = old.replace(cstReg, '')
                        const diagnosis = octReg.test(old) ? old.replace(octReg, () => text) : old.concat(text)

                        form1.setFieldsValue({ nst: undefined, cst: undefined, diagnosis })

                    }

                    if (a.type) {
                        if (pv?.type === a.type) {
                            form0.setFieldsValue(pv)
                        } else {
                            form0.setFieldsValue(emptyValue[a.type])
                        }
                    }
                    b.type && setCacheType(b.type)
                }}
                disabled={isDisabled}
                form={form1}
                blocks={[
                    {
                        // title: '搜索条件',
                        rows: [
                            {
                                itemsInRow: [
                                    { type: 'Select', outerOptions: { name: 'type', label: '分析方法' }, innerOptions: { allowClear: false, options: ['Nst', 'Krebs', 'Fischer', 'Sogc', 'Cst', 'Cstoct'].map(_ => ({ label: _, value: _ })) } },

                                    { type: 'Select', outerOptions: { name: 'fetal', label: '胎心率' }, innerOptions: { options: ['FHR1', 'FHR2', 'FHR3',].map(_ => ({ label: _, value: _ })) } },
                                ],
                                layoutType: 6
                            },
                            {
                                itemsInRow: [

                                    // { type: 'Input', outerOptions: { name: 'uctimes', label: '宫缩次数' }, },
                                    // { type: 'Input', outerOptions: { name: 'ucStrong', label: '宫缩强度' }, },
                                    // { type: 'Input', outerOptions: { name: 'ucdurationtime', label: '间隔时间' }, },
                                    // { type: 'Input', outerOptions: { name: 'uckeeptime', label: '持续时间' }, },
                                    // { type: 'Input', outerOptions: { name: 'edtimes', label: '早减' }, },
                                    // { type: 'Input', outerOptions: { name: 'ldtimes', label: '晚减' }, },
                                    // { type: 'Input', outerOptions: { name: 'vdtimes', label: '变异减速' }, },
                                    { type: 'Select', outerOptions: { name: 'nst', label: 'nst' }, innerOptions: { options: ['正常', '异常', '不典型',].map(_ => ({ label: _, value: _ })) } },
                                    { type: 'Select', outerOptions: { name: 'oct', label: 'oct' }, innerOptions: { options: ['阴性', '阳性', '可疑',].map(_ => ({ label: _, value: _ })) } },
                                    { type: 'Select', outerOptions: { name: 'cst', label: 'cst' }, innerOptions: { options: ['Ⅰ类', 'Ⅱ类', 'Ⅲ类',].map(_ => ({ label: _, value: _ })) } },
                                ],
                                layoutType: 6
                            },
                            {
                                itemsInRow: [
                                    { type: 'TextArea', outerOptions: { name: 'diagnosis', label: '诊断意见' }, layoutType: 16 },
                                    {
                                        type: 'Custom',
                                        customNode: <Space style={{ marginLeft: 12 }}>

                                            {
                                                isSaved ?
                                                    (
                                                        isDisabled ? <Button type="primary" style={{ padding: '0 24px', }}
                                                            disabled={!pv}
                                                            onClick={e => {
                                                                setIsEditing(true)
                                                            }}>
                                                            修改
                                                        </Button> : null
                                                    ) : <Button type="primary" style={{ padding: '0 24px', }}
                                                        disabled={!pv}
                                                        onClick={e => {
                                                            do_save()
                                                        }}>
                                                        保存
                                                    </Button>
                                            }

                                            {
                                                isEditing ? <>
                                                    <Button style={{ padding: '0 24px', }}
                                                        disabled={!pv}
                                                        onClick={e => {
                                                            setIsEditing(false)
                                                            if (pv?.type) {
                                                                form0.setFieldsValue(pv)
                                                                form1.setFieldsValue(pv)
                                                            }
                                                        }}>
                                                        取消
                                                    </Button>
                                                    <Button type="primary" style={{ padding: '0 24px', }}
                                                        disabled={!pv}
                                                        onClick={e => {
                                                            do_save()
                                                            setIsEditing(false)
                                                        }}>
                                                        确定
                                                    </Button>
                                                </> : <>
                                                    <Button type="primary" style={{ padding: '0 24px', }}
                                                        disabled={pv?.state !== 1}
                                                        onClick={e => {
                                                            pv && fetchQrCode(pv.doctorId)
                                                            console.log(form0.getFieldsValue(), form1.getFieldsValue())
                                                        }}>
                                                        签名
                                                    </Button>
                                                    <Button type="primary" style={{ padding: '0 24px', }}
                                                        disabled={pv?.state !== 1}
                                                        onClick={e => {
                                                            // message.warning('未实现')
                                                            request.post(`/Obcloud/api/ctg/sign/archive?recordId=${pv?.id}`)
                                                                .then(({ data }) => {
                                                                })
                                                        }}>
                                                        归档
                                                    </Button>

                                                    <Button type="primary" style={{ padding: '0 24px', }}
                                                        disabled={pv?.state !== 1}
                                                        onClick={e => {
                                                            if (pv) {
                                                                SZsy_CtgRecord.getReport(pv.id)
                                                                    .then((data) => {
                                                                        mchcLogger.log('data', data)
                                                                        mchcModal__.open('print_modal', {
                                                                            modal_data: { printData: data }
                                                                        })
                                                                    })

                                                                // request.post('/as/exam/pdf/2')
                                                                //     .then(({ data }) => {
                                                                //         event.emit('print', { printData: data.data.pdfdata })
                                                                //     })
                                                            }

                                                        }}>
                                                        打印
                                                    </Button>
                                                    <Button type="primary" style={{ padding: '0 24px', }}
                                                        disabled={pv?.state !== 1}
                                                        onClick={e => {
                                                            if (pv) {
                                                                SZsy_CtgRecord.getRecordHistory(pv.id)
                                                                    .then((data) => {

                                                                        mchcModal__.open('test', {
                                                                            title: '历史判图',
                                                                            width: '80vw',
                                                                            modal_data: {
                                                                                content: <HistoryTable dataSource={data} type='recordHistoryId' />
                                                                            }
                                                                        })
                                                                    })

                                                                // request.post('/as/exam/pdf/2')
                                                                //     .then(({ data }) => {
                                                                //         event.emit('print', { printData: data.data.pdfdata })
                                                                //     })
                                                            }

                                                        }}>
                                                        历史判图
                                                    </Button>
                                                </>
                                            }


                                        </Space>,
                                        layoutType: 8
                                    },

                                ],
                            },


                        ]
                    }
                ]}
            />


            <Modal visible={modalVisible} footer={null} title="请扫码" onCancel={() => setModalVisible(false)}>
                <img src={qrCodeBase64} width="480" />

            </Modal>
        </>
    );
}
export default T
