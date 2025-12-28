import { DatePicker_L } from '@lm_fe/components';
import { Checkbox } from 'antd';
import { get } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
// value:{key:any,keyNote:any}
interface IProps {
  [key: string]: any;
}
export default function DataPickWithCheck({ config,value, onChange, ...props }: IProps) {
  const [tranformValue, setTranformValue] = useState(null);
  useEffect(() => {
    if (value) {
      setTranformValue(JSON.parse(value));
    }
  }, [value]);
  function onDatePickerChange(date: any, dataString: any) {
    onChange && onChange(JSON.stringify({ key: dataString, keyNote: false }));
  }
  function onCheckboxChange() {
    onChange && onChange(JSON.stringify({ key: null, keyNote: true }));
  }
  return (
    <div className={styles["data-pick-with-check"]}>
      <DatePicker_L
        onChange={onDatePickerChange}
        className={styles["data-pick"]}
        value={get(tranformValue, 'key') ? dayjs(get(tranformValue, 'key')) : null}
        disabled={get(config,'inputProps.disabled')}
      />
      <Checkbox onChange={onCheckboxChange} checked={get(tranformValue, 'keyNote')} className={'checkbox'} disabled={get(config,'inputProps.disabled')}>
        不详
      </Checkbox>
    </div>
  );
}
