import React, { Component } from 'react';
import { Input, InputNumber } from 'antd';
import { get, map } from 'lodash';

import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const wordList = ['岁', '月', '天'];
export default class AgeSelect extends Component<any> {
  handleInputChange = (data: any, type: string) => {
    const { onChange, value } = this.props;
    const newValue = { ...value, [type]: data };
    onChange && onChange(newValue);
  };

  render() {
    const { value } = this.props;
    return (
      <Input.Group compact style={{ display: 'flex' }}>
        <InputNumber value={get(value, 'age')} onChange={(data) => this.handleInputChange(data, 'age')} />
        <Select
          value={get(value, 'ageType')}
          onChange={(data) => this.handleInputChange(data, 'ageType')}
          style={{ width: 56 }}
        >
          {map(wordList, (item) => {
            return (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </Input.Group>
    );
  }
}
