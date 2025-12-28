import { TimePicker_L } from '@lm_fe/components';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
export default function CusTimePicker({
  value = undefined,
  onChange,
  valueType,
  format,
  getPopupContainer = () => document.body,
  ...rest
}: any) {
  const transValue = (date: Dayjs) => {
    let result = undefined;
    if (typeof date === 'string') {
      result = dayjs(date);
      if (!result.isValid()) {
        result = dayjs(`2000 ${date}`)
      }
    }
    return result;
  };

  const handleChange = (date?: Dayjs, dateString?: any) => {
    let result = date?.format();
    if (valueType && date) {
      result = dayjs(date).format(valueType);
    }
    if (format && date) {
      result = dayjs(date).format(format);
    }
    onChange?.(result);
  };

  return (
    <TimePicker_L getPopupContainer={getPopupContainer} value={transValue(value)} onChange={handleChange} format={format} {...rest} />
  );
}
