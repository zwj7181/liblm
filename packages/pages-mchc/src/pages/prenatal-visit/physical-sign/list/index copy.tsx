import { BF_Wrap2, mchcModal__, MyBaseList } from '@lm_fe/pages';
import { SLocal_History } from '@lm_fe/service';
import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import { form_confg } from './bf_default';
export default function Gynecological_diseases_women(props: any) {

  const [search_form] = Form.useForm()
  const { config, Wrap } = BF_Wrap2({
    default_conf: {
      tableColumns: form_confg,
      title: '体征检查-列表',
      name: '/api/measures',
      searchConfig: [{ inputType: 'MA', name: 'aa', label: '就诊卡号' }]
    },
  })

  return <Wrap>
    <MyBaseList
      tableColumns={config?.tableColumns}
      searchConfig={config?.searchConfig}
      name={config?.name}
      // {...config}
      searchForm={search_form}
    />
  </Wrap>
}