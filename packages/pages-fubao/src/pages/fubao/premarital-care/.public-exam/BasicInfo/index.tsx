import { BaseEditPanelFormFC } from '@lm_fe/components_m';
import { mchcUtils } from '@lm_fe/env';
import { BF_Wrap2 } from '@lm_fe/pages';
import { getSearchParamsValue, fubaoRequest as request } from '@lm_fe/utils';
import { Form } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
interface IProps {
  type: 'husband' | 'wife'
}
export default function MedicalHistory(props: IProps) {
  const { type } = props
  const conf_fn = () => import('./form_config')
  const [data, setdata] = useState<any>({})
  const [form] = Form.useForm()
  const { Wrap, config } = BF_Wrap2({
    default_conf: {
      title: `婚前检查-基本信息`,
      tableColumns: conf_fn
    }
  })
  useEffect(() => {

    handleInit();

    return () => {

    }
  }, [])

  async function handleInit() {
    const id = get(props, 'id') || getSearchParamsValue('id');
    let res: any;
    let data: any;
    if (type === 'wife') {
      res = id
        ? (
          await request.get(
            `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=2&childrenSign.equals=1`,
          )
        ).data
        : {};
    } else {
      res = id
        ? (
          await request.get(
            `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=1&childrenSign.equals=1`,
          )
        ).data
        : {};
    }
    if (res) {
      data = get(res, 'data.0');
      data = { ...data, ...get(data, 'premaritalCheckArchivesBasicInformationVM') };
      data = mchcUtils.autoNoteToCommonOption(data)
    }


    form.setFieldsValue(data)
    setdata(data)
  };

  async function handleSubmit(values: any) {
    const { baseUrl, filesData, type } = props as any;
    let { premaritalCheckArchivesBasicInformationVM } = data;

    let params = values;
    let premaritalCheckArchivesDetailId = get(filesData, 'womanPremaritalCheckArchivesDetailVM.id');
    if (type === 'husband') {
      premaritalCheckArchivesDetailId = get(filesData, 'manPremaritalCheckArchivesDetailVM.id');
    }

    params = {
      ...premaritalCheckArchivesBasicInformationVM,
      ...params,
      premaritalCheckArchivesDetailId,
    };
    params = mchcUtils.autoCommonOptionToNote(params)
    const _res = await request.post('/api/premarital/check/savePremaritalCheckArchivesBasicInformation', params)

  };
  return <Wrap>
    <BaseEditPanelFormFC
      form={form}
      onFinish={async v => {
        handleSubmit(v)
      }}
      formDescriptions={__DEV__ ? conf_fn : config?.tableColumns}
    />
  </Wrap>
}
