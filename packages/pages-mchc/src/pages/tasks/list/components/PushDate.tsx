import React, { Component } from 'react';
// import DictionarySelect from '@/components/GeneralComponents/DictionarySelect';
import { DatePicker_L, GeneralComponents_DictionarySelect, GeneralComponents_InputWithLabel, TimePicker_L } from '@lm_fe/components_m';
import { Col, Row } from 'antd';
import { get, isEqual, set } from 'lodash';
export default class PushDate extends Component {
  state = {
    data: {
      pushDateType: undefined,
      pushTimeType: undefined,
      gestationalWeek: undefined,
      day: undefined,
      time: undefined,
      date: undefined,
    },
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      data: value,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(get(nextProps, 'value'), get(prevState, 'data'))) {
      return {
        data: get(nextProps, 'value'),
      };
    }
    return null;
  }

  handleChange = (name) => (e) => {
    const { data } = this.state;
    const { onChange } = this.props;
    const tempData = { ...data };
    if (['time', 'date', 'gestationalWeek', 'day'].indexOf(name) > -1) {
      set(tempData, name, e);
    }
    if (['pushDateType', 'pushTimeType'].indexOf(name) > -1) {
      set(tempData, name, get(e, 'selectedData'));
    }
    this.setState({
      data: tempData,
    });
    onChange && onChange(tempData);
  };

  renderOthers = () => {
    const { data } = this.state;
    const pushTimeType = (
      <Col span={6}>
        <GeneralComponents_DictionarySelect
          type="select"
          mode="single"
          uniqueKey="Task.pushTimeType"
          onChange={this.handleChange('pushTimeType')}
          value={{
            selectedData: get(data, 'pushTimeType'),
            otherNote: '',
          }}
        />
      </Col>
    );
    const pushGestationalWeek = (
      <Col span={4}>
        <GeneralComponents_InputWithLabel
          onChange={this.handleChange('gestationalWeek')}
          labelAfter="周"
          value={get(data, 'gestationalWeek')}
        />
      </Col>
    );
    const pushDay = (
      <Col span={4}>
        <GeneralComponents_InputWithLabel onChange={this.handleChange('day')} labelAfter="天" value={get(data, 'day')} />
      </Col>
    );
    const pushTimePicker = (
      <Col span={4}>
        <TimePicker_L format="HH:mm:ss" onChange={this.handleChange('time')} value={get(data, 'time')} />
      </Col>
    );
    const pushDatePicker = (
      <Col span={4}>
        <DatePicker_L onChange={this.handleChange('date')} value={get(data, 'date')} />
      </Col>
    );
    // 对应字典下的孕周
    if (get(data, 'pushDateType') === 11) {
      return (
        <>
          {pushTimeType}
          {pushGestationalWeek}
          {pushDay}
          {pushTimePicker}
        </>
      );
    }
    if (get(data, 'pushDateType') === 12) {
      return (
        <>
          {pushDatePicker}
          {pushTimePicker}
        </>
      );
    }
    return (
      <>
        {pushTimeType}
        {pushDay}
        {pushTimePicker}
      </>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <Row style={{ alignItems: 'center' }}>
        <Col span={6}>
          <GeneralComponents_DictionarySelect
            type="select"
            mode="single"
            uniqueKey="Task.pushDateType"
            onChange={this.handleChange('pushDateType')}
            value={{
              selectedData: get(data, 'pushDateType'),
              otherNote: '',
            }}
          />
        </Col>
        {this.renderOthers()}
      </Row>
    );
  }
}
