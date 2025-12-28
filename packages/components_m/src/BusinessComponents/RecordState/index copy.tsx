import { DatePicker_L } from '@lm_fe/components';
import { SLocal_State, SMchc_FormDescriptions } from '@lm_fe/service';
import { Col, Input, Row } from 'antd';
import { get, includes, isEmpty, map } from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import DynamicForm from '../../BaseModalForm/DynamicForm';
import CheckboxGroup from '../../ConfigComponents/CheckboxGroup';
import NormalSelect from '../../selects/NormalSelect';
import ReferralOrganizationSelect from '../../selects/ReferralOrganizationSelect';
import { formDescriptionsWithoutSectionApi } from '../../utils/adapter';
const deliveryForm = ['deliveryDate', 'deliveryGestationalWeek', 'deliveryMode'];
const terminationForm = ['closingDate', 'closingGestationalWeek', 'closingNote'];
const referralForm = [
  'referralOutReason',
  'referralOutReferralDate',
  'referralOutReferralOrganization',
  'referralOutReferralDept',
  'referralOutReferralDirection',
  'referralOutReferralDoctor',
  'referralOutReferralContactNumber',
  'referralOutRecorder',
];
class RecordSate extends DynamicForm {
  state = {
    formDescriptions: {},
    formData: {},
  };

  componentDidMount = async () => {
    const { form, value } = this.props;
    const formDescriptions = formDescriptionsWithoutSectionApi(
      await SMchc_FormDescriptions.getModuleParseCache('record-state-setting')
    );
    console.log('ggh', formDescriptions)
    if (!isEmpty(value)) {
      form.setFieldsValue({
        referralOutReason: get(value, 'reason'),
        referralOutReferralDate: get(value, 'referralDate')
          ? dayjs(get(value, 'referralDate'))
          : get(value, 'referralDate'),
        referralOutReferralOrganization: get(value, 'referralOrganization'),
        referralOutReferralDept: get(value, 'referralDept'),
        referralOutReferralDirection: get(value, 'referralDirection'),
        referralOutReferralDoctor: get(value, 'referralDoctor'),
        referralOutReferralContactNumber: get(value, 'referralContactNumber'),
        referralOutRecorder: get(value, 'recorder'),
      });
    } else {
      form.setFieldsValue({
        referralOutRecorder: SLocal_State.getUserData()?.firstName
      });
    }
    await this.setState({
      formDescriptions,
    });

    this.setFormData();
  };

  getMapping = (key: string) => {
    if (key === 'recordstate') return 'recordStateMapping';
    if (key === 'periodState') return 'periodStateMapping';
    if (key === 'deliveryMode') return 'deliveryModeMapping';
    return '';
  };

  setFormData = () => {
    const { form } = this.props;
    const formData = form.getFieldsValue();
    this.setState({ formData });
  };

  renderItem = (formDescription: any, formKeys?: any) => {
    const { formDescriptions } = this.state;
    const renderEditItem = this.generateRenderEditItem(formDescriptions);
    const formDescriptionKey = get(formDescription, 'key');

    if (
      !formKeys &&
      (includes(deliveryForm, formDescriptionKey) ||
        includes(terminationForm, formDescriptionKey) ||
        includes(referralForm, formDescriptionKey))
    )
      return;

    switch (get(formDescription, 'inputType')) {
      case 'input':
        return renderEditItem(formDescriptionKey, <Input {...get(formDescription, 'inputProps')} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'checkbox_group':
        return renderEditItem(formDescriptionKey, <CheckboxGroup config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'single_date_picker':
        return renderEditItem(formDescriptionKey, <DatePicker_L {...get(formDescription, 'inputProps')} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'text_area':
        return renderEditItem(formDescriptionKey, <Input.TextArea {...get(formDescription, 'inputProps')} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'referral_organization_select':
        return renderEditItem(formDescriptionKey, <ReferralOrganizationSelect />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'normal_select':
        return renderEditItem(
          formDescriptionKey,
          <NormalSelect onChange={this.setFormData} type={this.getMapping(formDescriptionKey)} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          },
        );
      default:
        return renderEditItem(formDescriptionKey, <Input {...get(formDescription, 'inputProps')} />);
    }
  };

  render() {
    const { formDescriptions, formData } = this.state;

    return (
      <>
        <Row>
          {map(formDescriptions, (formDescription, index) => {
            return (
              <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
                {this.renderItem(formDescription)}
              </Col>
            );
          })}
        </Row>
        {get(formData, 'periodState') === '2' && (
          <Row>
            {map(formDescriptions, (formDescription, index) => {
              return (
                includes(deliveryForm, get(formDescription, 'key')) && (
                  <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
                    {this.renderItem(formDescription, deliveryForm)}
                  </Col>
                )
              );
            })}
          </Row>
        )}
        {get(formData, 'periodState') === '3' && (
          <Row>
            {map(formDescriptions, (formDescription, index) => {
              return (
                includes(terminationForm, get(formDescription, 'key')) && (
                  <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
                    {this.renderItem(formDescription, terminationForm)}
                  </Col>
                )
              );
            })}
          </Row>
        )}
        {get(formData, 'periodState') === '5' && (
          <Row>
            {map(formDescriptions, (formDescription, index) => {
              return (
                includes(referralForm, get(formDescription, 'key')) && (
                  <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
                    {this.renderItem(formDescription, referralForm)}
                  </Col>
                )
              );
            })}
          </Row>
        )}
      </>
    );
  }
}
export default RecordSate
