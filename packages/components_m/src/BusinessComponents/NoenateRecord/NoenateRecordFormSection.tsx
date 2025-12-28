import { DatePicker_L } from '@lm_fe/components';
import { Col, Input, InputNumber, Radio, Row } from 'antd';
import { get, isEmpty, isNil, map } from 'lodash';
import React from 'react';
import InputWithLabel from '../../ConfigComponents/InputWithLabel';
import MultipleInputWithLabel from '../../ConfigComponents/MultipleInputWithLabel';
import NormalCheckboxWithInput from '../../ConfigComponents/NormalCheckboxWithInput';
import NormalSelectWithInput from '../../ConfigComponents/NormalSelectWithInput';
import SelectWithOptions from '../../selects/SelectWithOptions';
interface IProps {
  formDescriptions: any;
  renderEditItem: any;
  onChange?: any;
  data?: any;
}
export default class FoetalAppendageFormSection extends React.Component<IProps> {
  renderRowAndCol = (formDescriptionArr = []) => {
    return (
      <Row>
        {map(formDescriptionArr, (formDescription, index) => {
          return (
            <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
              {this.renderItem(formDescription)}
            </Col>
          );
        })}
      </Row>
    );
  };

  renderItem = (formDescription: any) => {
    const { renderEditItem, data, onChange } = this.props;
    const formDescriptionKey = get(formDescription, 'key');
    switch (get(formDescription, 'inputType')) {
      case 'input':
        return renderEditItem(
          formDescriptionKey,
          <Input

            {...get(formDescription, 'inputProps')}
            value={get(data, formDescriptionKey)}
            onChange={(e: any) => {
              onChange(formDescriptionKey, get(e, 'target.value'));
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          },
        );
      case 'select_with_options':
        return renderEditItem(
          formDescriptionKey,
          <SelectWithOptions
            config={formDescription}
            value={get(data, formDescriptionKey)}
            onChange={(e: any) => {
              onChange(formDescriptionKey, e);
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          },
        );
      case 'pregnant_radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group
            value={get(data, formDescriptionKey)}
            onChange={(e: any) => {
              onChange(formDescriptionKey, get(e, 'target.value'));
            }}
          >
            <Radio value={false}>否</Radio>
            <Radio value={true}>是</Radio>
          </Radio.Group>,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'single_date_picker':
        return renderEditItem(
          formDescriptionKey,
          <DatePicker_L

            value={get(data, formDescriptionKey)}
            {...get(formDescription, 'inputProps')}
            onChange={(e: any) => {
              onChange(formDescriptionKey, e);
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          },
        );
      case 'select_with_input':
        return renderEditItem(
          formDescriptionKey,
          <NormalSelectWithInput
            config={formDescription}
            value={get(data, formDescriptionKey)}
            onChange={(e: any) => {
              onChange(formDescriptionKey, e);
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          },
        );
      case 'input_number':
        return renderEditItem(
          formDescriptionKey,
          <InputNumber
            
            value={get(data, formDescriptionKey)}
            min={0}
            {...get(formDescription, 'inputProps')}
            onChange={(e: any) => {
              onChange(formDescriptionKey, e);
            }}
            controls={false}
          />,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'normal_checkbox_with_input':
        return renderEditItem(
          formDescriptionKey,
          <NormalCheckboxWithInput
            value={get(data, formDescriptionKey)}
            config={formDescription}
            onChange={(e: any) => {
              onChange(formDescriptionKey, e);
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          },
        );
      case 'multiple_input_with_label':
        return renderEditItem(
          get(formDescription, 'key'),
          <MultipleInputWithLabel
            config={formDescription}
            value={get(data, formDescriptionKey)}
            onChange={(e: any) => {
              onChange(formDescriptionKey, e);
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'input_with_label':
        return renderEditItem(
          get(formDescription, 'key'),
          <InputWithLabel
            config={formDescription}
            value={get(data, formDescriptionKey)}
            onChange={(e: any) => {
              onChange(formDescriptionKey, e);
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      default:
        return renderEditItem(
          formDescriptionKey,
          <Input

            value={get(data, formDescriptionKey)}
            {...get(formDescription, 'inputProps')}
            onChange={(e: any) => {
              onChange(formDescriptionKey, get(e, 'target.value'));
            }}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
    }
  };

  renderContent = () => {
    const { formDescriptions = [], formData, tabIndex } = this.props;
    let tempArr = [];
    let tempSpan = 0;
    let newRow = false;
    let formArray = [];

    map(formDescriptions, (formDescription, index) => {
      if (!isNil(get(formDescription, 'span')) && !isNil(get(formDescription, 'offset'))) {
        if (get(formDescription, 'isNewRow')) {
          const renderArr = tempArr;
          tempSpan = 0;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
        }
        if (tempSpan < 25 && tempSpan + get(formDescription, 'span') + get(formDescription, 'offset') < 25) {
          tempSpan = tempSpan + get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
          if (Number(index) === formDescriptions.length - 1) {
            formArray.push(this.renderRowAndCol(tempArr));
            tempArr = [];
          }
        } else {
          const renderArr = tempArr;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
          tempSpan = get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
        }
      } else {
        formArray.push(this.renderItem(formDescription));
      }
    });
    if (!isEmpty(tempArr)) {
      formArray.push(this.renderRowAndCol(tempArr));
    }
    return formArray;
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}
