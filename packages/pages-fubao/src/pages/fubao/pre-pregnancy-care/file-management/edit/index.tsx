
import dayjs from 'dayjs';
import { get, isNil, map, omit, set } from 'lodash';

import { BaseEditPanelFormFC } from '@lm_fe/components_m';
import { mchcDriver, mchcUtils } from '@lm_fe/env';
import { use_provoke } from '@lm_fe/provoke';
import { AnyObject, request } from '@lm_fe/utils';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { BF_Wrap2 } from '@lm_fe/pages';

const baseUrl = '/api/progestation/check/addProgestationCheckArchives'
const w_vm = 'womanProgestationCheckArchivesDetailVM'
const m_vm = 'manProgestationCheckArchivesDetailVM'
const baseinfo_k = 'progestationCheckArchivesBasicInformation'
const medical_history_k = 'progestationCheckArchivesMedicalHistory'
const physical_exam_k = 'progestationCheckArchivesPhysicalExamination'
const fuck_keys = ['name', 'outpatientNo', 'telephone', 'age']
// moduleName: 'progestation-care-file-management',
// title: '档案信息',
const form_fn = () => import('./form_config')

function WifePanel_new(props: any) {
  const id = mchcUtils.single_id(props);
  const { config, Wrap } = BF_Wrap2({
    default_conf: {
      title: '孕前检查-档案编辑',
      tableColumns: form_fn
    }
  })

  const user = use_provoke(s => s.user_info)

  const [form] = Form.useForm();

  const [data, set_data] = useState<AnyObject>({});

  useEffect(() => {

    handleInit();
    return mchcDriver.on_rm('data', e => {
      if (e.type === 'ReadCard') {
        let res = e.data
        form.setFieldsValue?.({
          [w_vm]: {
            [baseinfo_k]: {
              ...res
            }
          }

        })
      }
    })
  }, [])



  function isUndefined(obj: object) {
    map(obj, (item, key) => {
      if (isNil(item)) {
        obj = omit(obj, [key]);
      }
    });
    return obj;
  };
  function init_baseinfo(data: any, key: string, iswoman = true) {
    const vm = iswoman ? w_vm : m_vm;
    const prefix = iswoman ? 'woman' : 'man'
    const upppercase_key = key[0].toUpperCase() + key.slice(1)
    if (!get(data, `${vm}.${baseinfo_k}.${key}`)) {
      set(data, `${vm}.${baseinfo_k}.${key}`, get(data, `${prefix}${upppercase_key}`));
    }
  }
  function revert_init_baseinfo(data: any, key: string, iswoman = true) {
    const vm = iswoman ? w_vm : m_vm;
    const prefix = iswoman ? 'woman' : 'man'
    const upppercase_key = key[0].toUpperCase() + key.slice(1)
    if (!get(data, `${prefix}${upppercase_key}`)) {
      set(data, `${prefix}${upppercase_key}`, get(data, `${vm}.${baseinfo_k}.${key}`));
    }
  }
  async function handleInit() {
    // 获取配置文件
    // const formDescriptions = await SMchc_FormDescriptions.getModuleParse(moduleName);

    let data = id
      ? (
        await request.get(
          `/api/progestation/check/getByProgestationCheckArchivesId?progestationCheckArchivesId.equals=${id}&childrenSign.equals=0`,
          { unboxing: true }
        )
      ).data
      : {};

    ['name', 'outpatientNo', 'telephone', 'age'].forEach((key: string) => {
      init_baseinfo(data, key, true);
      init_baseinfo(data, key, false);
    })



    //是否近亲结婚
    if (get(data, `${w_vm}.nearRelation`)) {
      set(data, 'nearRelation', get(data, '${w_vm}.nearRelation'));
    }
    if (get(data, `${w_vm}.nearRelationNote`)) {
      set(data, 'nearRelationNote', get(data, `${w_vm}.nearRelationNote`));
    }
    if (get(data, `${m_vm}.nearRelation`)) {
      set(data, 'nearRelation', get(data, `${m_vm}.nearRelation`));
    }
    if (get(data, `${m_vm}.nearRelationNote`)) {
      set(data, 'nearRelationNote', get(data, `${m_vm}.nearRelationNote`));
    }
    if (!get(data, 'nearRelationNote')) {
      set(data, 'nearRelationNote', null);

    }



    if (!get(data, 'filingDay')) set(data, 'filingDay', dayjs(new Date()));
    if (!get(data, 'auditor')) set(data, 'auditor', user?.firstName);

    data = mchcUtils.autoNoteToCommonOption(data)


      ;[w_vm, m_vm].forEach((vm: string) => {



        set(data, `${vm}.${baseinfo_k}`, mchcUtils.autoNoteToCommonOption(get(data, `${vm}.${baseinfo_k}`)))
        set(data, `${vm}.${medical_history_k}`, mchcUtils.autoNoteToCommonOption(get(data, `${vm}.${medical_history_k}`)))
        set(data, `${vm}.${physical_exam_k}`, mchcUtils.autoNoteToCommonOption(get(data, `${vm}.${physical_exam_k}`)))

      })


    set_data(data)
    form.setFieldsValue(data);
  };

  async function handleSubmit(values: any) {

    fuck_keys.forEach((key) => {
      revert_init_baseinfo(values, key, true);
      revert_init_baseinfo(values, key, false);
    })
    let submit_values = mchcUtils.autoCommonOptionToNote(values)

      ;[w_vm, m_vm].forEach((vm: string) => {


        set(submit_values, `${vm}.${baseinfo_k}`, mchcUtils.autoCommonOptionToNote(get(submit_values, `${vm}.${baseinfo_k}`)))
        set(submit_values, `${vm}.${medical_history_k}`, mchcUtils.autoCommonOptionToNote(get(submit_values, `${vm}.${medical_history_k}`)))
        set(submit_values, `${vm}.${physical_exam_k}`, mchcUtils.autoCommonOptionToNote(get(submit_values, `${vm}.${physical_exam_k}`)))

      })


    console.log('params', { params: submit_values, values })

    //是否近亲结婚(后台怪异结构需要这么传)
    if (get(submit_values, 'nearRelation')) {
      set(submit_values, `${m_vm}.nearRelation`, get(submit_values, 'nearRelation'));
      set(submit_values, `${w_vm}.nearRelation`, get(submit_values, 'nearRelation'));
    }
    if (get(submit_values, 'nearRelationNote')) {
      set(submit_values, `${m_vm}.nearRelationNote`, get(submit_values, 'nearRelationNote'));
      set(submit_values, `${w_vm}.nearRelationNote`, get(submit_values, 'nearRelationNote'));
    }

    //判断男女各自档案信息是否为空，空就不传
    // const manprogestationCheckArchivesBasicInformation = isUndefined(
    //   get(params, 'manProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation'),
    // );
    // const manprogestationCheckArchivesMedicalHistory = isUndefined(
    //   get(params, 'manProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory'),
    // );
    // const manprogestationCheckArchivesPhysicalExamination = isUndefined(
    //   get(params, 'manProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination'),
    // );

    // //女方
    // const womanprogestationCheckArchivesBasicInformation = isUndefined(
    //   get(params, 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesBasicInformation'),
    // );
    // const womanprogestationCheckArchivesMedicalHistory = isUndefined(
    //   get(params, 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesMedicalHistory'),
    // );
    // const womanprogestationCheckArchivesPhysicalExamination = isUndefined(
    //   get(params, 'womanProgestationCheckArchivesDetailVM.progestationCheckArchivesPhysicalExamination'),
    // );

    // if (
    //   !isEmpty(manprogestationCheckArchivesBasicInformation) ||
    //   !isEmpty(manprogestationCheckArchivesMedicalHistory) ||
    //   !isEmpty(manprogestationCheckArchivesPhysicalExamination)
    // ) {
    //   //档案类型（1男方档案，2女方档案）
    //   set(params, 'manProgestationCheckArchivesDetailVM.fileType', 1);
    // } else {
    //   params = omit(params, ['manProgestationCheckArchivesDetailVM']);
    // }
    set(submit_values, `${m_vm}.fileType`, 1);

    // if (
    //   !isEmpty(womanprogestationCheckArchivesBasicInformation) ||
    //   !isEmpty(womanprogestationCheckArchivesMedicalHistory) ||
    //   !isEmpty(womanprogestationCheckArchivesPhysicalExamination)
    // ) {
    //   //档案类型（1男方档案，2女方档案）
    //   set(params, 'womanProgestationCheckArchivesDetailVM.fileType', 2);
    // } else {
    //   params = omit(params, ['womanProgestationCheckArchivesDetailVM']);
    // }
    set(submit_values, `${w_vm}.fileType`, 2);

    //判断是否继续新建还是保存审核
    if (!id) {
      submit_values = {
        ...submit_values,
        fileStatus: 1,
      };

      await request.post(baseUrl, submit_values);

    } else {
      if (get(values, 'id')) {

        // 修改档案
        submit_values = {
          ...data,
          ...submit_values,
          fileStatus: 2,
        };
        await request.put('/api/progestation/check/updateProgestationCheckArchivesDetail', submit_values);

      } else {
        //新增档案
        submit_values = {
          ...submit_values,
          fileStatus: 2,
        };

        await request.post(baseUrl, submit_values);

      }
    }
  };

  return <Wrap style={{}}>
    <BaseEditPanelFormFC form={form} formDescriptions={__DEV__ ? form_fn : config?.tableColumns} onFinish={async values => {
      return handleSubmit(values)

    }} />
  </Wrap>
}
export default WifePanel_new
