import { IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient } from '@lm_fe/service';
import { Card, Collapse } from 'antd';
import { get } from 'lodash';
import  React from 'react';
import './index.less';

interface HomeState { }

export default class Index extends React.Component<{ visitsData?: IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient }, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { visitsData } = this.props;
    return (
      <Card styles={{ body: { padding: 0 } }}>
        <Collapse defaultActiveKey={['1', '2', '3']} bordered={false}>
          <Collapse.Panel header="出院诊断" key="1">
            <div className="panel-content">
              {get(visitsData, `inpatientInfo.dischargeDiagnoses`, '') || '暂无数据~'}
            </div>
          </Collapse.Panel>
          <Collapse.Panel header="出院情况及治疗结果" key="2">
            <div className="panel-content">{get(visitsData, `inpatientInfo.treatmentResult`, '') || '暂无数据~'}</div>
          </Collapse.Panel>
          <Collapse.Panel header="出院医嘱" key="3">
            <div className="panel-content">{get(visitsData, `inpatientInfo.dischargeAdvice`, '') || '暂无数据~'}</div>
          </Collapse.Panel>
        </Collapse>
      </Card>
    );
  }
}
