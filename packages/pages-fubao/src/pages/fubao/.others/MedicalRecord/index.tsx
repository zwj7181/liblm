import React, { Component } from 'react';
import { Col, Row, Checkbox, Button, message } from 'antd';
import { last, map, size, get, set, isPlainObject, isArray } from 'lodash';
import dayjs from 'dayjs';
import { getResources } from '@lm_fe/components_m';
import { getAllPrenatalDiagnosesByPatientId, transformMedicalRecordData } from './method';
import './index.less';
export default class FirstVisit extends Component {
  state = {
    recordList: [],
    checkItem: [],
  };

  async componentDidMount() {
    const { patientId } = this.props;
    const allPrenatalDiagnoses = await getAllPrenatalDiagnosesByPatientId(patientId);
    this.setState({ recordList: allPrenatalDiagnoses });
  }

  getVisitType = (type: number) => {
    if (type === 1) return '胎儿疾病（单胎）';
    if (type === 2) return '胎儿疾病（多胎）';
    if (type === 3) return '送检病历';
    if (type === 4) return '常规复诊';
    if (type === 5) return '复诊（选择性减胎）';
    if (type === 6) return '复诊（宫内输血）';
    return '';
  };

  handleCheck = (checkedValues: any) => {
    this.setState({
      checkItem: last(checkedValues) ? [last(checkedValues)] : [],
    });
  };

  handleImport = (isImport: boolean) => async () => {
    const { onImport, user, visitType } = this.props;
    const { checkItem } = this.state;

    if (isImport) {
      if (size(checkItem) === 0) {
        message.info('请勾选需要导入的病历！');
      } else {
        const activeItem = await getResources(`/api/prenatal-diagnoses/${get(checkItem, '0.id')}`);
        let newRecord = this.removeIdOfObject(activeItem);
        // 单胎、多胎病历的既往史、个人史、家族史转换为送检遗传病历对应的内容
        if ((get(newRecord, 'visitType') === 1 || get(newRecord, 'visitType') === 2) && visitType === 3) {
          newRecord = transformMedicalRecordData(newRecord);
        }
        set(newRecord, 'id', -Math.random());
        set(newRecord, 'visitDate', dayjs());
        set(newRecord, 'visitType', null);
        set(newRecord, 'doctor', get(user, 'basicInfo.firstName'));
        onImport(newRecord);
      }
    } else {
      onImport();
    }
  };

  removeIdOfObject = (data: any) => {
    delete data.id;
    map(data, (item, key) => {
      if (isPlainObject(item)) {
        if (key === 'prenatalPatient') return;
        delete item.id;
        this.removeIdOfObject(item);
      }
      if (isArray(item) && size(item) > 0) {
        map(item, (subItem) => {
          this.removeIdOfObject(subItem);
        });
      }
    });
    return data;
  };

  render() {
    const { recordList, checkItem } = this.state;

    return (
      <div className="prenatal-diagnosis-medical-record">
        <Checkbox.Group style={{ width: '100%' }} value={checkItem} onChange={this.handleCheck}>
          {map(recordList, (item: any) => (
            <Row className="prenatal-diagnosis-medical-record_item">
              <Col span={1}>
                <Checkbox value={item} />
              </Col>
              <Col span={7}>
                {item.visitDate}（{item.visitStyle === 0 ? '首诊' : '复诊'}）
              </Col>
              <Col span={7}>{this.getVisitType(item.visitType)}</Col>
              <Col span={5}>{item.doctor}</Col>
            </Row>
          ))}
        </Checkbox.Group>
        <div className="prenatal-diagnosis-medical-record_btns">
          <Button onClick={this.handleImport(false)}>{size(recordList) === 0 ? '确定' : '不导入'}</Button>
          {size(recordList) > 0 && (
            <Button
              className="prenatal-diagnosis-medical-record_btns_import"
              type="primary"
              onClick={this.handleImport(true)}
            >
              导入病历
            </Button>
          )}
        </div>
      </div>
    );
  }
}
