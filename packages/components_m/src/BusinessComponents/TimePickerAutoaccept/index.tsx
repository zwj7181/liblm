import { TimePicker_L } from '@lm_fe/components';
import { PickerProps } from 'antd/es/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs'
import React from 'react';

export const TimePickerAutoaccept = (props: PickerProps<Dayjs>) => {
  const onBlur = (elem: React.FocusEvent<HTMLInputElement>) => {
    let value = dayjs(elem.target.value, props.format as string);
    if (value && value.isValid() && props.onChange) {
      props.onChange(value, elem.target.value);
    }
  };
  return <TimePicker_L {...props} onBlur={onBlur} />;
};
