import React from 'react';
import Form from './components/Form';
import { valueToApi, valueToForm } from '../adapter';
import { get, isEqual, set } from 'lodash';
import { message } from 'antd';
import dayjs from 'dayjs';
import { SMchc_FormDescriptions } from '@lm_fe/service';
import { BaseEditPanel, formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { fubaoRequest as request } from '@lm_fe/utils';
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/family/planning/addFamilyPlanningEarlyPregnancyCheck', request,
    moduleName: 'family-planning-detail-drug-abortion',
    title: '药物流产',
    Form,
  };

  async componentWillReceiveProps(nextProps: any) {
    if (!isEqual(get(nextProps, 'activeItem'), get(this.props, 'activeItem'))) {
      setTimeout(() => {
        this.handleInit(nextProps);
      }, 200);
    }
  }

  async componentDidMount() {
    const { moduleName } = this.props as any;
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName);
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const formKey = Math.random();
    this.setState({ spinning: false });
    this.setState({ formDescriptions, formDescriptionsWithoutSection, formKey });
    setTimeout(() => {
      this.handleInit(this.props);
    }, 200);
  }

  handleInit = async (props: any) => {
    const { formDescriptionsWithoutSection } = this.state;
    const { activeItem, basicInfo } = props as any;
    let values = {};
    if (get(activeItem, 'id')) {
      values = (
        await request.get(
          `/api/family/planning/getFamilyPlanningEarlyPregnancyCheck?id.equals=${get(
            activeItem,
            'id',
          )}&checkType.equals=${get(activeItem, 'checkType')}&deleteFlag.equals=0`,
        )
      ).data;
    }
    values = get(values, 'data.0');
    let data = values ? valueToForm(values, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    const earlyPregnancyCheckDiagnosisInformations = get(
      data,
      'earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations',
    );
    if (earlyPregnancyCheckDiagnosisInformations) {
      set(
        data,
        `earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations.list`,
        earlyPregnancyCheckDiagnosisInformations,
      );
    }

    if (!get(data, 'earlyPregnancyCheckDiagnosisAndTreatment.registrationDate'))
      set(data, 'earlyPregnancyCheckDiagnosisAndTreatment.registrationDate', dayjs(new Date()));
    if (!get(data, 'earlyPregnancyCheckDiagnosisAndTreatment.diagnoseDoctor'))
      set(data, 'earlyPregnancyCheckDiagnosisAndTreatment.diagnoseDoctor', get(basicInfo, 'firstName'));

    this.setState({ data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { onRefresh, id, baseUrl } = this.props as any;
    const { data, formDescriptionsWithoutSection } = this.state;
    const earlyPregnancyCheckDiagnosisAndTreatment = get(data, 'earlyPregnancyCheckDiagnosisAndTreatment');
    const earlyPregnancyCheckInspection = get(data, 'earlyPregnancyCheckInspection');
    const earlyPregnancyCheckMedicalHistory = get(data, 'earlyPregnancyCheckMedicalHistory');
    const womenHealthcarePhysicalExamination = get(data, 'womenHealthcarePhysicalExamination');
    let params = valueToApi(values, formDescriptionsWithoutSection);

    const earlyPregnancyCheckDiagnosisInformations = get(
      params,
      'earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations.list',
    );
    set(
      params,
      'earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations',
      earlyPregnancyCheckDiagnosisInformations,
    );

    //每个对象有id 都要传回去
    set(params, 'earlyPregnancyCheckDiagnosisAndTreatment.id', get(earlyPregnancyCheckDiagnosisAndTreatment, 'id'));
    set(params, 'earlyPregnancyCheckInspection.id', get(earlyPregnancyCheckInspection, 'id'));
    set(params, 'earlyPregnancyCheckMedicalHistory.id', get(earlyPregnancyCheckMedicalHistory, 'id'));
    set(params, 'womenHealthcarePhysicalExamination.id', get(womenHealthcarePhysicalExamination, 'id'));

    params = {
      ...data,
      ...params,
      checkType: '药物流产',
      familyPlanningId: Number(id),
    };

    if (get(values, 'id')) {
      // 修改
      const _res = await request.put('/api/family/planning/updateFamilyPlanningEarlyPregnancyCheck', params);
      const res= _res.data
      
    } else {
      //新增
      const _res = await request.post(baseUrl, params)
      const res= _res.data

      
    }
    onRefresh && onRefresh();
  };
}
