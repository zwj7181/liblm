import {
  BaseEditPanelFormFC,
  MyIcon
} from '@lm_fe/components_m';

import { mchcEnv } from '@lm_fe/env';
import { BF_Wrap2 } from '@lm_fe/pages';
import { IMchc_Doctor_OutpatientHeaderInfo, IMchc_HusbandBaseInfoOfOutpatient, SMchc_Doctor } from '@lm_fe/service';
import { getSearchParamsValue } from '@lm_fe/utils';
import { Button, Form, message } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';

interface IProps {
  isSingle?: boolean
  headerInfo: IMchc_Doctor_OutpatientHeaderInfo
  form?: FormInstance
}
export function HusbandInfo({ headerInfo, isSingle, form = Form.useForm()[0] }: IProps) {

  const { config, Wrap } = BF_Wrap2({
    default_conf: {
      tableColumns: () => import('./form_config'),
      title: '孕册管理-丈夫基本信息',
    },

  })


  const [data, setData] = useState<IMchc_HusbandBaseInfoOfOutpatient>()


  useEffect(() => {
    const id = headerInfo?.id ?? getSearchParamsValue('id')
    SMchc_Doctor.getHusbandBaseInfoOfOutpatient(id).then(res => {

      form.setFieldsValue(res)
      setData(res)
    })

    return () => {

    }
  }, [])








  function renderSubmitBtn() {

    return (
      <Button
        size="large"
        type="primary"
        icon={<MyIcon value='SaveOutlined' />}
        htmlType="submit"
        onClick={handleFinish}
      >
        保存
      </Button>
    );
  };

  async function handleFinish() {
    form
      .validateFields()
      .then(async () => {
        const params: IMchc_HusbandBaseInfoOfOutpatient = {
          ...form.getFieldsValue(),
          id: get(data, 'id'),
        };
        const newData = await SMchc_Doctor.updateHusbandBaseInfoOfOutpatient(params);
        mchcEnv.success(`修改成功`);
        setData(newData)




      })
      .catch((error) => {
        message.error(get(error, 'errorFields.0.errors.0'));
        form.scrollToField(get(error, 'errorFields.0.name.0'));
      });
  };





  // return <FormSectionForm form={form} formDescriptions={form_config()} onValuesChange={(a, b) => {
  //   console.log('onValuesChange', { a, b })
  // }} />
  return <Wrap>
    <BaseEditPanelFormFC form={form} formDescriptions={config?.tableColumns}
      renderBtns={form => {
        return <>
          {renderSubmitBtn()}
        </>
      }}

    />
  </Wrap>

}
export default HusbandInfo



