import React from 'react';
import { Modal, Form } from 'antd';
import DynamicForm from '../BaseModalForm/DynamicForm';
import { MyFormSection } from 'src/FU_components/FormSection';
import { validate_form } from '@lm_fe/components';
export default class Base extends DynamicForm {
  static defaultProps = {
    title: '',
    formDescriptions: {},
    formItemLayout: {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    },
  };

  constructor(props: any) {
    super(props);
    const { formDescriptions, formItemLayout } = props;
    this.renderEditItem = this.generateRenderEditItem(formDescriptions, {
      formItemLayout,
    });
  }

  renderEditItem = (key: any, ReactNode: any) => { };

  handleSubmit = async () => {
    const { onSubmit } = this.props;
    const formData = await validate_form(this.form)

    if (!formData) return
    onSubmit(formData);
  };

  render() {
    const { visible, onCancel, data, title, formDescriptions } = this.props;
    return (
      <Modal open={visible} destroyOnClose title={title} onCancel={onCancel} onOk={this.handleSubmit}>
        <Form autoComplete="off" ref={this.formRef}>
          <MyFormSection data={data} formDescriptions={formDescriptions} renderEditItem={this.renderEditItem} />
        </Form>
      </Modal>
    );
  }
}
