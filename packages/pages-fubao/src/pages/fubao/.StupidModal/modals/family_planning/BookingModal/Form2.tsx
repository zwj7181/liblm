import { LazyAntd } from '@lm_fe/components';
import { Col, Divider, Form, Input, Radio, Row } from 'antd';
import React, { useEffect } from "react";
import { SModel_EarlyPregnancyCheckSurgeryType, stupidEnums } from '../../../../.stupid_model';
import { TCommonData } from './Form0';
import { IStepFormComponentType } from './StepModal';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const { Item } = Form
const CheckboxGroup = Radio.Group
const Form1: IStepFormComponentType<TCommonData, any> = function Form1({ form, commonData }) {
    (form as any)._validateFields = () => {
        return form.validateFields().then((values) => {

            return SModel_EarlyPregnancyCheckSurgeryType.appointmentSurgery({
                ...form.getFieldsValue(),
                id: commonData?.data?.id,
                progressStatus: stupidEnums.EarlyPregnancyCheckSurgeryType.progressStatus.getValue('已签到')
            })
        })
    }

    useEffect(() => {
        form.setFieldsValue(commonData?.data)
        console.log('commonData', commonData?.data)
        return () => {
        }
    }, [commonData]);
    return (
        <div>
            <Form form={form} labelCol={{ xs: 6 }} wrapperCol={{ xs: 14 }} onValuesChange={(a, b) => {
            }}>
                <Divider >术中记录</Divider>

                <Row>
                    <Col xs={8}>
                        <Item label="术前宫腔(cm)" name="preoperativeUterineCavity" rules={[{ required: false }]}>
                            <Input type='number' disabled />
                        </Item>
                    </Col>
                    <Col xs={8}>
                        <Item label="吸出绒毛(cm)" name="suckOutTheFluff" rules={[{ required: false }]}>
                            <Input type='number' placeholder="请输入术前宫腔" disabled />
                        </Item>
                    </Col>
                    <Col xs={8}>
                        <Item label="术后宫腔(cm)" name="postoperativeUterineCavity" rules={[{ required: false }]}>
                            <Input type='number' disabled />
                        </Item>
                    </Col>
                    <Col xs={8}>
                        <Item label="特殊情况" name="specialCases">
                            <Input disabled />
                        </Item>
                    </Col>
                    <Col xs={8}>
                        <Item label="术中用药" name="intraoperativeMedication">
                            <CheckboxGroup options={['无', '有'].map((_, i) => ({ label: _, value: i }))} disabled />
                        </Item>
                    </Col>
                    <Col xs={8}>
                        <Item label="手术医生" name="surgicalDoctor">
                            <Select options={commonData?.optionalDoctor?.map(_ => ({ label: _, value: _ }))} disabled />
                        </Item>

                    </Col>


                </Row>
                <Divider >术后记录</Divider>
                <Row>
                    <Col xs={8}>
                        <Item label="术后注意事项" name="preoperativeFasting">
                            <CheckboxGroup options={['已交代', '能复述'].map((_, i) => ({ label: _, value: i }))} disabled />
                        </Item>
                    </Col>
                    <Col xs={8}>
                        <Item label="皮肤情况" name="preoperativeFasting">
                            <CheckboxGroup options={['完好', '压红', '水泡', '破损'].map((_, i) => ({ label: _, value: i }))} disabled />
                        </Item>
                    </Col>
                    <Col xs={16}>
                        <Item label="其他" name="preoperativeNote" labelCol={{ xs: 3 }} wrapperCol={{ xs: 19 }} >
                            <Input.TextArea disabled />

                        </Item>
                    </Col>


                </Row>
            </Form>

        </div>
    )
}
export default Form1