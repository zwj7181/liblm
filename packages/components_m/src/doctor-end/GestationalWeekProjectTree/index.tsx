import { mchcConfig } from '@lm_fe/env';
import { IMchc_Doctor_BuildExamTimeAxis, SMchc_Doctor, TIdTypeCompatible } from '@lm_fe/service';
import { Empty, List, Timeline, Divider } from 'antd';
import classnames from 'classnames';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { MyIcon } from '@lm_fe/components';
import { is_fuck_abnormal, isEmpty, speculate_on_display } from '@lm_fe/utils';
interface IProps {
    pregnancyId: TIdTypeCompatible
}
type TGroup = IMchc_Doctor_BuildExamTimeAxis['groups'][0]
export default function GestationalWeekProjectTree(props: IProps) {
    if (mchcConfig.get('医生端_检验检查时间轴隐藏'))
        return <Empty />
    const { pregnancyId } = props

    const [itemData, setItemData] = useState<IMchc_Doctor_BuildExamTimeAxis[]>([]);
    const [showAbnormal, setShowAbnormal] = useState(false);
    const [showSimple, setShowSimple] = useState(false);
    const [showCenter, setShowCenter] = useState(false);

    useEffect(() => {
        pregnancyId && getItemData();
    }, [pregnancyId]);

    const getItemData = async () => {
        const data = await SMchc_Doctor.buildExamTimeAxisByType(pregnancyId);
        setItemData(data);
    };

    const handleClickAbnormal = async () => {
        setShowAbnormal(!showAbnormal);
        const data = await SMchc_Doctor.buildExamTimeAxisByType(pregnancyId, showAbnormal ? 0 : 2, showSimple ? 1 : 0);
        setItemData(data);
    };
    const handleClickSimple = async () => {
        setShowSimple(!showSimple);
        const data = await SMchc_Doctor.buildExamTimeAxisByType(pregnancyId, showAbnormal ? 2 : 0, showSimple ? 0 : 1);
        setItemData(data);
    };

    const handleClickCenter = () => {
        // setShowCenter(!showCenter);
        setShowCenter(true);
        setTimeout(() => {
            setShowCenter(false);
        }, 500);
    };

    // 获取正常报告名称reportTitle，用'、'拼起来
    const reportsNormal = (group: TGroup) => {
        const reportsNormalItems = group.reports.filter(

            (report, reportIndex) => !report.itemInfosAbnormal,
        );
        const getReportTitles = reportsNormalItems.map((report, reportIndex) => report.reportTitle);
        return getReportTitles.join('、');
    };

    // 获取异常报告名称reportTitle，用'、'拼起来，指标用空格分隔
    const reportsAbnormal = (group: TGroup) => {
        const reportsAbnormalItems = group.reports.filter((report, reportIndex) =>
            report.itemInfosAbnormal,
        );
        const getReportDatas = reportsAbnormalItems.map((report, reportIndex) => {
            const reportTitle = report.reportTitle + ':';
            const reportAbnormalitemInfos = report.itemInfos.filter(
                (itemInfo, itemInfoIndex) => is_fuck_abnormal(itemInfo),
            );
            const descriptions = reportAbnormalitemInfos.map((itemInfo, itemInfoIndex) => itemInfo.description);
            return reportTitle + ' ' + descriptions.join('\xa0\xa0');
        });
        return getReportDatas.join('、');
    };
    return (
        <div className={styles["gestational-week-project-tree"]}>
            <div className={styles["gestational-week-project-tree-btns"]}>
                <a
                    className={classnames(styles['center-button'], {
                        [styles['background-grey']]: !showCenter,
                        [styles['background-blue']]: showCenter,
                    })}
                    onClick={handleClickCenter}
                    href="#current"
                >
                    <MyIcon value='AimOutlined' />
                </a>
                <a
                    className={classnames({
                        [styles['background-grey']]: !showAbnormal,
                        [styles['color-grey']]: !showAbnormal,
                        [styles['background-blue']]: showAbnormal,
                        [styles['color-white']]: showAbnormal,
                    })}
                    onClick={handleClickAbnormal}
                >
                    异
                </a>
                <a
                    className={classnames({
                        [styles['background-grey']]: !showSimple,
                        [styles['color-grey']]: !showSimple,
                        [styles['background-blue']]: showSimple,
                        [styles['color-white']]: showSimple,
                    })}
                    onClick={handleClickSimple}
                >
                    简
                </a>
            </div>
            {
                isEmpty(itemData)
                    ? <Empty />
                    : <Timeline  >

                        {map(itemData, (item, itemIndex) => (
                            <Timeline.Item
                                // className={classnames({
                                //     [styles['arrived-current']]: item.inCurrentGestationalWeek,
                                // })}
                                key={itemIndex}
                                color={item.arrived ? '#007AFF' : '#f0f0f0'}
                            // label={`${item.gestationalWeekStart}-${item.gestationalWeekEnd}周`}
                            >
                                <div id={item.inCurrentGestationalWeek ? 'current' : ''}>
                                    <div>{item.gestationalWeekStart}-{item.gestationalWeekEnd}周</div>
                                    <div>{item.message}</div>
                                    {!!item.lackReports.length ? (
                                        item.arrived ? (
                                            <div className={styles["color-orange"]}>
                                                <span>未见报告：</span>
                                                <span className={styles["make-bold"]}> {item.lackReports.join('、')}</span>
                                            </div>
                                        ) : (
                                            <div className={styles["color-grey"]}>
                                                <span>未见报告：</span>
                                                <span className={styles["make-bold"]}> {item.lackReports.join('、')}</span>
                                            </div>
                                        )
                                    ) : null
                                    }

                                    {
                                        item.groups.map((group, groupIndex) => {
                                            return (
                                                <div style={{ border: '1px dashed #bbb', borderRadius: 4, marginTop: 4 }} key={groupIndex}>

                                                    <div style={{ borderBottom: '1px dashed #ddd', padding: 4, }}>{group.groupDate}</div>

                                                    <div style={{ padding: 4 }}>
                                                        {
                                                            group.reports.map(rep => {
                                                                const items = rep.itemInfos

                                                                return <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                                    <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{rep.reportTitle}：</span>
                                                                    {
                                                                        items.map((item, idx) => {
                                                                            let v = speculate_on_display(item.value)
                                                                            return <span title={v} style={{ whiteSpace: 'nowrap' }}>
                                                                                <span style={{ fontWeight: 'bold' }}>{item.name}</span>:
                                                                                <span style={{ color: is_fuck_abnormal(item) ? 'red' : 'unset' }}>
                                                                                    {v}
                                                                                </span>
                                                                                {(items.length === idx + 1) ? '' : '/'}
                                                                            </span>
                                                                        })
                                                                    }
                                                                </div>
                                                            })
                                                        }
                                                        {/* {reportsNormal(group) && (
                                                    <div className={styles["detail-item-reports-normal"]}>{reportsNormal(group)}</div>
                                                )}
                                                {reportsAbnormal(group) && (
                                                    <div
                                                        className={styles["detail-item-reports-abnormal"]}
                                                        style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
                                                    >
                                                        {reportsAbnormal(group)}
                                                    </div>
                                                )} */}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
            }

        </div >
    );
}
