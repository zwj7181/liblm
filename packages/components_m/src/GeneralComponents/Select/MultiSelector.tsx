import React from 'react';
import { get } from 'lodash';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
export default function MultiSelector({ value, onChange, fetchOptions, ...rest }) {
  // 默认value 类型未数组表现['option1', 'option2']
  // 可选string类型，表现形式 "option1,option2"
  const valueType = get(rest, 'inputProps.valueType') || 'array'; // 'string'

  const inputProps = {
    mode: 'multiple', // 'multiple'; tags select，随意输入的内容
    showArrow: true,
    ...rest.inputProps,
  };

  const handleChange = (val: (number | string)[]) => {
    let newVal: any = val;
    if (valueType === 'string') {
      newVal = val.join(',');
    }
    onChange(newVal);
  };

  const formatValue = (val) => {
    if (val && valueType === 'string') {
      return val.split(',');
    }
    if (val && valueType === 'array') {
      return val;
    }
    return [];
  };
  return <Select {...inputProps} onFocus={fetchOptions} value={formatValue(value)} onChange={handleChange}></Select>;
}
