import { DatePicker_L } from '@lm_fe/components';
import { safe_json_parse } from '@lm_fe/utils';
import { Checkbox } from 'antd';
import { cloneDeep, filter, get, includes, indexOf, isEmpty, set } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
interface IProps {
  [key: string]: any;
}
enum stateEnum {
  none = 1,
  sure = 2,
}
const options = [
  { label: '为治疗', value: stateEnum.none },
  { label: '治疗', value: stateEnum.sure },
];
const options2 = [
  { label: '否', value: stateEnum.none },
  { label: '是', value: stateEnum.sure },
];
const defaultvalue = {
  cureState: [],
  needle: [
    { checkboxValues: [], time: null },
    { checkboxValues: [], time: null },
    { checkboxValues: [], time: null },
  ],
};
export default function CureState({ value, onChange, config, ...props }: IProps) {
  const [data, setData] = useState<any>(cloneDeep(defaultvalue));
  useEffect(() => {
    !isEmpty(value) && setData(value);
  }, [value]);
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));

  function handleChangeall(checkedValues: any[]) {
    const tempData = cloneDeep(data);
    const oldCheckedValues = get(tempData, 'cureState');
    let newCheckedValues = checkedValues;
    newCheckedValues = filter(checkedValues, (item) => indexOf(oldCheckedValues, item) === -1);
    // setData({...tempData,cureState:newCheckedValues});
    onChange && onChange({ ...tempData, cureState: newCheckedValues });
  }
  function handleChange(ind: any) {
    return (checkedValues: any[]) => {
      const tempData = cloneDeep(data);
      const obj = get(tempData, `needle[${ind}]`);
      const newCheckedValues = filter(checkedValues, (item) => indexOf(get(obj, 'checkboxValues'), item) === -1);
      set(obj, 'checkboxValues', newCheckedValues);
      console.log({ tempData });
      onChange && onChange({ ...tempData });
    };
  }

  function onChangeDatePick(ind: any) {
    return (date, dateString) => {
      const tempData = cloneDeep(data);
      const obj = get(tempData, `needle[${ind}]`);
      set(obj, 'time', dateString);
      onChange && onChange({ ...tempData });
    };
  }

  function tranformData(index: number) {
    const value = get(data, `needle[${index}].time`);
    return value ? dayjs(value, 'YYYY-MM-DD') : null;
  }
  function isShow() {
    const checkedValues: any = get(data, 'cureState');
    if (includes(checkedValues, stateEnum.sure)) {
      return true;
    }
    return false;
  }
  return (
    <div className={styles["cure-state-content"]}>
      <Checkbox.Group options={options} value={get(data, 'cureState')} onChange={handleChangeall} />
      {isShow() && (
        <div className={styles["main-content"]}>
          <div className={styles["title"]}>苄星青霉素</div>
          <div className={styles["content"]}>
            <div className={styles["content-row"]}>
              <div className={styles["content-col"]}>
                <span className={styles["content-col-span-title"]}>第一针</span>
                <Checkbox.Group
                  options={options2}
                  value={get(data, 'needle[0].checkboxValues')}
                  onChange={handleChange(0)}
                />
              </div>
              <div className={styles["content-col"]}>
                <span className={styles["content-col-span-title2"]}>注释时间：</span>
                <DatePicker_L onChange={onChangeDatePick(0)} value={tranformData(0)} />
              </div>
            </div>
            <div className={styles["content-row"]}>
              <div className={styles["content-col"]}>
                <span className={styles["content-col-span-title"]}>第二针</span>
                <Checkbox.Group
                  options={options2}
                  value={get(data, 'needle[1].checkboxValues')}
                  onChange={handleChange(1)}
                />
              </div>
              <div className={styles["content-col"]}>
                <span className={styles["content-col-span-title2"]}>注释时间：</span>
                <DatePicker_L onChange={onChangeDatePick(1)} value={tranformData(1)} />
              </div>
            </div>
            <div className={styles["content-row"]}>
              <div className={styles["content-col"]}>
                <span className={styles["content-col-span-title"]}>第三针</span>
                <Checkbox.Group
                  options={options2}
                  value={get(data, 'needle[2].checkboxValues')}
                  onChange={handleChange(2)}
                />
              </div>
              <div className={styles["content-col"]}>
                <span className={styles["content-col-span-title2"]}>注释时间：</span>
                <DatePicker_L onChange={onChangeDatePick(2)} value={tranformData(2)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
