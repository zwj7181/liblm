import React from 'react';
import Form from './components/Form';
//import { toApi, fromApi, valueToApi, valueToForm } from './config/adapter';
import { valueToApi, valueToForm } from './config/adapter';
import { formDescriptionsWithoutSectionApi, BaseEditPanel } from '@lm_fe/components_m'
import { get, isEqual, set, isEmpty } from 'lodash';
import { fubaoRequest as request } from '@lm_fe/utils';

import { message } from 'antd';
import dayjs from 'dayjs';
import { SFubao_CervicalCancerScreening, SMchc_FormDescriptions } from '@lm_fe/service'
import { form_config } from './form_config';
import { mchcLogger } from '@lm_fe/env';

export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/two/cancer/screening/addCervicalCancerRecord', request,
    moduleName: 'cervical-carcinoma-screening',
    title: '筛查',
    Form,
  };
  state = {
    data: {},
    formDescriptionsWithoutSection: {},
    formDescriptions: [],
    formKey: undefined,
    spinning: true,
    activeItem: {} as any,
  };
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { activeItem } = nextProps;
    if (!isEqual(activeItem, prevState.activeItem)) {
      return {
        activeItem,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    //console.log(prevState, this.state, 'state');
    if (
      get(prevProps, 'activeItem') !== get(this.props, 'activeItem')
    ) {
      this.handleInit();
    }
  }
  async componentDidMount() {
    const { moduleName } = this.props as any;
    const formDescriptions = (await form_config()).default.__lazy_config
    
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const formKey = Math.random();
    this.setState({ spinning: false });
    this.setState({ formDescriptions, formDescriptionsWithoutSection, formKey });
    this.handleInit();
  }
  handleInit = async () => {
    const { activeItem, formDescriptionsWithoutSection } = this.state;
    const { basicInfo, basicData, siderPanels, system } = this.props as any;
    let values = {};
    if (get(activeItem, 'cervicalCancerScreeningId') && get(activeItem, 'cervicalCancerScreeningId') != -1) {
      values = (
    
        await SFubao_CervicalCancerScreening.getOne(activeItem?.cervicalCancerScreeningId)
      );
    } else {
      set(values, 'womenHealthcareMenstrualHistory', { ...get(basicData, 'womenHealthcareMenstrualHistory') }); //同步档案月经史信息
    }
    let data = values ? valueToForm(values, formDescriptionsWithoutSection) : {};
    mchcLogger.log('ff values', { values, data })
    const formKey = get(data, 'id') || Math.random();

    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkUnit'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkUnit', get(system, 'config.hospitalName'));
    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkDate'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkDate', dayjs(new Date()));
    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkDoctorName'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkDoctorName', get(basicInfo, 'firstName'));
    console.log('zzw', data, values, this.props)
    this.setState({ data, formKey });
  };
  handleSubmit = async (values: any) => {
    const { onRefresh, id, baseUrl } = this.props as any;
    const { formDescriptionsWithoutSection, data, activeItem } = this.state as any;
    let params: any = valueToApi(values, formDescriptionsWithoutSection);
    if (get(values, 'id')) {
      // 修改
      params = {
        ...data,
        ...params,
        screeningType: '宫颈癌筛查',
      };
      const res = await SFubao_CervicalCancerScreening.postOrPut(params,);

      onRefresh && onRefresh('Screening', activeItem);
    } else {
      //新增
      params = {
        cervicalCancerScreening: {
          ...params,
          screeningType: '宫颈癌筛查',
        },
        twoCancerScreeningId: Number(id),
      };
      const res = (await SFubao_CervicalCancerScreening.postOrPut(params,))

      onRefresh && onRefresh('Screening', activeItem, true);
    }
  };
}
