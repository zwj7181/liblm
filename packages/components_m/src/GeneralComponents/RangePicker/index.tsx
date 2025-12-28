import { RangePicker_L } from '@lm_fe/components';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
export default function CusRangePicker({
  value = undefined,
  onChange,
  valueType,
  format,
  getPopupContainer = () => document.body,
  ...rest
}: any) {
  const transValue = (date: Dayjs[]) => {
    let result = undefined;
    if (!!date) {
      result = [dayjs(date[0]), dayjs(date[1])];
    }
    return result;
  };

  const handleChange = (date: Dayjs, dateString: any) => {
    let result = date;
    if (valueType) {
      result = dayjs(date).format(valueType);
    }
    if (format) {
      result = dayjs(date).format(format);
    }
    onChange(result);
  };

  //   return (
  //     <RangePicker getPopupContainer={getPopupContainer} value={transValue(value)} onChange={handleChange} {...rest} />
  //   );
  return (
    <RangePicker_L getPopupContainer={getPopupContainer} value={transValue(value)} onChange={handleChange} {...rest} />
  );
}
