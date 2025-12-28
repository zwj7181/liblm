import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { SLocal_State } from '@lm_fe/service';
import { request } from '@lm_fe/utils';
import { use_provoke } from '@lm_fe/provoke';
import { mchcEnv } from '@lm_fe/env';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

interface IProps {
  id?: string;
  visible?: boolean;
  dataSource: any;
  roles?: string[];
  onCancel: () => void;
  onSearch: () => void;
}

function ResetPasswordModal({ visible, onCancel, dataSource, roles = [] }: IProps) {
  const user = SLocal_State.getUserData()
  const { user_info } = use_provoke('user_info',)

  const [form] = Form.useForm();
  useEffect(() => {
    visible && form.resetFields();
  }, [visible]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (!mchcEnv.isAdmin) {
          message.info('您没有权限修改其他用户的密码，请联系管理员...');
        } else {
          request
            .post('/api/account/reset-password', {
              password: values.password,
              id: dataSource.id,
              login: dataSource.login,
            })
            .then((r) => {
              mchcEnv.success('重置密码成功');
              onCancel();
            })
            .catch((error) => {
              mchcEnv.error('重置密码失败...');
            });
        }
      })
      .catch((error) => { });
  };

  return (
    <Modal
      centered
      destroyOnClose
      width={400}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      title="重置密码"
    >
      <Form {...formItemLayout} form={form} autoComplete="off">
        <Form.Item name="password" label="重置密码" rules={[{ required: true }]}>
          <Input allowClear placeholder="请输入重置密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ResetPasswordModal
