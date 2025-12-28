/**
 * 籍贯组件
 */
import get_province_options from './config';
import { Cascader } from 'antd';
import { isArray } from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
// type valueType = number | string;
interface Iprops {
  value: string;
  onChange: Function;
  [key: string]: any;
}
const SymbolicLink = '&';
export default function NativePlace({ value, onChange }: Iprops) {
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    get_province_options().then(opt => setOptions(opt))

    return () => {

    }
  }, [])

  function handleChange(value: any, selectedOptions: any) {
    let newValue = '';
    if (isArray(value)) {
      newValue = value.join(SymbolicLink);
    }
    onChange(newValue);
  }
  function transformValue(value?: string) {
    if (value && typeof value == 'string') {
      return value.split(SymbolicLink);
    } else {
      return [];
    }
  }

  return <Cascader value={transformValue(value)} options={options} onChange={handleChange} />;
}
