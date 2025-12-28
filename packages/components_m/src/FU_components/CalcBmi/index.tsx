import { Button, Input, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { TCommonComponent } from '../types';
import styles from './index.module.less';
export const CalcBmi: TCommonComponent<{ size?: any }, number> = function MyPressure(props) {
  const { onChange, value, size, disabled } = props;
  const [_value, set_value] = useState<number>()
  const [height, setHeight] = useState<number>()
  const [weight, setWeight] = useState<number>()
  const [visible, setVisible] = useState(false)
  useEffect(() => {

    set_value(value)
    return () => {

    }
  }, [value])



  const handleChange = (type: number) => {

  };

  function ok() {
    const v = weight! / (height! ** 2)
    onChange?.(isNaN(v) ? 0 : Number(v.toFixed(2)))
    setVisible(false)
  }



  return (
    <Input.Group size='small' compact style={{ display: 'flex', alignItems: 'center' }}>
      {
        visible ? <>
          <InputNumber
            size='small'
            disabled={disabled}
            controls={false}
            // className={classnames(styles['pressure-input'], {
            //   [styles['pressure-input_issue']]: diastolic < 60 || diastolic > 90,
            // })}
            min={0}
            max={1000}
            placeholder="体重(kg)"
            value={weight}
            onChange={e => setWeight(e!)}
          />
          <Input size='small' className={styles["input-split"]} placeholder="/" disabled />
          <InputNumber

            size='small'
            disabled={disabled}
            min={0}
            max={1000}
            controls={false}
            placeholder="身高(m)"
            value={height}
            onChange={e => setHeight(e!)}
          />
          <Button onClick={ok} disabled={disabled} size='small'>确定</Button>
          <Button onClick={() => setVisible(false)} disabled={disabled} size='small'>取消</Button>
        </> : <>
          <InputNumber size='small' precision={2} min={0} disabled={disabled} value={_value} onChange={onChange} />
          <Button onClick={() => setVisible(true)} size='small' disabled={disabled}>计算</Button>
        </>
      }



    </Input.Group>
  );
};
