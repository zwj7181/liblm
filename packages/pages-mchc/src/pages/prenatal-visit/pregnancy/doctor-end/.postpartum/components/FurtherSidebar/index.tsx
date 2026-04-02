import { IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient } from '@lm_fe/service';
import { Card, Collapse } from 'antd';

import React from 'react';
import './index.less';
import { use_provoke } from '@lm_fe/provoke';
import { get, ICommonOption } from '@lm_fe/utils';

interface HomeState { visitsData: IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient }

export default function (props: HomeState) {
  const { visitsData } = props;
  const { 产后信息拓展 = [] } = use_provoke(c => c.config)
  const list: ICommonOption[] = [
    { label: '出院诊断', value: 'inpatientInfo.dischargeDiagnoses' },
    { label: '出院情况及治疗结果', value: 'inpatientInfo.treatmentResult' },
    { label: '出院医嘱', value: 'inpatientInfo.dischargeAdvice' },
    ...产后信息拓展
  ]
  return (
    <Card styles={{ body: { padding: 0 } }}>
      <Collapse defaultActiveKey={list.map(_ => _.value)} bordered={false}>

        {
          list.map(l => {
            return <Collapse.Panel header={l.label} key={l.value}>
              <div title={l.value}>
                {get(visitsData, l.value, '暂无数据~')}
              </div>
            </Collapse.Panel>
          })
        }

      </Collapse>
    </Card>
  );
}