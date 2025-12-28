import { BaseEditPanelFormFC, OkButton } from '@lm_fe/components_m';
import { ICommonOption, mchcEvent } from '@lm_fe/env';
import { IFubao_TwoCancerScreeningFile, SFubao_TwoCancerScreeningFile, SLocal_State } from '@lm_fe/service';
import { formatDate, getSearchParamsValue, safe_json_parse_arr } from '@lm_fe/utils';
import { Button, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { form_config } from './form/form_config';
import { archivalInformation_onClose, archivalInformation_onPrint, archivalInformation_onValuesChange } from './utils';
import { load_form_config } from './form_config/Form';
function Pregnancies(props: any) {
  const { id } = props
  const [formData, setFormData] = useState<Partial<IFubao_TwoCancerScreeningFile>>({})
  const [form] = Form.useForm()
  const [requiredKeys, setRequiredKeys] = useState<{ [x: string]: boolean }>({})
  const searchId = getSearchParamsValue('id')
  const _id = id ?? searchId
  const [loading, setLoading] = useState(false)

  const 已审核 = SFubao_TwoCancerScreeningFile.check_审核(formData)
  useEffect(() => {
    if (_id) {
      setTimeout(() => {
        SFubao_TwoCancerScreeningFile.getOne(_id)

          .then(formData => {
            const u = SLocal_State.getUserData()
            formData.registerDate = formData.registerDate ?? formatDate()
            formData.registerPerson = formData.registerPerson ?? u.firstName
            formData.fileStatus = formData.fileStatus ?? 1
            // formData.testingFacility = formData.testingFacility
            form.setFieldsValue(formData)
            setFormData(formData)
          })






      }, 600);
    }

  }, [])

  useEffect(() => {
    return mchcEvent.on_rm('my_form', (e) => {

    })

  }, [])

  function onValuesChange(changedValues: any, allValues: any) {
    archivalInformation_onValuesChange(changedValues, allValues, form, obj => setRequiredKeys({ ...requiredKeys, ...obj }))
  }
  function onPrint() {
    if (formData?.id) {
      archivalInformation_onPrint(formData.id)
    }
  }

  async function validate_submit(to_审核 = false) {
    setLoading(true)
    return form.validateFields()
      .then((v) => SFubao_TwoCancerScreeningFile.postOrPut({ ...formData, ...v }, to_审核))
      .catch((e) => {
        message.warning('请完善表单项！')
        console.log('erro', e)
      })
      .finally(() => {
        setLoading(false)
      })

  }
  async function submit_continue(isContinue = false) {
    const remoteData = await validate_submit()
    if (!remoteData) return
    form.resetFields()

  }
  async function submit(to_审核 = false) {
    const remoteData = await validate_submit(to_审核)
    if (!remoteData) return

    form.setFieldsValue(remoteData)
    setFormData(remoteData)



  }
  return <>

    <BaseEditPanelFormFC requiredKeys={requiredKeys} form={form} formDescriptions={load_form_config}
      onValuesChange={onValuesChange}
      // onPrint={onPrint}

      // onFinish={onFinish}

      renderBtns={() => {
        return <>
          {/* {
            _id ? <Button type="primary" size="large" onClick={onPrint}>
              打印
            </Button> : null
          } */}
          <Button loading={loading} type="primary" size="large" onClick={() => submit()}>
            保存
          </Button>
          {
            searchId ? (
              // 已审核 ? null
              //   : <Button loading={loading} type="primary" size="large" onClick={() => submit(true)}>
              //     审核并保存
              //   </Button>
              null
            )
              : <OkButton loading={loading} type="primary" size="large" onClick={() => submit_continue()}>
                保存并继续添加
              </OkButton>
          }
          <Button size="large" onClick={archivalInformation_onClose}>
            关闭
          </Button>
        </>
      }}

    />

  </>
}
export default Pregnancies;
