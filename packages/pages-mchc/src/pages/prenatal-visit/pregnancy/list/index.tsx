import { BF_Wrap2, MyBaseList } from '@lm_fe/pages';

import React, { useEffect } from 'react';
import { useTableConfig } from './config/useTableConfig';
import './index.less';
import { formatDate, getMomentRange } from '@lm_fe/utils';
import { rt_ctx } from '@lm_fe/env';
function fallback(props: any) {
  const [config] = useTableConfig(props)
  return <MyBaseList {...config} />
}
const ctx = rt_ctx
// export default newList;
export default function Pregnancy_list(props: any) {
  const [conf] = useTableConfig(props)
  const conf_fn = () => import('./config/table')
  const { config, Wrap } = BF_Wrap2({
    default_conf: {
      title: '孕册管理-列表',
      tableColumns: conf_fn,
      searchConfig: () => import('./config/form'),
      initialSearchValue: () => ({ createDate: ctx.utils.getMomentRange()['近一年'].map(ctx.utils.formatDate) }),
      searchParams: () => ({ 'deleteFlag.equals': 0 }),
    },
  }, props)
  useEffect(() => {

    return () => {

    }
  }, [])
  return <Wrap>
    {/* <MyBaseList {...conf} searchConfig={config?.searchConfig} tableColumns={config?.tableColumns} /> */}
    <MyBaseList {...conf} bf_conf={config} tableColumns={__DEV__ ? conf_fn : config?.tableColumns} />
  </Wrap>
}
