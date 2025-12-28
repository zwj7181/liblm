import { get } from 'lodash';
import { useEffect, useState } from 'react';
import HepatitsNewBaby from './hepatitis-new-baby';
import styles from './index.less';
import React from 'react'
interface IProps {
  title: string;
  [key: string]: any;
}
export default function HepatitsNewBabyCom_C({ value, ...props }: IProps) {
  const [disabled,setDisabled] = useState(false);
  useEffect(()=>{
    setDisabled(get(props,'config.inputProps.disabled'));
  },[props.config])
  return (
    <div className={styles['report-card-container']}>
      <HepatitsNewBaby data={value} config={props.config}/>
    </div>
  );
}
