/* eslint-disable @typescript-eslint/camelcase */
import { DatePicker_L, TimePicker_L } from '@lm_fe/components';
import dayjs from 'dayjs';
import React from 'react';
interface MyDatePickerProp {
  onChange: Function;
  dispatch?: Function;
  value: any;
  size?: string;
  input_props: any;
}
const dateTypeString = 'date';
const timeTypeString = 'time';
const defaultPicker = 'date';
const defaultDateFormat = 'YYYY-MM-DD';
const defaultTimeFormat = 'HH:mm:ss';
export default function MyDateTime(props: MyDatePickerProp) {
  const { input_props = {}, value = '', size = 'default' } = props;
  const { type = dateTypeString, picker = defaultPicker, style = {}, hiddenSecond, disabled } = input_props;
  let format = type === dateTypeString ? defaultDateFormat : defaultTimeFormat;
  if (hiddenSecond) format = 'YYYY-MM-DD HH:mm:ss';

  const handleChange = (val: any) => {
    if (val) {
      props.onChange(val.format(format));
    } else {
      props.onChange(val);
    }
  };

  const renderDatePicker = () => {
    if (!value || dayjs(value, format).isValid()) {
      const val: any = value ? dayjs(value, format) : '';
      if (hiddenSecond) {
        return (
          <DatePicker_L
            showTime
            key={value}
            defaultValue={val}
            format="YYYY-MM-DD HH:mm"
            onChange={handleChange}
            disabled={disabled}
          />
        );
      }
      if (type === dateTypeString) {
        return (
          <DatePicker_L
            style={{ width: '100%', ...style }}
            size={size}
            value={val}
            format={format}
            picker={picker}
            onChange={handleChange}
            disabled={disabled}
          />
        );
      }
      if (type === timeTypeString) {
        return (
          <TimePicker_L
            style={{ width: '100%', ...style }}
            size={size}
            defaultValue={val}
            format={format}
            onChange={handleChange}
          />
        );
      }
      return <strong>组件类型非法</strong>;
    }
    return <strong>值类型格式非法</strong>;
  };

  return renderDatePicker();
}
