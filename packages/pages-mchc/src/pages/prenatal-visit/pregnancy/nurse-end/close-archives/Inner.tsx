import {
  BaseEditPanelFormFC,
  handle_form_error,
  MyIcon,
  OkButton
} from '@lm_fe/components_m';
import { mchcEnv } from '@lm_fe/env';
import { BF_Wrap2, mchcModal__, quick_doc } from '@lm_fe/pages';
import { IMchc_Doctor_OutpatientHeaderInfo, IMchc_OutpatientDocumentStatus, SMchc_Doctor } from '@lm_fe/service';
import { getSearchParamsValue } from '@lm_fe/utils';
import { Button, Form, FormInstance } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import store from 'store';

interface IProps {
  isSingle?: boolean
  headerInfo: IMchc_Doctor_OutpatientHeaderInfo
  form?: FormInstance

}
function ClosingArchives_Inner({ headerInfo, isSingle, form = Form.useForm()[0] }: IProps) {
  const { config, Wrap } = BF_Wrap2({
    default_conf: {
      tableColumns: () => import('./form_config'),
      title: '孕册管理-结案管理',
    },

  })


  const [data, setData] = useState<IMchc_OutpatientDocumentStatus>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const id = headerInfo?.id ?? getSearchParamsValue('id')
    SMchc_Doctor.getOutpatientDocumentStatus(id).then(res => {

      form.setFieldsValue(res)
      setData(res)
    })

    return () => {

    }
  }, [])


  async function handlePrint() {
    const localData = store.get('localData');


    mchcModal__.open('print_modal', {
      modal_data: {
        requestData: {
          url: '/api/pdf-preview',
          resource: '',
          template: get(localData, `referralStyle`, 2),
          version: '',
          note: '',
          id: data?.referralOutInfo?.id
        }
      }
    })
  };


  function showPrint() {
    return (data?.referralOutInfo?.organizationName && data.periodState === '5');
  }

  function renderPrintBtn() {

    return showPrint() ? (
      <Button
        type="primary"
        size="large"
        icon={<MyIcon value='PrinterOutlined' />}
        onClick={() => {
          handlePrint()
        }}
      >
        打印转诊单
      </Button>
    ) : null;
  };

  function renderSubmitBtn() {

    return <OkButton
      size="large"
      type="primary"
      loading={loading}
      icon={<MyIcon value='SaveOutlined' />}
      btn_text='保存'
      onClick={handleFinish}
    />
  };

  async function handleFinish() {
    setLoading(true)
    form
      .validateFields()
      .then(async () => {
        const values: IMchc_OutpatientDocumentStatus = form.getFieldsValue();

        const is_fuck = values.recordstate == '6'
        if (is_fuck) {
          const ok = confirm('你确定要结案吗？结案后将无法修改档案的任何信息，请谨慎操作！')
          if (!ok)
            return
        }
        const newData = await SMchc_Doctor.updateOutpatientDocumentStatus(values);
        mchcEnv.success(`修改成功`);
        setData(newData)
        if (get(values, 'recordstate') === '6' && isSingle) {
          if (confirm('此份档案已结案，是否需要新建档案？')) {
            quick_doc('单页')
          }
        }



      })
      .catch((e) => {
        const first_err = handle_form_error(e, form)
        if (first_err?.text) {
          mchcEnv.warning(first_err.text)

        }

      })
      .finally(() => setLoading(false))
  };





  // return <FormSectionForm form={form} formDescriptions={form_config()} onValuesChange={(a, b) => {
  //   console.log('onValuesChange', { a, b })
  // }} />
  return <Wrap>
    <BaseEditPanelFormFC form={form} formDescriptions={config?.tableColumns}
      renderBtns={form => {
        return <>
          {renderPrintBtn()}
          {renderSubmitBtn()}
        </>
      }}

    />
  </Wrap>

}
export default ClosingArchives_Inner
