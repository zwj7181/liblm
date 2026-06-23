import { Table_L } from '@lm_fe/components';
import { rt_ctx } from '@lm_fe/env';
import { BF_Wrap2 } from '@lm_fe/pages';
import { useEffect, useState } from 'react';
import { api } from '../../../.api';
import { request } from '@lm_fe/utils';
const React = rt_ctx.React

export default function BloodGlucose({ pregnancyId }: { pregnancyId: any }) {
  const [data, setData] = useState<any[]>([])
  const { Wrap, config } = BF_Wrap2({
    default_conf: {
      tableColumns: () => import('./form_config'),
      title: '居家监护-体重列表'
    }
  })
  useEffect(() => {
    request.get(`/api/getWeightInHome?pregnancyId.equals=${pregnancyId}`).then(r => setData(r.data))



    return () => {

    }
  }, [])

  return (
    <Wrap>
      <Table_L
        bordered
        style={{ marginTop: 12 }}
        columns={config?.tableColumns}
        dataSource={data}
        pagination={false}
      />
    </Wrap>
  );
}
