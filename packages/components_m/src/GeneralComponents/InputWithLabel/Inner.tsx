import { DatePicker_L } from '@lm_fe/components';
import { Input, InputNumber } from 'antd';
import classnames from 'classnames';
import { get, isNil } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { IInputWithLabelProps } from './types';



// 通用的单个输入框
export default function InputWithLabel(props: IInputWithLabelProps) {
  const {
    className = '',
    style = {},
    labelBefore,
    labelBeforeStyle,
    labelAfterStyle,
    labelAfter,
    inputStyle,
    value, type,
    maxValue,
    minValue,
    onChange,
    ...others
  } = props;


  const [data, setData] = useState<any>();
  const [newStyle, setNewStyle] = useState(inputStyle);
  useEffect(() => {
    if (type === 'number' && !isNil(maxValue) && value > maxValue) {
      setNewStyle({ ...newStyle, color: 'red' });
    } else if (type === 'number' && !isNil(minValue) && value < minValue) {
      setNewStyle({ ...newStyle, color: 'red' });
    } else {
      setNewStyle({ ...newStyle, color: '#333' });
    }
    if (props.type === 'single_date_picker') {
      value && setData(dayjs(value))
    } else if (value === 0) {
      setData(String(value));
    } else {
      value && setData(String(value));
    }
  }, [props.value]);

  const handleChange = (type: IInputWithLabelProps['type']) => (e: any) => {
    let tempData = '';
    if (type === 'string') {
      tempData = get(e, 'target.value');
    } else if (type === 'number') {
      tempData = e;
      if (type === 'number' && !isNil(maxValue) && e > maxValue) {
        setNewStyle({ ...newStyle, color: 'red' });
      } else if (type === 'number' && !isNil(minValue) && e < minValue) {
        setNewStyle({ ...newStyle, color: 'red' });
      } else {
        setNewStyle({ ...newStyle, color: '#333' });
      }
    } else if (type === 'single_date_picker') {
      tempData = e;
    }
    setData(tempData);
    onChange && onChange(tempData);
  };

  return (
    <div
      className={classnames(styles['input-with-label'], className)}
      style={{ display: 'flex', alignItems: 'center', ...style }}
    >
      {labelBefore && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 4,
            marginRight: 4,
            wordBreak: 'keep-all',
            ...get(props, 'labelBeforeStyle'),
          }}
        >
          {labelBefore}
        </span>
      )}
      {get(props, 'type') === 'number' ? (
        <InputNumber
          {...(others as any)}
          className={styles["input-with-label_input"]}
          style={newStyle}

          value={data}
          onChange={handleChange('number')}
        />
      ) : (
        type === 'single_date_picker' ?

          <DatePicker_L
            className={styles["input-with-label_input"]}
            style={inputStyle}
            onChange={handleChange('number')}
            value={data}
          /> :
          <Input
            {...others}
            title={data}
            className={styles["input-with-label_input"]}
            style={inputStyle}
            value={data}
            onChange={handleChange('string')}
          />
      )}
      {labelAfter && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 4,
            marginRight: 4,
            wordBreak: 'keep-all',
            whiteSpace: 'nowrap',
            ...get(props, 'labelAfterStyle'),
          }}
        >
          {labelAfter}
        </span>
      )}
    </div>
  );
};
