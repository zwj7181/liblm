import { DatePicker_L, RangePicker_L } from '@lm_fe/components';
import { Space } from 'antd';
import { get, trim } from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
interface CusType {
  date: string;
  time: string; // '8:00 - 12:00'
}
interface Iprops {
  value: CusType;
  onChange: Function;
  [key: string]: any;
}
export default function CusDataTimePicker({
  value,
  onChange,
  valueType,
  getPopupContainer = () => document.body,
  ...rest
}: Iprops) {
  const transValueData = (date: CusType) => {
    const dateString = get(date, 'date');
    if (!dateString) return null;
    return dayjs(dateString, 'YYYY-MM-DD');
  };
  const transValueTime = (date: CusType) => {
    const timeString = get(date, 'time', '');

    if (!timeString) return null;
    let time: any = get(date, 'time', '') || '';
    let arr = time.split('-');
    return [dayjs(trim(get(arr, '0')), 'HH:mm'), dayjs(trim(get(arr, '1')), 'HH:mm')];
  };

  const handleChangeDate = (date: any, dateString: string) => {
    onChange({ date: dateString, time: get(value, `time`) || null });
  };
  const handleChangeTime = (dates: any, dateStrings: [string, string]) => {
    let time: any;
    if (dateStrings[0] == '' && dateStrings[1] == '') {
      time = null
    } else {
      time = `${dateStrings[0] == '' ? null : dateStrings[0]} - ${dateStrings[1] == '' ? null : dateStrings[1]}`
    }

    onChange({ date: get(value, `date`) || null, time: time });
  };

  function disabledDate(currentDate: any) {
    let dataProps = get(rest, `date`, {});
    const disabledRules = get(dataProps, 'disabledRules');
    if (disabledRules) {
      if (disabledRules == 'default') {
        return currentDate.isBefore(dayjs().format('YYYY-MM-DD'));
      }
    }
  }

  function disabledHours() {
    let dataProps = get(rest, `time`, {});
    const disabledHoursRules = get(dataProps, 'disabledHoursRules');
    if (disabledHoursRules) {
      const valueDate = get(value, 'date');
      const isBefore = dayjs(valueDate).isSameOrBefore(dayjs().format('YYYY-MM-DD'));
      if (isBefore && disabledHoursRules == 'default') {
        const hours = new Date().getHours();
        let diableHours = [];
        for (let i = 0; i < hours; i++) {
          diableHours.push(i);
        }
        return diableHours;
      }
    }
  }

  function disabledMinutes(selectedHour: any) {
    let dataProps = get(rest, `time`, {});
    const disabledMinutesRules = get(dataProps, 'disabledMinutesRules');
    if (disabledMinutesRules) {
      const valueDate = get(value, 'date');
      const isBefore = dayjs(valueDate).isSameOrBefore(dayjs().format('YYYY-MM-DD'));
      if (isBefore && disabledMinutesRules == 'default') {
        const currentHours = new Date().getHours();
        if (currentHours == selectedHour) {
          const minutes = new Date().getMinutes();
          let disableMinutes = [];
          for (let i = 0; i < minutes; i++) {
            disableMinutes.push(i);
          }
          return disableMinutes;
        }
      }
    }
  }

  return (
    <Space>
      <DatePicker_L
        value={transValueData(value)}
        onChange={handleChangeDate}
        disabledDate={disabledDate}
        {...get(rest, `date`, {})}
      />
      <RangePicker_L
        showTime
        format="HH-mm"
        value={transValueTime(value)}
        onChange={handleChangeTime}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        {...get(rest, `time`, {})}
      />
    </Space>
  );
}
