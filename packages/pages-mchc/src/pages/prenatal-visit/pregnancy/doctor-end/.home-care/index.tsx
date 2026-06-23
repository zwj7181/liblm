import { mchcUtils } from '@lm_fe/env';
import { Card, Tabs } from 'antd';
import React, { lazy, useState } from 'react';

import { Seg } from './Seg';
import { OkButton } from '@lm_fe/components_m';
import { mchcModal__ } from '@lm_fe/pages';
const BloodGlucose_static = lazy(() => import('./BloodGlucose/static'))
const BloodGlucose_record = lazy(() => import('./BloodGlucose/record'))
const BloodPressure_static = lazy(() => import('./BloodPressure/static'))
const BloodPressure_record = lazy(() => import('./BloodPressure/record'))
const FetalMovement_static = lazy(() => import('./FetalMovement/static'))
const FetalMovement_record = lazy(() => import('./FetalMovement/record'))
const Weight_static = lazy(() => import('./Weight/static'))
const Weight_record = lazy(() => import('./Weight/record'))
export function DoctorEnd_HomeCare(props: any) {

  const pregnancyId = mchcUtils.single_id(props);
  const [tabKey, setTabKey] = useState('BloodGlucoseInHome')

  return (
    <Card size='small' actions={[<OkButton btn_text='打印' onClick={() =>
      mchcModal__.open('print_modal', {
        modal_data: {
          requestData: {
            url: '/api/pdf-preview',
            id: pregnancyId,
            resource: tabKey,

          }
        }
      })} />]}>
      <Tabs activeKey={tabKey} onChange={setTabKey} destroyOnHidden >
        <Tabs.TabPane tab="血糖" key="BloodGlucoseInHome">
          <Seg
            pregnancyId={pregnancyId}
            Static={BloodGlucose_static}
            Record={BloodGlucose_record}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="血压" key="BloodPressureInHome">
          <Seg
            pregnancyId={pregnancyId}
            Static={BloodPressure_static}
            Record={BloodPressure_record}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="胎动" key="FetalMovementInHome">
          <Seg
            pregnancyId={pregnancyId}
            Static={FetalMovement_static}
            Record={FetalMovement_record}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="体重" key="WeightInHome">
          <Seg
            pregnancyId={pregnancyId}
            Static={Weight_static}
            Record={Weight_record}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  )
}
