import { getSameOptions, otherOptions } from '@lm_fe/env';
import { expect_array } from '@lm_fe/utils';
import { AutoComplete } from 'antd';
import { isString } from 'lodash';
import React, { Component } from 'react';
export default class Index extends Component {
  render() {
    const { input_props, onChange, value, disabled } = this.props;
    const { options = [], positiveWarning } = input_props;
    const allOptions = isString(options) ? (otherOptions[options] ?? getSameOptions(options)) : options;

    const handleChange = (v: any) => {
      onChange(v);
    };

    return (
      <AutoComplete
        style={{ width: '100%', color: positiveWarning && value === '阳性' ? '#ff517d' : '' }}
        value={value}
        options={expect_array(allOptions)}
        filterOption={(inputValue, option) => option.value.indexOf(inputValue) !== -1}
        onChange={handleChange}
        disabled={disabled}
      ></AutoComplete>
    );
  }
}
