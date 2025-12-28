
// import { Col, DatePicker, Form, Input, Row, Select, Radio, Checkbox } from 'antd';
// import React, { useEffect } from "react";
// import StepModal, { IStepFormComponentType } from './components/StepModal';
// const CheckboxGroup = Checkbox.Group
// const { Item } = Form
// type TCommonData = { pregnancyId?: number, pregnancy?: any }


// const Form0: IStepFormComponentType<TCommonData, any> = function Form0({ form, setCommonData, commonData }) {
//     useEffect(() => {

//         return () => {
//         }
//     }, [commonData]);
//     (form as any)._validateFields = () => {
//         return form.validateFields().then(() => {
//             return true
//         })
//     };

//     return (
//         <div>

//             <Form form={form} labelCol={{ xs: 6 }} wrapperCol={{ xs: 14 }} onValuesChange={(a, b) => {
//             }}>

//                 <Row>
//                     <Col xs={8}>
//                         <Item label="姓名" name="name" rules={[{ required: false }]}>
//                             <Input placeholder="请输入姓名" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="门诊号" name="pregnancyOutpatientNO">
//                             <Input placeholder="请输入门诊号" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="证件号码" name="id">
//                             <Input placeholder="请输入证件号码" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="手机号码" name="telephone" rules={[
//                             {
//                                 // required: false,
//                                 // message: '请输入正确的手机号码',
//                                 // validator: (_, value) =>
//                                 //     /^1([0-9][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value) ? Promise.resolve() : Promise.reject(),
//                             },
//                         ]}>
//                             <Input placeholder="请输入手机号码" />
//                         </Item>
//                     </Col>

//                     <Col xs={8}>
//                         <Item label="家庭地址" name="permanentResidenceAddress">
//                             <Input placeholder="请输入家庭地址" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="接诊日期" name="visitDate" rules={[{ required: false }]}  >
//                             <DatePicker placeholder="请输入接诊日期" format="YYYY-MM-DD" />
//                         </Item>
//                     </Col>

//                     <Col xs={16}>
//                         <Item label="医嘱" name="advice" labelCol={{ xs: 3 }} wrapperCol={{ xs: 19 }} rules={[{ required: false }]}  >
//                             <Input.TextArea placeholder="请输入医嘱" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="接诊医生" name="edd">
//                             <Input placeholder="请输入接诊医生" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="HIV" name="HIV">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="梅毒" name="梅毒">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="乙肝" name="乙肝">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="血常规" name="血常规">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="凝血功能" name="凝血功能">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="核酸" name="核酸">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="白带" name="白带">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="麻醉评估" name="麻醉评估">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="心电图" name="心电图">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>

//                     <Col xs={8}>
//                         <Item label="手术名称" name="手术名称">
//                             <Input placeholder="请输入手术名称" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="手术级别" name="手术级别">
//                             <Input placeholder="请输入手术级别" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="预约护士" name="预约护士">
//                             <Input placeholder="请输入预约护士" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="预约时间" name="预约时间" rules={[{ required: false }]}  >
//                             <DatePicker placeholder="请输入预约时间" format="YYYY-MM-DD" />
//                         </Item>
//                     </Col>
//                 </Row>
//             </Form>

//         </div>
//     )
// }

// const Form1: IStepFormComponentType<TCommonData, any> = function Form1({ form, commonData }) {
//     (form as any)._validateFields = () => {
//         // form.validateFields().then(() => {
//         //   return request.post('/api/pregnancies', form.getFieldsValue())
//         // })
//         return Promise.resolve()
//     }

//     return (
//         <div>
//        <Form form={form} labelCol={{ xs: 6 }} wrapperCol={{ xs: 14 }} onValuesChange={(a, b) => {
//             }}>

//                 <Row>
//                     <Col xs={8}>
//                         <Item label="姓名" name="name" rules={[{ required: false }]}>
//                             <Input placeholder="请输入姓名" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="门诊号" name="pregnancyOutpatientNO">
//                             <Input placeholder="请输入门诊号" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="证件号码" name="id">
//                             <Input placeholder="请输入证件号码" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="手机号码" name="telephone" rules={[
//                             {
//                                 // required: false,
//                                 // message: '请输入正确的手机号码',
//                                 // validator: (_, value) =>
//                                 //     /^1([0-9][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value) ? Promise.resolve() : Promise.reject(),
//                             },
//                         ]}>
//                             <Input placeholder="请输入手机号码" />
//                         </Item>
//                     </Col>

//                     <Col xs={8}>
//                         <Item label="家庭地址" name="permanentResidenceAddress">
//                             <Input placeholder="请输入家庭地址" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="接诊日期" name="visitDate" rules={[{ required: false }]}  >
//                             <DatePicker placeholder="请输入接诊日期" format="YYYY-MM-DD" />
//                         </Item>
//                     </Col>

