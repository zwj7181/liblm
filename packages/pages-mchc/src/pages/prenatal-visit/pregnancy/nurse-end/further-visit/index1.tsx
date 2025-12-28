import { rt_ctx } from '@lm_fe/env';
import { MyBaseList } from '@lm_fe/pages';
import { IMchc_Doctor_OutpatientHeaderInfo } from '@lm_fe/service';
import { formatDate } from '@lm_fe/utils';
import { Empty } from 'antd';
import React from 'react';
interface IProps {
  head_info: IMchc_Doctor_OutpatientHeaderInfo
  type: 1 | 2
}
const ctx = rt_ctx
export default function FurtherVisit({ head_info }: IProps) {
  if (!head_info) return <Empty />
  return <MyBaseList
    name='/api/measures'
    needEditInTable
    tableColumns={() => import('./config/table')}
    handleBeforePopup={v => {
      v.createDate = v.createDate || formatDate()
      v.createUser = v.createUser || ctx.mchcEnv.user_data.firstName
      return v
    }}
    beforeSubmit={v => {

      return ctx.utils.assign(v, { type: 1, outpatientNO: head_info.outpatientNO })
    }}
    searchParams={{
      sort: 'createDate,DESC',
      'type.equals': 1,
      'outpatientNO.equals': head_info.outpatientNO
    }}
  />
}
