import { IGlobalModalProps } from '@lm_fe/components'
import { ICommonOption, mchcEnv } from '@lm_fe/env'
import {
    IMchc_Doctor_OutpatientHeaderInfo,
    IMchc_HighriskGradeConfig,
    IMchc_TemplateTree_Item,
    SMchc_Common,
    SMchc_Doctor,
    TIdTypeCompatible,
} from '@lm_fe/service'
import { request, ROMAN_NUMERALS } from '@lm_fe/utils'
import { Modal, Tabs, message } from 'antd'
import { get, keyBy, map } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { HighriskSign_高危因素管理 } from './HighriskSign'
import { HighriskTimeline_高危因素管理 } from './HighriskTimeline'
import { HighriskSign_Tag } from './Tag'
import styles from './index.module.less'
import { use_provoke } from '@lm_fe/provoke'
const boundSymbol = ':'
interface IProps {
    data?: IMchc_Doctor_OutpatientHeaderInfo
    pregnancyId: TIdTypeCompatible
    // 如果存在 onFinish 调用 onFinish，否则调用 handleSubmit
    onFinish?(v: IMchc_Doctor_OutpatientHeaderInfo): void
    handleSubmit?(): void

    hide高危标记?: boolean
    hide高危时间轴?: boolean
}
export default function HighriskFactor(props: IGlobalModalProps<IProps>) {
    const { modal_data, close, ...others } = props
    const { data, onFinish, handleSubmit, pregnancyId, hide高危时间轴, hide高危标记 } = modal_data

    const { 可选高危等级, 可选传染病 } = use_provoke('可选高危等级', '可选传染病')

    const [activeTabKey, set_activeTabKey] = useState(hide高危标记 ? (hide高危时间轴 ? '' : '2') : '1')

    const [initData, set_initData] = useState<IMchc_Doctor_OutpatientHeaderInfo>()

    const [headerInfo, setHeaderInfo] = useState<IMchc_Doctor_OutpatientHeaderInfo>()
    function assign_initData(part: Partial<IMchc_Doctor_OutpatientHeaderInfo> = {}) {
        set_initData(Object.assign({}, initData, part))
    }
    useEffect(() => {
        if (data) {
            setHeaderInfo(data)
        } else {
            SMchc_Doctor.getOutpatientHeaderInfo(pregnancyId).then(setHeaderInfo)
        }

        return () => {}
    }, [])

    async function onOk() {
        if (hide高危标记) {
            close?.(true)
            return
        }
        if (!initData?.infectionNote) {
            return message.info('请选择传染病!')
        }

        if (initData.highriskGrade && initData.highriskGrade !== ROMAN_NUMERALS[1]) {
            if (!initData.highriskNote) {
                message.error('请填写高危因素!')
                return
            }
        }
        if (initData.highriskNote) {
            if (!initData.highriskGrade) {
                message.error('请填写高危等级!')
                return
            }
        }
        console.log('initData', { initData })
        if (onFinish) {
            // 新建孕册
            if (headerInfo) {
                onFinish({
                    ...headerInfo,
                    ...initData,
                })
            }
        } else {
            await updateRiskRecords()
            handleSubmit?.()
        }
        close?.(true)
    }

    async function updateRiskRecords() {
        const postData = {
            outEmrId: get(headerInfo, 'id'),
            infectionNote: initData?.infectionNote,
            tags: initData?.tags,
            highriskNote: initData?.highriskNote,
            highriskGrade: initData?.highriskGrade,
            gestationalWeek: get(headerInfo, `gesweek`),
        }

        const res = await request.put('/api/doctor/assessHighRisk', postData)
        mchcEnv.success('信息保存成功!')
        // saveHeaderInfo({
        //   ...props.data,
        //   ...pick(post, ['infectionNote', 'highriskNote']),
        //   highriskLable: get(post, `highriskGrade`),
        // });
        // saveHeaderInfo(ress);
    }

    function handleClose() {
        close?.()
    }

    function handleTabChange(key: string) {
        set_activeTabKey(key)
    }

    return (
        <Modal
            {...others}
            className={styles['highrisk-pop']}
            styles={{
                body: {
                    padding: 0,
                    maxHeight: 700,
                },
            }}
            width={'80vw'}
            onCancel={handleClose}
            onOk={onOk}
        >
            <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
                {hide高危标记 ? null : (
                    <Tabs.TabPane tab="高危标记" key="1">
                        <HighriskSign_高危因素管理
                            initData={initData}
                            assign_initData={assign_initData}
                            gradeOptions={可选高危等级}
                            contagionOptions={可选传染病?.options}
                            headerInfo={headerInfo}
                        />
                    </Tabs.TabPane>
                )}
                {/* 暂时屏蔽 */}
                {hide高危时间轴 ? null : (
                    <Tabs.TabPane tab="高危时间轴" key="2">
                        <HighriskTimeline_高危因素管理 id={pregnancyId ?? headerInfo?.id} gradeOptions={可选高危等级} />
                    </Tabs.TabPane>
                )}
                {hide高危标记 ? null : (
                    <Tabs.TabPane tab="标签管理" key="3">
                        <HighriskSign_Tag
                            initData={initData}
                            assign_initData={assign_initData}
                            gradeOptions={可选高危等级}
                            contagionOptions={可选传染病?.options}
                            headerInfo={headerInfo}
                        />
                    </Tabs.TabPane>
                )}
            </Tabs>
        </Modal>
    )
}

// console.dir("mapStateToProps",mapStateToProps);
