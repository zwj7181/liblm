import React from 'react';
import { message } from 'antd';
import { get } from 'lodash';
import Form from './components/Form';
import { valueToApi, valueToForm } from '../config/adapter';
import { BaseEditPanel, formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { SMchc_FormDescriptions } from '@lm_fe/service';
import form_config from './form_config'
import { getSearchParamsValue, fubaoRequest as request } from '@lm_fe/utils';
export default class MedicalHistory extends BaseEditPanel<any> {
  static defaultProps = {
    baseUrl: '/api/premarital/check/savePremaritalCheckArchivesMedicalHistory', request,
    moduleName: 'wife-premarital-care-medical-history',
    title: '病史情况',
    Form,
  };

  async componentDidMount() {
    this.handleInit();
  }

  handleInit = async () => {
    const { routerQuery, moduleName, type } = this.props as any;
    const id = get(this.props, 'id') || getSearchParamsValue('id');
    let res: any;
    let data: any;
    // 获取配置文件
    const formDescriptions = form_config.__lazy_config;
    // const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName);
    this.setState({ spinning: false });
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    if (type === 'wife') {
      res = id
        ? (
          await request.get(
            `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=2&childrenSign.equals=2`,
          )
        ).data
        : {};
    } else {
      res = id
        ? (
          await request.get(
            `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=1&childrenSign.equals=2`,
          )
        ).data
        : {};
    }
    if (res) {
      data = get(res, 'data.0');
      data = { ...data, ...get(data, 'premaritalCheckArchivesMedicalHistoryVM') };
    }

    data = id ? valueToForm(data, formDescriptionsWithoutSection) : {};

    const formKey = get(data, 'id') || Math.random();

    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { formDescriptionsWithoutSection, data, newData } = this.state as any;
    const { baseUrl, filesData, type } = this.props as any;
    let { premaritalCheckArchivesMedicalHistoryVM } = data;
    if (newData) {
      premaritalCheckArchivesMedicalHistoryVM = get(newData, 'premaritalCheckArchivesMedicalHistoryVM');
    }
    let params = valueToApi(values, formDescriptionsWithoutSection);
    let premaritalCheckArchivesDetailId = get(filesData, 'womanPremaritalCheckArchivesDetailVM.id');
    if (type === 'husband') {
      premaritalCheckArchivesDetailId = get(filesData, 'manPremaritalCheckArchivesDetailVM.id');
    }

    params = {
      ...premaritalCheckArchivesMedicalHistoryVM,
      ...params,
      premaritalCheckArchivesDetailId,
    };

    const _res = await request.post(baseUrl, params)
    const res = _res.data
    if (get(res, 'code') === 1) {

      let newData = get(res, 'data.0');
      this.setState({ newData });
    } else {

    }
  };
}
