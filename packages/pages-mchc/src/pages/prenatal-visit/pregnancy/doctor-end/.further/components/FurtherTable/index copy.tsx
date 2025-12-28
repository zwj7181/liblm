import { LazyAntd, MyForm } from '@lm_fe/components_m';
import { mchcEnv, mchcLogger, otherOptions } from '@lm_fe/env';
import { IMchc_Doctor_Diagnoses, IMchc_Doctor_OutpatientHeaderInfo, IMchc_Doctor_RvisitInfoOfOutpatient, IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit } from '@lm_fe/service';
import { Button, Modal, Spin } from 'antd';
import { cloneDeep, filter, forEach, get, isEmpty, set, size } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { config, printConfig } from './config';
import styles from './index.module.less';
import PrintTable from './print-table';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

interface IProps {
    visitsData?: IMchc_Doctor_RvisitInfoOfOutpatient,
    headerInfo: IMchc_Doctor_OutpatientHeaderInfo,
    setDiagnosesList?(list: IMchc_Doctor_Diagnoses[]): void
    setFormData(v: Partial<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>): void
}
export default function FurtherTable(props: IProps) {

    const { setFormData, setDiagnosesList, visitsData, headerInfo } = props;

    const [test, settest] = useState(false);
    (window as any).settest = settest

    const [formHandler, set_formHandler] = useState({} as any)
    const [isShowPrintTable, set_isShowPrintTable] = useState(false)
    const [hasPrint, set_hasPrint] = useState(false)
    const [printData, set_printData] = useState([])
    const [selectKeys, set_selectKeys] = useState<any[]>([])
    const [selectRows, set_selectRows] = useState<any[]>([])

    const printTableRef = useRef<HTMLDivElement>(null)

    const [selectItem, setSelectItem] = useState<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>()

    useEffect(() => {



        if (formHandler.subscribe) {
            formHandler.subscribe('visitsList', 'rowSelect', (select: any) => {
                set_selectKeys(select.selectedRowKeys)
                set_selectRows(select.selectedRows)

            });

            formHandler.subscribe('visitsList', 'rowDBClick', (val: IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit) => {
                setFormData(val);
                if (mchcEnv.is('广三'))
                    setDiagnosesList?.(visitsData?.diagnoses.filter(_ => _.serialNo === val.serialNo) ?? [])
            });
        }
    }, [formHandler])


    function getIndex(obj: any[], key: string) {
        let index;
        obj.forEach((item: any, i: number) => {
            if (item.fixedKey === key) index = i;
        });
        return index;
    };

    function getTypeIntro(type: any) {
        let intro = '';
        otherOptions.appointmentTypeOptions.forEach((item: any) => {
            if (item.value == type) intro = item.label.slice(0, 1);
        });
        return intro;
    };

    /*处理产检数据*/
    function resetData(Data: IMchc_Doctor_RvisitInfoOfOutpatient | undefined, tableConfig: any, Boolean: boolean = false) {
        if (!Data || !tableConfig) return Data;
        const rvisits = Data?.rvisits ?? []
        const data = filter(rvisits, (item) => item.id);
        let tableColumns: any[] = tableConfig[0].input_props.tableColumns;
        let hasBpd = false;
        let hasWeight = false;
        let hasAfv = false;
        let hasUbf = false;
        let hasFbg = false;
        let hasPbg2 = false;
        let hasHbalc = false;
        let hasIns = false;
        // let hasInsb = false;
        // let hasInsl = false;
        // let hasInsd = false;
        // let hasInss = false;
        let hasQuality = false;
        let hasQuantity = false;
        let hasPmedication = false;
        let hasHeartrate = false;
        let hasOtherNote = false;
        let hasDmedication = false;
        let hasTba = false;
        let hasAlt = false;
        let hasAst = false;
        let hasTsh = false;
        let hasT4 = false;

        forEach(data, (item: any) => {
            // 血压数据处理
            let pulse = '';
            let resetLic = '';
            let firstLic = '';
            let secondLic = '';
            let thirdLic = '';
            if (get(item, 'physicalExam.pulse')) {
                pulse = get(item, 'physicalExam.pulse');
            }
            if (get(item, 'physicalExam.systolic') || get(item, 'physicalExam.diastolic')) {
                firstLic = `${get(item, 'physicalExam.systolic')}/${get(item, 'physicalExam.diastolic')}`;
            }
            if (get(item, 'physicalExam.systolic2') || get(item, 'physicalExam.diastolic2')) {
                secondLic = `二测:${get(item, 'physicalExam.systolic2')}/${get(item, 'physicalExam.diastolic2')}；`;
            }
            if (get(item, 'physicalExam.systolic3') || get(item, 'physicalExam.diastolic3')) {
                thirdLic = `三测:${get(item, 'physicalExam.systolic3')}/${get(item, 'physicalExam.diastolic3')}；`;
            }
            if (!secondLic && !thirdLic) {
                resetLic = firstLic;
            } else {
                resetLic = '首测:' + firstLic + '；' + secondLic + thirdLic;
            }
            set(item, 'resetLic', resetLic);
            set(item, 'pulse', pulse);
            if (Boolean) {
                if (get(item, 'edema')) {
                    if (get(item, 'edema') === 1) {
                        set(item, 'edema', '-');
                    }
                    if (get(item, 'edema') === 2) {
                        set(item, 'edema', '+');
                    }
                    if (get(item, 'edema') === 3) {
                        set(item, 'edema', '++');
                    }
                    if (get(item, 'edema') === 4) {
                        set(item, 'edema', '+++');
                    }
                    if (get(item, 'edema') === 5) {
                        set(item, 'edema', '++++');
                    }
                }
            }

            /*胎心率、先露数据处理*/
            if (!isEmpty(get(item, 'fetusExam'))) {
                let resetTaix = '';
                let resetXianl = '';
                get(item, 'fetusExam').forEach((subItem: any) => {
                    let position = get(subItem, 'fetalPosition') ? `${get(subItem, 'fetalPosition')}:` : '';
                    if (get(subItem, 'fetalHeartRate')) {
                        resetTaix += `${position}${get(subItem, 'fetalHeartRate')};`;
                    }
                    if (get(subItem, 'presentation')) {
                        resetXianl += `${position}${get(subItem, 'presentation')};`;
                    }
                });
                set(item, 'resetTaix', resetTaix);
                set(item, 'resetXianl', resetXianl);
            }

            /*胎儿超声数据处理*/
            if (!isEmpty(get(item, 'childUltrasounds'))) {
                let resetBpd = '';
                let resetWeight = '';
                let resetAfv = '';
                let resetUbf = '';
                get(item, 'childUltrasounds').forEach((subItem: any, subIndex: any) => {
                    if (get(subItem, 'bpd')) {
                        resetBpd += (subIndex === 0 ? '' : '/') + get(subItem, 'bpd');
                        hasBpd = true;
                    }
                    if (get(subItem, 'fetalweight')) {
                        resetWeight += (subIndex === 0 ? '' : '/') + get(subItem, 'fetalweight');
                        hasWeight = true;
                    }
                    if (get(subItem, 'afv')) {
                        resetAfv += (subIndex === 0 ? '' : '/') + get(subItem, 'afv');
                        hasAfv = true;
                    }
                    if (get(subItem, 'ubf')) {
                        resetUbf += (subIndex === 0 ? '' : '/') + get(subItem, 'ubf');
                        hasUbf = true;
                    }
                });
                set(item, 'childUltrasounds.resetBpd', resetBpd);
                set(item, 'childUltrasounds.fetalweight', resetWeight);
                set(item, 'childUltrasounds.afv', resetAfv);
                set(item, 'childUltrasounds.ubf', resetUbf);
            }

            /*胰岛素方案数据处理*/
            if (get(item, 'gdm.inslname')) hasIns = true;
            // if (get(item, 'pvGdm.insbname') && get(item, 'pvGdm.insbu')) {
            //   set(item, 'resetInsb', `${get(item, 'pvGdm.insbname')}:${get(item, 'pvGdm.insbu')}U`);
            //   hasInsb = true;
            // }
            // if (get(item, 'pvGdm.inslname') && get(item, 'pvGdm.inslu')) {
            //   set(item, 'resetInsl', `${get(item, 'pvGdm.inslname')}:${get(item, 'pvGdm.inslu')}U`);
            //   hasInsl = true;
            // }
            // if (get(item, 'pvGdm.insdname') && get(item, 'pvGdm.insdu')) {
            //   set(item, 'resetInsd', `${get(item, 'pvGdm.insdname')}:${get(item, 'pvGdm.insdu')}U`);
            //   hasInsd = true;
            // }
            // if (get(item, 'pvGdm.inssname') && get(item, 'pvGdm.inssu')) {
            //   set(item, 'resetInss', `${get(item, 'pvGdm.inssname')}:${get(item, 'pvGdm.inssu')}U`);
            //   hasInss = true;
            // }

            /*下次复诊数据处理*/
            if (get(item, 'appointmentDate')) {
                let str1 = get(item, 'appointmentDate').slice(5),
                    str2 = '',
                    str3 = '';
                if (!!get(item, 'appointmentPeriod')) {
                    const period = get(item, 'appointmentPeriod') === '1' ? '上午' : '下午';
                    str2 = period.slice(0, 1);
                }
                if (!!get(item, 'appointmentType')) str3 = getTypeIntro(get(item, 'appointmentType'));
                set(item, 'resetAppoint', `${str1} ${str2} ${str3}`);
            }

            /*GDM显示判断*/
            if (get(item, 'gdm.fbg')) hasFbg = true;
            if (get(item, 'gdm.pbg2')) hasPbg2 = true;
            if (get(item, 'gdm.hbalc')) hasHbalc = true;

            /*尿蛋白显示判断*/
            if (get(item, 'pih.quality')) hasQuality = true;
            if (get(item, 'pih.quantity')) hasQuantity = true;
            if (get(item, 'pih.medication')) hasPmedication = true;

            /*心率特征显示判断*/
            if (get(item, 'cardiacDisease.heartrate')) hasHeartrate = true;
            if (get(item, 'cardiacDisease.otherNote')) hasOtherNote = true;
            if (get(item, 'cardiacDisease.medication')) hasDmedication = true;

            /*ICP显示判断*/
            if (get(item, 'icp.tba')) hasTba = true;
            if (get(item, 'icp.alt')) hasAlt = true;
            if (get(item, 'icp.ast')) hasAst = true;

            /*甲减显示判断*/
            if (get(item, 'hypothyroidism.tsh')) hasTsh = true;
            if (get(item, 'hypothyroidism.t4')) hasT4 = true;
        });

        /*全部记录中不存在对应数据的, 则不在表格中显示*/
        const spliceColnmns = (key: string, arr: { subTitle: string, param: boolean }[]) => {
            const PIndex = getIndex(tableColumns, key);
            const paramArr: any = [];
            arr.forEach((item) => {
                paramArr.push(item.param);
            });

            if (paramArr.includes(true)) {
                if (size(paramArr) < 2) return;
                arr.forEach((item, index) => {
                    if (!item.param) {
                        const CIndex = getIndex(tableColumns[PIndex].children, item.subTitle);
                        tableColumns[PIndex].children.splice(CIndex, 1);
                    }
                });
            } else {
                tableColumns.splice(PIndex, 1);
            }
        };

        spliceColnmns('childUltrasounds', [
            { subTitle: 'resetBpd', param: hasBpd },
            { subTitle: 'fetalweight', param: hasWeight },
            { subTitle: 'afv', param: hasAfv },
            { subTitle: 'ubf', param: hasUbf },
        ]);

        spliceColnmns('gdm', [
            { subTitle: 'gdm.fbg', param: hasFbg },
            { subTitle: 'gdm.pbg2', param: hasPbg2 },
            { subTitle: 'gdm.hbalc', param: hasHbalc },
        ]);

        spliceColnmns('gdm.inslname', [{ subTitle: 'gdm.inslname', param: hasIns }]);
        // spliceColnmns('resetIns', [
        //   { subTitle: 'resetInsb', param: hasInsb },
        //   { subTitle: 'resetInsl', param: hasInsl },
        //   { subTitle: 'resetInsd', param: hasInsd },
        //   { subTitle: 'resetInss', param: hasInss },
        // ]);

        spliceColnmns('pih', [
            { subTitle: 'pih.quality', param: hasQuality },
            { subTitle: 'pih.quantity', param: hasQuantity },
            { subTitle: 'pih.medication', param: hasPmedication },
        ]);

        spliceColnmns('cardiacDisease.heartrate', [{ subTitle: 'cardiacDisease.heartrate', param: hasHeartrate }]);

        spliceColnmns('cardiacDisease.medication', [{ subTitle: 'cardiacDisease.medication', param: hasDmedication }]);

        spliceColnmns('icp', [
            { subTitle: 'icp.tba', param: hasTba },
            { subTitle: 'icp.alt', param: hasAlt },
            { subTitle: 'icp.ast', param: hasAst },
        ]);

        spliceColnmns('hypothyroidism', [
            { subTitle: 'hypothyroidism.tsh', param: hasTsh },
            { subTitle: 'hypothyroidism.t4', param: hasT4 },
        ]);

        return data;
    };

    function handleCancel() {

        set_isShowPrintTable(false)
    };

    async function handlePrint(bool: boolean) {
        console.log('visitsData', visitsData);


        if (bool) {
            let cloneConfig = cloneDeep(printConfig);
            const newData = resetData(visitsData, cloneConfig, true);
            set_printData(newData)
        } else {
            forEach(selectRows, (item: any) => {
                if (get(item, 'edema')) {
                    if (get(item, 'edema') === 1) {
                        set(item, 'edema', '-');
                    }
                    if (get(item, 'edema') === 2) {
                        set(item, 'edema', '+');
                    }
                    if (get(item, 'edema') === 3) {
                        set(item, 'edema', '++');
                    }
                    if (get(item, 'edema') === 4) {
                        set(item, 'edema', '+++');
                    }
                    if (get(item, 'edema') === 5) {
                        set(item, 'edema', '++++');
                    }
                }
            });


            set_printData(selectRows)

        }

        set_hasPrint(bool)
        set_isShowPrintTable(false)
    };

    function buttons() {
        return [
            <ReactToPrint
                trigger={() => (
                    <div>
                        <Button type="primary" onClick={() => handlePrint(true)}>
                            续打
                        </Button>
                        <Button type="primary" onClick={() => handlePrint(false)}>
                            打印
                        </Button>
                    </div>
                )}
                /*为了获取更新数据后的页面*/
                onBeforeGetContent={async () => {
                    setTimeout(() => { }, 100);
                }}
                content={() => printTableRef.current}
            />,
        ];
    }

    function handleMoreBtn() {

        set_isShowPrintTable(true)
    };

    function printTable() {
        let cloneConfig = cloneDeep(printConfig);
        const newData = resetData(visitsData, cloneConfig);

        return (
            <Modal
                centered
                title="产检记录"
                className="print-modal"
                visible={isShowPrintTable}
                width="90%"
                onCancel={handleCancel}
                footer={buttons()}
            >
                <MyForm
                    config={cloneConfig}
                    value={newData}
                    getFormHandler={set_formHandler}
                    submitChange={false}
                />
                <div style={{ display: 'none' }}>
                    <PrintTable
                        printConfig={cloneConfig}
                        printData={printData}
                        hasPrint={hasPrint}
                        selectKeys={selectKeys}
                        printTableRef={printTableRef}
                        headerInfo={headerInfo}
                    />
                </div>
            </Modal>
        );
    }

    let cloneConfig = cloneDeep(config);
    const newData = resetData(visitsData, cloneConfig);


    mchcLogger.log('newData', JSON.parse(JSON.stringify({ newData, cloneConfig, visitsData })))

    return (
        <div className={styles['FurtherTable']}>
            {(visitsData) ? (
                <>

                    <div className="btn-wrap">
                        <Button size="small" onClick={handleMoreBtn}>
                            查看更多...{selectItem?.visitDate}
                        </Button>
                    </div>
                    <Table bordered pagination={false} size='small'
                        onRow={(record) => {

                            return {
                                onClick(event) {
                                    set_selectKeys([record.id])
                                    set_selectRows([record])
                                    setSelectItem(record)

                                },
                                onDoubleClick() {
                                    setFormData(record);
                                    if (mchcEnv.is('广三'))
                                        setDiagnosesList?.(visitsData?.diagnoses.filter(_ => _.serialNo === record.serialNo) ?? [])
                                },

                            };
                        }}
                        rowClassName={r => {
                            return r.id === selectItem?.id ? styles['selected-row'] : ''
                        }}
                        dataSource={visitsData?.rvisits ?? []}
                        columns={[
                            {
                                title: '日期',
                                width: 70,
                                dataIndex: 'visitDate',
                                align: 'center'
                            },
                            {
                                title: '孕周',
                                dataIndex: 'gestationalWeek',
                                width: 40,
                                align: 'center'
                            },
                            {
                                title: <span>体重<em>kg</em></span>,
                                dataIndex: ['physicalExam', 'weight'],
                                width: 40,
                                align: 'center'
                            },
                            {
                                title: <span>血压<em>mmHg</em></span>,
                                width: 90,
                                dataIndex: ['physicalExam', 'weight'],
                                align: 'center',
                                render(a, b) {
                                    const pe = b.physicalExam
                                    return <div>
                                        {
                                            pe.systolic && pe.diastolic && <div>首测:{pe.systolic}/{pe.diastolic};</div>
                                        }
                                        {
                                            pe.systolic2 && pe.diastolic2 && <div>二测:{pe.systolic2}/{pe.diastolic2};</div>
                                        }
                                        {
                                            pe.systolic3 && pe.diastolic3 && <div>三测:{pe.systolic3}/{pe.diastolic3}</div>
                                        }
                                    </div>
                                }
                            },
                            {
                                title: <span>脉搏<em>次/分</em></span>,
                                width: 40,
                                dataIndex: ['physicalExam', 'pulse'],
                                align: 'center'
                            },
                            {
                                title: <span>双肺听诊<em></em></span>,
                                dataIndex: ['physicalExam', 'lungAuscultation'],
                                align: 'center'
                            },
                            {
                                title: <span>心脏听诊<em></em></span>,
                                dataIndex: ['physicalExam', 'heartAuscultation'],
                                align: 'center'
                            },
                            {
                                title: <span>宫高<em>cm</em></span>,
                                dataIndex: ['gynExam', 'fundalHeight'],
                                width: 40,
                                align: 'center'
                            },
                            {
                                title: <span>腹围<em>cm</em></span>,
                                dataIndex: ['gynExam', 'waistHip'],
                                width: 40,
                                align: 'center'
                            },
                            {
                                title: <span>后宫颈检查<em></em></span>,
                                dataIndex: ['gynExam', 'cervix'],
                                align: 'center'
                            },
                            {
                                title: <span>盆骨出口<em></em></span>,
                                dataIndex: ['gynExam', 'pelvicBone'],
                                align: 'center'
                            },
                            {
                                title: <span>下肢水肿<em></em></span>,
                                dataIndex: ['edema'],
                                width: 40,
                                align: 'center',
                                render(value, record, index) {
                                    return {
                                        null: '',
                                        '': '',
                                        1: '-',
                                        2: '+',
                                        3: '++',
                                        4: '+++',
                                        5: '++++',
                                    }[value]

                                },
                            },
                            {
                                title: <span>胎心率<em>bpm</em></span>,
                                dataIndex: ['resetTaix'],
                                width: 50,
                                align: 'center'
                            },
                            {
                                title: <span>先露<em></em></span>,
                                width: 50,
                                dataIndex: ['resetXianl'],
                                align: 'center'
                            },
                            {
                                title: <span>其他异常特征<em></em></span>,
                                dataIndex: ['cardiacDisease', 'otherNote'],
                                align: 'center'
                            },
                            {
                                title: <span>主诉<em></em></span>,
                                dataIndex: ['chiefComplaint'],
                                align: 'center'
                            },
                            {
                                title: <span>检验检查<em></em></span>,
                                width: 80,
                                ellipsis: true,
                                dataIndex: ['exam'],
                                align: 'center'
                            },
                            {
                                title: <span>处理措施<em></em></span>,
                                dataIndex: ['prescription'],
                                align: 'center'
                            },
                            {
                                title: <span>下次复诊<em></em></span>,
                                dataIndex: ['resetAppoint'],
                                width: 80,
                                ellipsis: true,
                                align: 'center'
                            },
                            {
                                title: <span>医生<em></em></span>,
                                dataIndex: ['doctorName'],
                                ellipsis: true,
                                width: 40,
                                align: 'center'
                            },
                        ]}
                    />
                    {printTable()}
                </>
            ) : (
                <div className={styles['loading-wrapper']}>
                    <Spin />
                </div>
            )}
        </div>
    );
}
