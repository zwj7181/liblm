import { BaseEditPanel, formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { getSearchParamsValue, fubaoRequest as request } from '@lm_fe/utils';
import { get } from 'lodash';
import { valueToApi, valueToForm } from '../config/adapter';
import Form from './components/Form';
import form_config from './form_config';
export default class BasicInfo extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/premarital/check/savePremaritalCheckArchivesBasicInformation', request,
    moduleName: 'wife-premarital-care-basic-info',
    title: '基本信息',
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
    // const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName);
    const formDescriptions = form_config.__lazy_config;
    this.setState({ spinning: false });
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    if (type === 'wife') {
      res = id
        ? (await request.get(
          `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=2&childrenSign.equals=1`,
        )).data
        : {};
    } else {
      res = id
        ? (await request.get(
          `/api/premarital/check/getByPremaritalCheckArchivesId?premaritalCheckArchivesId.equals=${id}&fileType.equals=1&childrenSign.equals=1`,
        )).data
        : {};
    }
    if (res) {
      data = get(res, 'data.0');
      data = { ...data, ...get(data, 'premaritalCheckArchivesBasicInformationVM') };
    }

    data = id ? valueToForm(data, formDescriptionsWithoutSection) : {};

    const formKey = get(data, 'id') || Math.random();

    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { formDescriptionsWithoutSection, data, newData } = this.state as any;
    const { baseUrl, filesData, type } = this.props as any;
    let { premaritalCheckArchivesBasicInformationVM } = data;
    if (newData) {
      premaritalCheckArchivesBasicInformationVM = get(newData, 'premaritalCheckArchivesBasicInformationVM');
    }
    let params = valueToApi(values, formDescriptionsWithoutSection);
    let premaritalCheckArchivesDetailId = get(filesData, 'womanPremaritalCheckArchivesDetailVM.id');
    if (type === 'husband') {
      premaritalCheckArchivesDetailId = get(filesData, 'manPremaritalCheckArchivesDetailVM.id');
    }

    params = {
      ...premaritalCheckArchivesBasicInformationVM,
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
