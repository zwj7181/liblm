import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import GeneralComponents_InputWithLabel from '../../GeneralComponents/InputWithLabel';
import { safe_json_parse } from '@lm_fe/utils';
interface IProps {
  labelBefore?: string;
  labelBeforeStyle?: object;
  labelAfterStyle?: object;
  labelAfter?: string;
  value?: any;
  style?: any;
  size?: any;
  config?: any;
  onChange?: any;
  type?: 'string' | 'number';
}

// 通用的单个输入框
export default (props: IProps) => {
  const [data, setData] = useState('');

  const config = get(props, 'config');
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));
  useEffect(() => {
    const { value } = props;
    value && setData(String(value));
  }, [props.value]);

  const handleChange = (value: any) => {
    const { onChange } = props;
    onChange && onChange(value);
  };

  return <GeneralComponents_InputWithLabel onChange={handleChange} value={data} {...specialConfig} />;
};
