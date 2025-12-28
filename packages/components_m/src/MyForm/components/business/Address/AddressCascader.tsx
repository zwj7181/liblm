import React, { Component } from 'react';
import { Cascader, Input } from 'antd';
import options, { getStreets } from './cascader-address-options';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
interface AddressCascaderProps {
  onChange: Function;
  dispatch?: Function;
  value: any;
  input_props: any;
}
const SPLIT_KEY = ',';
export default class AddressCascader extends Component<AddressCascaderProps> {
  handleChange = (val: any, key: number): void => {
    const { value = '', onChange } = this.props;
    if (key === 0) {
      onChange(`${val.join(',')}${SPLIT_KEY}${''}${SPLIT_KEY}${this.getDataFormProp(value).inputData}`);
    } else if (key === 1) {
      onChange(
        `${this.getDataFormProp(value).cascaderData.join(',')}${SPLIT_KEY}${val.value}${SPLIT_KEY}${this.getDataFormProp(value).inputData
        }`,
      );
    } else if (key === 2) {
      onChange(
        `${this.getDataFormProp(value).cascaderData.join(',')}${SPLIT_KEY}${this.getDataFormProp(value).streetData
        }${SPLIT_KEY}${val}`,
      );
    }
  };

  getDataFormProp = (value: string = '') => {
    const targetData: any = {
      cascaderData: [],
      streetData: [],
      streetOptions: '',
      inputData: '',
    };
    if (value) {
      const valueArr = value.split(SPLIT_KEY);
      if (valueArr.length > 2 && valueArr[0]) {
        if (valueArr[0] === '海外') {
          targetData.streetOptions = [];
        } else {
          targetData.streetOptions = getStreets(valueArr[0], valueArr[1], valueArr[2]);
        }
      }
      if (valueArr.length === 3) {
        targetData.cascaderData = valueArr;
      }
      if (valueArr.length === 5) {
        for (let i = 0; i < valueArr.length; i++) {
          if (i <= 2) {
            targetData.cascaderData.push(valueArr[i]);
          }
          if (i === 3) {
            targetData.streetData = valueArr[i];
          }
          if (i === 4) {
            targetData.inputData = valueArr[i];
            break;
          }
        }
      }
    }
    return targetData;
  };

  render() {
    const { value = '' } = this.props;
    const data = this.getDataFormProp(value);

    return (
      <Input.Group compact style={{ width: '100%' }}>
        <Cascader
          allowClear={false}
          style={{ width: '25%' }}
          options={options}
          onChange={(val: Array<string>) => this.handleChange(val, 0)}
          value={data.cascaderData}
        />
        <Select
          style={{ width: '25%' }}
          options={data.streetOptions}
          onChange={(val: Array<string>, option) => this.handleChange(option, 1)}
          value={data.streetData}
          disabled={!data.cascaderData}
        />
        <Input
          style={{ width: '50%' }}
          value={data.inputData}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e.target.value, 2)}
          disabled={!data.cascaderData}
        />
      </Input.Group>
    );
  }
}
