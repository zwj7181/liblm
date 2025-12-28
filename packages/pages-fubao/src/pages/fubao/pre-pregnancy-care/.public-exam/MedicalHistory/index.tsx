import { BaseEditPanelFormFC } from '@lm_fe/components_m';
import { BF_Wrap2 } from '@lm_fe/pages';
import { getSearchParamsValue, fubaoRequest as request } from '@lm_fe/utils';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import form_config from './form_config';
import { mchcUtils } from '@lm_fe/env';
import { Form } from 'antd';
interface IProps {
  type: 'husband' | 'wife'

}
export default function MedicalHistory(props: IProps) {
  const { type } = props
  const [data, setdata] = useState<any>({})
  const [form] = Form.useForm()
  const { Wrap, config } = BF_Wrap2({
    default_conf: {
      title: `孕前检查-病史情况${type}`,
      tableColumns: form_config
    }
  })
  useEffect(() => {

    handleInit();

    return () => {

    }
  }, [])

  async function handleInit() {
    const id = get(props, 'id') || getSearchParamsValue('id')
    let res: any;
    let data: any;

    if (type === 'wife') {
      res = id
        ? (
          await request.get(
            `/api/progestation/check/getByProgestationCheckArchivesId?progestationCheckArchivesId.equals=${id}&fileType.equals=2&childrenSign.equals=2`,
          )
        ).data
        : {};
    } else {
      res = id

        ? (await request.get(
          `/api/progestation/check/getByProgestationCheckArchivesId?progestationCheckArchivesId.equals=${id}&fileType.equals=1&childrenSign.equals=2`,
        )
        ).data

        : {};
    }
    if (res) {
      data = get(res, 'data.0');
      data = { ...data, ...get(data, 'progestationCheckArchivesMedicalHistoryVM') };
    }

    data = id ? data : {};

    data = mchcUtils.autoNoteToCommonOption(data)



    console.log('fuck', data)
    form.setFieldsValue(data)
    setdata(data)
  };

  async function handleSubmit(values: any) {
    const { baseUrl, filesData, type } = props as any;
    let { progestationCheckArchivesMedicalHistoryVM } = data;

    let params = values
    let progestationCheckArchivesDetailId = get(filesData, 'womanProgestationCheckArchivesDetailVM.id');
    if (type === 'husband') {
      progestationCheckArchivesDetailId = get(filesData, 'manProgestationCheckArchivesDetailVM.id');
    }

    params = {
      ...progestationCheckArchivesMedicalHistoryVM,
      ...params,
      progestationCheckArchivesDetailId,
    };
    params = mchcUtils.autoCommonOptionToNote(params)

    const res = (await request.post('/api/progestation/check/saveProgestationCheckArchivesMedicalHistory', params)).data
    if (get(res, 'code') === 1) {


    }
  };
  return <Wrap>
    <BaseEditPanelFormFC
      form={form}
      onFinish={async v => {
        handleSubmit(v)
      }}
      formDescriptions={config?.tableColumns}
    />
  </Wrap>
}
