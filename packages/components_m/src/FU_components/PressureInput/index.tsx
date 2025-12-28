import { fuck_focus } from '@lm_fe/components';
import { safe_json_parse, safe_json_parse_arr } from '@lm_fe/utils';
import { Input, InputNumber, Space } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TCommonComponent } from '../types';
import styles from './index.module.less';
export const MyPressureDisplayFC: TCommonComponent<{ marshal?: number, autoFocus?: boolean, onFocus?: any }, string | number[]> = ({ value }) => {

  const [_value, set_value] = useState<number[]>([])
  useEffect(() => {

    const v = safe_json_parse(value, [])
    set_value(Array.isArray(v) ? v : [])
    return () => {

    }
  }, [value])

  const systolic = _value[0];
  const diastolic = _value[1];

  return (
    <span >
      {
        systolic ?
          <span
            className={classnames({
              [styles['pressure-input_issue']]: systolic < 90 || systolic > 130,
            })}
          >
            {systolic}
          </span> : <span>--</span>
      }
      <span className={styles["pressure-input_split"]}>/</span>
      {
        diastolic ? <span
          className={classnames({
            [styles['pressure-input_issue']]: diastolic < 60 || diastolic > 90,
          })}
        >
          {diastolic}
        </span> : <span>--</span>
      }
    </span>
  );
}
export const MyPressure: TCommonComponent<{ marshal?: number, autoFocus?: boolean, onBlur?: any }, string | number[]> = function MyPressure(props) {
  const { onChange, value, isDisplay, disabled, marshal = 1, onBlur, autoFocus } = props;
  const [_value, set_value] = useState<number[]>([])
  const { parent_blur, parent_focus, child_blur, child_focus } = fuck_focus(props)

  useEffect(() => {

    const v = safe_json_parse_arr(value)
    set_value(Array.isArray(v) ? v : [])
    return () => {

    }
  }, [value])



  const handleChange = (type: number) => (value: any) => {
    _value[type] = value;
    onChange?.([0, 2].includes(Number(marshal)) ? [..._value] : JSON.stringify(_value));
  };

  const systolic = _value[0];
  const diastolic = _value[1];

  if (isDisplay) {

    return <MyPressureDisplayFC {...props} />
  }

  return (
    <Space.Compact onBlur={e => { parent_blur(e) }} onFocus={e => parent_focus()} style={{ display: 'flex', alignItems: 'center' }}>
      <InputNumber
        autoFocus={autoFocus}
        onFocus={e => child_focus()}
        onBlur={e => child_blur()}
        disabled={disabled}
        className={classnames(styles['pressure-input'], {
          [styles['pressure-input_issue']]: systolic < 90 || systolic > 130,
        })}
        min={0}
        max={1000}
        controls={false}
        placeholder="收缩"
        value={systolic}
        onChange={handleChange(0)}
      />
      <Input style={{ paddingLeft: 0, paddingRight: 0, width: 14, textAlign: 'center' }} placeholder="/" disabled />
      <InputNumber
        onFocus={e => child_focus()}
        onBlur={e => child_blur()}
        disabled={disabled}
        controls={false}
        className={classnames(styles['pressure-input'], {
          [styles['pressure-input_issue']]: diastolic < 60 || diastolic > 90,
        })}
        min={0}
        max={1000}
        placeholder="舒张"
        value={diastolic}
        onChange={handleChange(1)}
      />
      {/* {
        mchcEnv.is('广三') ? null : <Tooltip className={styles["pressure-input_tip"]} title={`收缩压的正常范围值是90~130mmHg，舒张压的正常范围值是60~90mmHg`}>
          <QuestionCircleOutlined />
        </Tooltip>
      } */}
    </Space.Compact>
  );
};
MyPressure.DisplayFC = MyPressureDisplayFC