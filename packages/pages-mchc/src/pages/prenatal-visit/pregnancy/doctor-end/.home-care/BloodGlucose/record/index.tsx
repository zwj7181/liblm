import { rt_ctx } from '@lm_fe/env';
import { MyBaseList } from '@lm_fe/pages';
import { defineFormConfig } from '@lm_fe/service';
import React from 'react';
const ctx = rt_ctx

export default function BG(props: { pregnancyId: any }) {



  return (
    <MyBaseList
      pregnancyId={props.pregnancyId}
      table_preset={{
        title: '居家监护-血糖列表-可编辑',
        tableColumns: () => import('./form_config'),
        name: '/api/blood-glucoses',
        searchParams: () => ({ 'pregnancyId.equals': ctx.props.pregnancyId }),
        searchConfig: defineFormConfig([{ name: 'timestamp', title: '日期', inputType: 'MyRangeDateTime', }]),
        initialSearchValue() { return { timestamp: ctx.utils.getMomentRange().近一月.map(ctx.utils.formatDateTime) } },
        handleBeforePopup(v: any) {
          if (!v.pregnancy) {
            v.pregnancy = { id: ctx.props.pregnancyId }
          }
          if (!v.timestamp) {
            v.timestamp = ctx.utils.formatDateTime()
          }
          return v
        }
      }}
    />
  );
}

