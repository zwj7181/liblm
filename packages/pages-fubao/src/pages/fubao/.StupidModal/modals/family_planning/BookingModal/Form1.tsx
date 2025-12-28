import { DatePicker_L, LazyAntd } from '@lm_fe/components';
import { SLocal_State } from '@lm_fe/service';
import { Col, Divider, Form, Input, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { stupidModal } from '../../../../.StupidModal';
import { SModel_EarlyPregnancyCheckSurgeryType, stupidEnums } from '../../../../.stupid_model';
import { TCommonData } from './Form0';
import { IStepFormComponentType } from './StepModal';
import { StupidRadioGroup } from './StupidRadioGroup';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const { Item } = Form;
const CheckboxGroup = Radio.Group;
const Form1: IStepFormComponentType<TCommonData, any> = function Form1({ form, commonData }) {
  const data = commonData?.data;
  const status = stupidEnums.EarlyPregnancyCheckSurgeryType.progressStatus.getLabel(data?.progressStatus);
  const isDone = status === '已签到' || status === '已完成';
  function doid() {
    if (!data) return;
    if (isDone) return;
    return form.validateFields().then((values) => {
      return SModel_EarlyPregnancyCheckSurgeryType.appointmentSurgery({
        ...data,
        ...values,
        progressStatus: stupidEnums.EarlyPregnancyCheckSurgeryType.progressStatus.getValue('已签到'),
      }).then(() => confirm('签到成功，是否关闭弹窗？') && stupidModal.pop());
    });
  }
  (form as any)._validateFields = doid;
  (form as any)._save = doid;

  useEffect(() => {
    const remoteData = commonData?.data;

    if (remoteData) {
      form.setFieldsValue({
        ...remoteData,
        appointmentPeople: remoteData?.appointmentPeople || SLocal_State.getUserData(),
        signInRegistrant: remoteData?.signInRegistrant || SLocal_State.getUserData(),
        signInTime: remoteData?.signInTime || dayjs(),
      });
    }
    return () => { };
  }, [commonData]);
  return (
    <div>
      <Form form={form} labelCol={{ xs: 6 }} wrapperCol={{ xs: 14 }} onValuesChange={(a, b) => { }}>
        <Divider>基本信息</Divider>

        <Row>
          <Col xs={8} hidden>
            <Item label="" name="operatingRoom" rules={[{ required: false }]}>
              <Input placeholder="请输入手术室" disabled />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="姓名" name="name" rules={[{ required: false }]}>
              <Input placeholder="请输入姓名" disabled />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="门诊号" name="outpatientNo">
              <Input placeholder="请输入门诊号" disabled />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="证件号码" name="idNO">
              <Input placeholder="请输入证件号码" disabled />
            </Item>
          </Col>
          <Col xs={8}>
            <Item
              label="手机号码"
              name="telephone"
              rules={[
                {
                  // required: false,
                  // message: '请输入正确的手机号码',
                  // validator: (_, value) =>
                  //     /^1([0-9][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value) ? Promise.resolve() : Promise.reject(),
                },
              ]}
            >
              <Input placeholder="请输入手机号码" disabled />
            </Item>
          </Col>

          <Col xs={8}>
            <Item label="家庭地址" name="residenceAddress">
              <Input placeholder="请输入家庭地址" disabled />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="接诊日期" name="admissionTime" rules={[{ required: false }]}>
              <DatePicker_L placeholder="请输入接诊日期" format="YYYY-MM-DD" disabled />
            </Item>
          </Col>

          <Col xs={16}>
            <Item
              label="医嘱"
              name="doctorOrder"
              labelCol={{ xs: 3 }}
              wrapperCol={{ xs: 19 }}
              rules={[{ required: false }]}
            >
              <Input.TextArea placeholder="请输入医嘱" disabled />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="接诊医生" name="admissionDoctor">
              <Select
                disabled
                placeholder="请输入"
                options={commonData?.optionalDoctor?.map((_) => ({ label: _, value: _ }))}
              />
            </Item>
          </Col>
          <Divider>手术预约</Divider>

          <Col xs={8}>
            <Item label="手术名称" name="operationName">
              <Input disabled placeholder="请输入手术名称" />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="登记者" name="appointmentPeople">
              <Select
                disabled
                placeholder="请输入"
                options={commonData?.optionalNurse?.map((_) => ({ label: _, value: _ }))}
              />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="预约日期" name="appointmentDate" rules={[{ required: false, message: '' }]}>
              <DatePicker_L placeholder="请输入预约时间" format="YYYY-MM-DD" disabled />
            </Item>
          </Col>
        </Row>
        <Divider>术前签到</Divider>
        <Row>
          <Col xs={8}>
            <Item label="血压" name="preoperativeDiastolic" rules={[{ required: true, message: '' }]}>
              <Input.Group compact>
                <Form.Item
                  rules={[{ required: true, message: '' }]}
                  name="preoperativeDiastolic"
                  style={{ width: '30%' }}
                >
                  <Input disabled={status === '已签到' ? false : isDone} placeholder="舒张压" type="number" />
                </Form.Item>
                <Input
                  style={{
                    width: 30,
                    borderLeft: 0,
                    margin: '0 1px',
                    borderRight: 0,
                    pointerEvents: 'none',
                    textAlign: 'center',
                  }}
                  placeholder="/"
                  disabled
                />
                <Form.Item
                  rules={[{ required: true, message: '' }]}
                  name="preoperativeSystolic"
                  style={{ width: '30%' }}
                >
                  <Input disabled={status === '已签到' ? false : isDone} placeholder="收缩压" type="number" />
                </Form.Item>
              </Input.Group>
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="体温" name="preoperativeBodyTemperature" rules={[{ required: true, message: '' }]}>
              <Input
                disabled={status === '已签到' ? false : isDone}
                placeholder="请输入体温"
                type="number"
                addonAfter="°C"
              />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="是否空腹" name="preoperativeFasting" rules={[{ required: true, message: '' }]}>
              <StupidRadioGroup
                disabled={status === '已签到' ? false : isDone}
                name="preoperativeFasting"
                options={['是', '否'].map((_, i) => ({ label: _, value: i + 1, withFuckedInput: !!i }))}
              />
            </Item>
          </Col>
          <Col xs={24}>
            <Item label="备注" name="preoperativeNote" labelCol={{ xs: 2 }} wrapperCol={{ xs: 21 }}>
              <Input disabled={status === '已签到' ? false : isDone} placeholder="请输入备注" />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="签到时间" name="signInTime">
              <DatePicker_L
                disabled={status === '已签到' ? false : isDone}
                placeholder="请输入签到时间"
                format="YYYY-MM-DD HH:mm"
                showTime
              />
            </Item>
          </Col>
          <Col xs={8}>
            <Item label="签到登记者" name="signInRegistrant">
              <Input disabled={status === '已签到' ? false : isDone} placeholder="请输入签到登记者" />
            </Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Form1;
