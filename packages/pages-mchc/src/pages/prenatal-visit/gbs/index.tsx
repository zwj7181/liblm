import { OkButton } from '@lm_fe/components_m';
import { mchcEvent } from '@lm_fe/env';
import { BF_Wrap2, mchcModal__, MyBaseList } from '@lm_fe/pages';
import { SLocal_History } from '@lm_fe/service';
import React, { useEffect } from 'react';



export default function List(props: {}) {




  return <MyBaseList
    table_preset={{
      title: 'B族链球菌-列表',
      tableColumns: () => import('./form_config'),
      showRowPrintBtn: 1,
      showPrint: 1,
      name: '/api/gbsResult',
      searchParams: {},
      searchConfig: [
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '证件号码',
          dataIndex: 'idNO',
        },

        {
          title: '就诊卡号',
          dataIndex: 'outpatientNO',
        },
        {
          name: 'testTime',
          label: '校验时间',
          inputType: 'rangeDate',
        },
      ]
    }}

  // initialSearchValue={{}}

  // ActionAddonBefore={(ctx) => {
  //   const rowData = ctx.rowData
  //   const pregnancyId = rowData.pregnancyId
  //   const id = rowData.id
  //   // return <OkButton size='small' onClick={() => {
  //   //   mchcModal__.open('print_modal', {
  //   //     modal_data: {
  //   //       requestConfig: { method: 'get', url: '/api/gbsResult/print', params: { id: rowData.id } }
  //   //     }
  //   //   })
  //   // }}  >打印</OkButton>
  //   return <OkButton size='small' onClick={() => SLocal_History.historyPush(`/prenatal-visit/pregnancy/doctor-end?id=${pregnancyId}`)} >看诊</OkButton>
  // }}
  // tableColumns={__DEV__ ? () => import('./form_config') : config?.tableColumns}
  />
}



