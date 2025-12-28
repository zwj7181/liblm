import React from 'react';
import Form from './components/Form';
import { valueToApi, valueToForm } from './config/adapter';
import { formDescriptionsWithoutSectionApi, BaseEditPanel } from '@lm_fe/components_m'
import { get, isEqual, set, isEmpty } from 'lodash';
import { fubaoRequest as request } from '@lm_fe/utils';
import { message } from 'antd';
import dayjs from 'dayjs';
import { SMchc_FormDescriptions } from '@lm_fe/service'
import { form_config } from './form/form_config';
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/two/cancer/screening/addCervicalCancerBiopsy', request,
    moduleName: 'pathological-biopsy',
    title: '病理活检',
    Form,
  };

  state = {
    data: {},
    formDescriptionsWithoutSection: {},
    formDescriptions: [],
    formKey: undefined,
    spinning: true,
    activeItem: {},
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
    if (
      !isEmpty(get(prevState, 'activeItem')) &&
      !isEqual(get(prevState, 'activeItem'), get(this.state, 'activeItem'))
    ) {
      this.handleInit();
    }
  }

  async componentDidMount() {
    const { moduleName } = this.props as any;
    const formDescriptions = form_config();

    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const formKey = Math.random();
    this.setState({ spinning: false });
    this.setState({ formDescriptions, formDescriptionsWithoutSection, formKey });
    this.handleInit();
  }

  handleInit = async () => {
    const { activeItem, formDescriptionsWithoutSection } = this.state;
    const { basicInfo, system } = this.props as any;
    let values = {};
    let cervicalCancerRecordId;
    if (get(activeItem, 'cervicalCancerBiopsyId')) {
      if (get(activeItem, 'cervicalCancerBiopsyId') != -1) {
        values = await request.get(
          `/api/two/cancer/screening/getCervicalCancerBiopsy?id.equals=${get(
            activeItem,
            'cervicalCancerBiopsyId',
          )}&deleteFlag.equals=0`,
        );
      }
      cervicalCancerRecordId = get(activeItem, 'id');
    }
    values = get(values, 'data.0');

    let data = values ? valueToForm(values, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkUnit'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkUnit', get(system, 'config.hospitalName'));
    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkDate'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkDate', dayjs(new Date()));
    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkDoctorName'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkDoctorName', get(basicInfo, 'firstName'));

    this.setState({ data, formKey, cervicalCancerRecordId });
  };

  handleSubmit = async (values: any) => {
    const { onRefresh, id, baseUrl } = this.props as any;
    const { formDescriptionsWithoutSection, cervicalCancerRecordId, data, activeItem } = this.state as any;

    let params = valueToApi(values, formDescriptionsWithoutSection);

    params = {
      ...data,
      ...params,
      cervicalCancerRecordId: Number(cervicalCancerRecordId),
      screeningType: '宫颈癌筛查',
    };

    if (get(values, 'id')) {
      // 修改
      const res = await request.put('/api/two/cancer/screening/updateCervicalCancerBiopsy', params);
      
    } else {
      //新增
      const res = (await request.post(baseUrl, params)).data
      
    }
    onRefresh && onRefresh('PathologicalBiopsy', activeItem);
  };
}
