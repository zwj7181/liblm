import React, { lazy } from 'react';
import { useMarshal } from '../../utils/useMarshal';
import { TCommonComponent } from '../types';
import { IMyEditTableProps } from './types';


const MyEditTable_Inner = lazy(() => import('./Inner'));


export const MyEditTable: TCommonComponent<IMyEditTableProps, string | any[]> = (props) => {
  return (
    <MyEditTable_Inner {...props} />
  );
}
MyEditTable.DisplayFC = (props) => {
  const {
    value,
    onChange,
    marshal = 1,
  } = props


  const { safe_value = [], } = useMarshal<any[]>(marshal, value ?? [], onChange)

  return <div>
    {safe_value.length}项
  </div>
}