//                     <Col xs={16}>
//                         <Item label="医嘱" name="advice" labelCol={{ xs: 3 }} wrapperCol={{ xs: 19 }} rules={[{ required: false }]}  >
//                             <Input.TextArea placeholder="请输入医嘱" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="接诊医生" name="edd">
//                             <Input placeholder="请输入接诊医生" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="HIV" name="HIV">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="梅毒" name="梅毒">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="乙肝" name="乙肝">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="血常规" name="血常规">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="凝血功能" name="凝血功能">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="核酸" name="核酸">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="白带" name="白带">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="麻醉评估" name="麻醉评估">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="心电图" name="心电图">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>

//                     <Col xs={8}>
//                         <Item label="手术名称" name="手术名称">
//                             <Input placeholder="请输入手术名称" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="手术级别" name="手术级别">
//                             <Input placeholder="请输入手术级别" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="预约护士" name="预约护士">
//                             <Input placeholder="请输入预约护士" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="预约时间" name="预约时间" rules={[{ required: false }]}  >
//                             <DatePicker placeholder="请输入预约时间" format="YYYY-MM-DD" />
//                         </Item>
//                     </Col>
//                 </Row>
//             </Form>
            
//         </div>
//     )
// }
// const Form2: IStepFormComponentType<TCommonData, any> = function Form2({ form, commonData }) {
//     useEffect(() => {

//         if (commonData?.pregnancy) {

//         }
//     }, [commonData]);
//     (form as any)._validateFields = () => {
//         return form.validateFields().then(() => {
//             return true
//         })
//     }
//     return (
//         <div>
//            <Form form={form} labelCol={{ xs: 6 }} wrapperCol={{ xs: 14 }} onValuesChange={(a, b) => {
//             }}>

//                 <Row>
//                     <Col xs={8}>
//                         <Item label="姓名" name="name" rules={[{ required: false }]}>
//                             <Input placeholder="请输入姓名" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="门诊号" name="pregnancyOutpatientNO">
//                             <Input placeholder="请输入门诊号" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="证件号码" name="id">
//                             <Input placeholder="请输入证件号码" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="手机号码" name="telephone" rules={[
//                             {
//                                 // required: false,
//                                 // message: '请输入正确的手机号码',
//                                 // validator: (_, value) =>
//                                 //     /^1([0-9][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value) ? Promise.resolve() : Promise.reject(),
//                             },
//                         ]}>
//                             <Input placeholder="请输入手机号码" />
//                         </Item>
//                     </Col>

//                     <Col xs={8}>
//                         <Item label="家庭地址" name="permanentResidenceAddress">
//                             <Input placeholder="请输入家庭地址" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="接诊日期" name="visitDate" rules={[{ required: false }]}  >
//                             <DatePicker placeholder="请输入接诊日期" format="YYYY-MM-DD" />
//                         </Item>
//                     </Col>

//                     <Col xs={16}>
//                         <Item label="医嘱" name="advice" labelCol={{ xs: 3 }} wrapperCol={{ xs: 19 }} rules={[{ required: false }]}  >
//                             <Input.TextArea placeholder="请输入医嘱" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="接诊医生" name="edd">
//                             <Input placeholder="请输入接诊医生" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="HIV" name="HIV">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="梅毒" name="梅毒">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="乙肝" name="乙肝">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="血常规" name="血常规">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="凝血功能" name="凝血功能">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="核酸" name="核酸">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="白带" name="白带">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="麻醉评估" name="麻醉评估">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="心电图" name="心电图">
//                             <CheckboxGroup options={['正常', '异常', '未查'].map(_ => ({ label: _, value: _ }))} />
//                         </Item>
//                     </Col>

//                     <Col xs={8}>
//                         <Item label="手术名称" name="手术名称">
//                             <Input placeholder="请输入手术名称" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="手术级别" name="手术级别">
//                             <Input placeholder="请输入手术级别" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="预约护士" name="预约护士">
//                             <Input placeholder="请输入预约护士" />
//                         </Item>
//                     </Col>
//                     <Col xs={8}>
//                         <Item label="预约时间" name="预约时间" rules={[{ required: false }]}  >
//                             <DatePicker placeholder="请输入预约时间" format="YYYY-MM-DD" />
//                         </Item>
//                     </Col>
//                 </Row>
//             </Form>
            
//         </div>
//     )
// }

// interface IProps {

// }

// export const BookingModal = (props: { visible: boolean, onOk: () => void, onCancel: () => void }) => {
//     const {
//         onOk,
//         onCancel,
//         visible,
//     } = props

//     console.log('idid', props)
//     return (


//         <StepModal<TCommonData, any> title='手术进度' visible={visible} onCancel={onCancel} onOk={onOk} initData={{}} step={0} data={[
//             { title: '手术预约', Component: Form0 },

//             { title: '术前签到', Component: Form1 },

//             { title: '手术病历', Component: Form2 },
//         ]} />
//     )
// }

// export default BookingModal