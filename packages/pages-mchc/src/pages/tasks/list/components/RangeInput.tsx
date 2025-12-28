import { Col, Input, Row } from 'antd';
import React, { Component } from 'react';
import { get, set } from 'lodash';
import { GeneralComponents_DictionarySelect } from '@lm_fe/components_m';

export default class RangeInput extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      data: value,
    });
  }

  handleChange = (type) => (e) => {
    const { onChange } = this.props;
    const { data } = this.state;
    const tempData = { ...data };
    if (type === 'appointRange') {
      set(tempData, type, get(e, 'selectedData'));
      this.setState({
        ...data,
        appointRange: get(e, 'selectedData'),
      });
    }
    if (type === 'min' || type === 'max' || type === 'value') {
      set(tempData, type, get(e, 'target.value'));
    }
    this.setState({
      data: tempData,
    });
    onChange && onChange(tempData);
  };

  renderRange = () => {
    const { data } = this.state;
    if (get(data, 'appointRange') === 6) {
      return <></>;
    }
    if (get(data, 'appointRange') === 1) {
      return (
        <>
          <Col span={7}>
            <Input onChange={this.handleChange('min')} value={get(data, 'min')} />
          </Col>
          <Col style={{ textAlign: 'center' }} span={1}>
            <span>~</span>
          </Col>
          <Col span={7}>
            <Input onChange={this.handleChange('max')} value={get(data, 'max')} />
          </Col>
        </>
      );
    }

    return (
      <Col span={7}>
        <Input onChange={this.handleChange('value')} value={get(data, 'value')} />
      </Col>
    );
  };

  render() {
    const { data } = this.state;
    const { labelAfter } = this.props;

    return (
      <Row style={{ alignItems: 'center' }}>
        <Col span={8}>
          <GeneralComponents_DictionarySelect
            type="select"
            mode="single"
            uniqueKey="Task.appointRange"
            onChange={this.handleChange('appointRange')}
            value={{
              selectedData: get(data, 'appointRange'),
              otherNote: '',
            }}
          />
        </Col>
        {this.renderRange()}
        {get(data, 'appointRange') !== 6 && (
          <Col span={1}>
            <span>{labelAfter}</span>
          </Col>
        )}
      </Row>
    );
  }
}
