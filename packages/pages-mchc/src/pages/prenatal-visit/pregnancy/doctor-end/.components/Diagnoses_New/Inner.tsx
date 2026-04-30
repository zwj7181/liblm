import { formatTimeToStandard, OkButton } from '@lm_fe/components_m';
import { mchcEnv, mchcEvent } from '@lm_fe/env';
import { mchcModal__ } from '@lm_fe/pages';
import { IMchc_Doctor_Diagnoses, SMchc_Doctor } from '@lm_fe/service';
import { getSearchParamsAll, request } from '@lm_fe/utils';
import { Empty, message, Space } from 'antd';
import { cloneDeep, floor, forEach, get, includes, isString, size, split } from 'lodash';
import React, { useEffect, useState } from 'react';
import requestMethods from '../../.further/methods/request';
import DiagnosesItem from './diagnoses-item/diagnoses-item';
import DiagnosesWeek from './diagnoses-week/diagnoses-week';
import './index.less';
import DoctorEnd_DiagnosesTemplate from './template';
import { IDiagnosesprops } from './types';

function Diagnoses(props: IDiagnosesprops) {
  const [visible, setVisible] = useState(false)



  const {
    prenatalVisitId,
    isAllPregnancies,
    diagnosesList = [],
    headerInfo,
    saveHeaderInfo,
    setDiagnosesList,
    page,
    serialNo,
  } = props;

  useEffect(() => {

    // SMchc_Doctor.getFirstVisitDiagnosisOutpatient(headerInfo?.id).then(l => setList(l.diagnoses))

    return () => {

    }
  }, [])




  async function changeHeaderInfo() {
    const res = await request.get('/api/doctor/getOutpatientHeaderInfo?id=' + get(headerInfo, `id`));
    saveHeaderInfo(res.data);
  }



  const handleDelete = async (item: any, i: number) => {
    const newList = cloneDeep(diagnosesList);
    const delArr = newList.splice(i, 1);
    await requestMethods.deleteDiagnosis(get(delArr, `[0].id`));
    mchcEnv.success('删除成功！');
    setDiagnosesList(newList);
    changeHeaderInfo();
  };







  const handleBtnClick = () => {
    setVisible(true);
  };


  const add_diag = async (diagnosisObj: any) => {
    if (prenatalVisitId) {
      diagnosisObj.prenatalVisitId = prenatalVisitId
    }
    if (serialNo) {
      diagnosisObj.serialNo = serialNo
    }
    const diag = get(diagnosisObj, 'diagnosis');
    if (diagnosesList.filter((item: any) => item.diagnosis === diag).length === 0) {
      /**判断是否打开VTE */
      const res = await SMchc_Doctor.new_Diagnosis(diagnosisObj);
      mchcEnv.success('添加成功！');
      const newList = cloneDeep(diagnosesList);
      const data = res || diagnosisObj;
      setDiagnosesList([...newList, data]);
      changeHeaderInfo();
      if (diag.indexOf('梅毒') > -1) {
        mchcEvent.emit('outpatient', { type: '弹窗', modal_name: '梅毒管理', })
        // changeSyphilis(true);
      }
      // /**诊断对应的专案管理弹窗*/
      // if (diag === '瘢痕子宫' || diag === '疤痕子宫') {
      //   const currentGestationalWeek = parseInt(get(headerInfo, 'gesweek'));
      //   if (currentGestationalWeek >= 32) changeTolac(true);
      // }
      // const preeclampsiaArr = [
      //   // '双胎',
      //   // '多胎',
      //   '三胎妊娠',
      //   '四胎妊娠',
      //   '五胎妊娠',
      //   '六胎妊娠',
      //   '多胎妊娠',
      //   '胎妊娠',
      //   '慢性高血压',
      //   '1型糖尿病',
      //   '2型糖尿病',
      //   { hasWord: '尿毒症', withoutWord: '胎' },
      //   { hasWord: '肾炎', withoutWord: '胎' },
      //   { hasWord: '肾衰竭', withoutWord: '胎' },
      //   { hasWord: '肾病', withoutWord: '胎' },
      //   { hasWord: '肾积水', withoutWord: '胎' },
      //   { hasWord: '肾盂积水', withoutWord: '胎' },
      //   { hasWord: '肾小管', withoutWord: '胎' },
      //   { hasWord: '肾硬化', withoutWord: '胎' },
      //   '红斑狼疮',
      //   '抗磷脂综合征',
      //   'SLE',
      //   '高血压',
      //   '绒毛膜上皮性疾病',
      //   '异位妊娠史',
      //   '葡萄胎史',
      //   'PGDM',
      //   '肾脏',
      // ];
      // const noSameDay = (diagnosesList: any) => {
      //   let bool = true;
      //   for (let i = 0; i < size(diagnosesList); i++) {
      //     let item = get(diagnosesList, `[${i}]`);
      //     // const createdDate = get(item, 'createdDate');
      //     const diagnosis = get(item, 'diagnosis');
      //     const createdDate = hasKeyword(diagnosis, diag) && get(item, 'createdDate');
      //     if (hasKeyword(diagnosis, diag) && dayjs(new Date()).isSame(createdDate, 'day')) {
      //       bool = false;
      //       continue;
      //     }
      //   }
      //   return bool;
      // };
      // if (
      //   page === 'return' &&
      //   (hasKeyword(diag, preeclampsiaArr) || hasCode(diagnosisObj)) &&
      //   noSameDay(diagnosesList)
      // ) {
      //   console.log('子痫弹窗');
      //   changePreeclampsia(true);
      // }
    } else {
      message.warning('添加诊断重复！');
    }
  };






  const closeTemplate = () => {
    setVisible(false);
  };
  function 诊断管理按钮() {
    return !isAllPregnancies && (
      <div className="diag-btn" style={{ display: 'flex', justifyContent: 'flex-end', padding: 4 }}>
        <Space.Compact size='small' >
          <OkButton
            type='dashed'
            // className="diag-btn"
            // icon={<BookOutlined />} 
            onClick={() => mchcModal__.open('诊断历史', {
              modal_data: {
                pregnancyId: headerInfo?.id
              }
            })}>
            历史
          </OkButton>
          {
            (mchcEnv.in(['建瓯'])) ?
              <OkButton
                type='dashed'
                onClick={() =>
                  request
                    .get<IMchc_Doctor_Diagnoses[]>('/api/syncDiagnosis', { params: { ...getSearchParamsAll(), id: headerInfo?.id }, successText: '同步成功' })
                    .then((res => {
                      const arr = res.data ?? []
                      setDiagnosesList([...diagnosesList, ...arr])

                    }))
                }>
                同步
              </OkButton>
              : null
          }
          <OkButton
            type='dashed'
            // className="diag-btn"
            // icon={<SettingOutlined />} 
            onClick={handleBtnClick}>
            管理
          </OkButton>
        </Space.Compact>
      </div>
    )
  }
  const renderDiagnoses = () => {

    // 初诊孕周


    return (
      <div className="diagWrapper-new">
        {
          诊断管理按钮()
        }
        <DiagnosesWeek first={page !== 'return'} headerInfo={headerInfo} />
        {diagnosesList?.length
          ? diagnosesList.map((item: any, index: any) => {
            return (
              <DiagnosesItem
                edit={false}
                index={index}
                diagnose={item}
                key={`${get(item, 'id')}-false`}
                handleDelete={handleDelete}
                headerInfo={headerInfo}
                diagnosesList={diagnosesList}
                saveHeaderInfo={saveHeaderInfo}
                setDiagnosesList={setDiagnosesList}
                isShowDiagnosesTemplate={false}
              />
            )
          })
          : <Empty />
        }
      </div>
    );
  };

  return (
    <div>
      {renderDiagnoses()}
      {visible && (
        <DoctorEnd_DiagnosesTemplate
          isShowDiagnosesTemplate={visible}
          closeTemplate={closeTemplate}
          add_diag={add_diag}
          headerInfo={headerInfo}
          diagnosesList={diagnosesList}
          setDiagnosesList={setDiagnosesList}
          saveHeaderInfo={saveHeaderInfo}

        />
      )}
    </div>
  );
}
export default Diagnoses;
