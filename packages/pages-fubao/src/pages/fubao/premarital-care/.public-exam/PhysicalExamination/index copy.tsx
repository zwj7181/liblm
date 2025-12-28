import { BaseEditPanel, formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { mchcLogger } from '@lm_fe/env';
import { getSearchParamsValue, fubaoRequest as request } from '@lm_fe/utils';
import { get } from 'lodash';
import { valueToApi, valueToForm } from '../config/adapter';
import Form from './components/Form';

import form_config from './form_config';

export default class PhysicalExamination extends BaseEditPanel<any> {
  static defaultProps = {
    baseUrl: '/api/premarital/check/savePremaritalCheckArchivesPhysicalExamination', request,
    moduleName: 'wife-premarital-care-physical-exam',
    title: '体格检查',
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
            `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=2&childrenSign.equals=3`,
          )
        ).data
        : {};
    } else {
      res = id
        ? (
          await request.get(
            `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=1&childrenSign.equals=3`,
          )
        ).data
        : {};
    }
    if (res) {
      data = get(res, 'data.0');
      data = { ...data, ...get(data, 'premaritalCheckArchivesPhysicalExaminationVM') };
    }

    data = id ? valueToForm(data, formDescriptionsWithoutSection) : {};

    const formKey = get(data, 'id') || Math.random();

    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { formDescriptionsWithoutSection, data, newData } = this.state as any;
    mchcLogger.log('premaritalCheckArchivesPhysicalExaminationVM', { values, data, newData })
    const { baseUrl, filesData, type } = this.props as any;
    let { premaritalCheckArchivesPhysicalExaminationVM } = data;
    if (newData) {
      premaritalCheckArchivesPhysicalExaminationVM = get(newData, 'premaritalCheckArchivesPhysicalExaminationVM');
    }
    let params = valueToApi(values, formDescriptionsWithoutSection);
    let premaritalCheckArchivesDetailId = get(filesData, 'womanPremaritalCheckArchivesDetailVM.id');
    if (type === 'husband') {
      premaritalCheckArchivesDetailId = get(filesData, 'manPremaritalCheckArchivesDetailVM.id');
    }

    params = {
      ...premaritalCheckArchivesPhysicalExaminationVM,
      ...params,
      premaritalCheckArchivesDetailId,
    };

    const _re = (await request.post(baseUrl, params)).data
    const res = _re.data
    if (get(res, 'code') === 1) {

      let newData = get(res, 'data.0');
      this.setState({ newData });
    } else {

    }
  };
}
