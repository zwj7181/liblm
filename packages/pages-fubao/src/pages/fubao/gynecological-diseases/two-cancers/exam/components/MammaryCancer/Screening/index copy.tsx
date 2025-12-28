import { BaseEditPanel, formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { SFubao_BreastCancerScreening } from '@lm_fe/service';
import { fubaoRequest as request } from '@lm_fe/utils';
import { get, isEqual, set } from 'lodash';
import dayjs from 'dayjs';
import Form from './components/Form';
import { valueToApi, valueToForm } from './config/adapter';
import { form_config } from './form_config';
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/two/cancer/screening/addBreastCancerRecord', request,
    moduleName: 'mammary-cancer-screening',
    title: '筛查',
    Form,
    targetLabelCol: 4,
  };

  state = {
    data: {},
    formDescriptionsWithoutSection: {},
    formDescriptions: [],
    formKey: undefined,
    spinning: true,
    activeItem: {},
  };

  extraEvents = {
    handleDisabled: (formDescriptionsWithoutSection: any) => {
      this.setState({ formDescriptionsWithoutSection });
    },
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
      get(prevProps, 'activeItem') !== get(this.props, 'activeItem')
    ) {
      this.handleInit();
    }
  }

  async componentDidMount() {
    const { moduleName } = this.props as any;
    const formDescriptions = (await form_config()).default.__lazy_config;

    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);

    console.log('breast formDescriptions', { formDescriptions, formDescriptionsWithoutSection })

    const formKey = Math.random();
    this.setState({ spinning: false });
    this.setState({ formDescriptions, formDescriptionsWithoutSection, formKey });
    this.handleInit();
  }

  handleInit = async () => {
    const { activeItem, formDescriptionsWithoutSection } = this.state;
    const { basicInfo, basicData, siderPanels, system } = this.props as any;
    console.log('breast', this.props)
    let values = {};
    if (get(activeItem, 'breastCancerScreeningId') && get(activeItem, 'breastCancerScreeningId') != -1) {
      values = await SFubao_BreastCancerScreening.getOne(get(
        activeItem,
        'breastCancerScreeningId',
      ))
      console.log('??', values)
      // values = (await request.get(
      //   `/api/two/cancer/screening/getBreastCancerScreening?id.equals=${get(
      //     activeItem,
      //     'breastCancerScreeningId',
      //   )}&deleteFlag.equals=0`,
      // )).data;
      // values = get(values, 'data.0');
    } else {
      set(values, 'womenHealthcareMenstrualHistory', { ...get(basicData, 'womenHealthcareMenstrualHistory') }); //同步档案月经史信息
    }

    let data = values ? valueToForm(values, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    //既往接受乳腺癌筛查 取上一次数据
    // if (!get(data, 'breastCancerMedicalHistory.previousBreastScreening')) {
    //   if (siderPanels.length > 1) {
    //     const breastCancerMedicalHistory = siderPanels[siderPanels.length - 2];
    //     const breastCancerScreeningCheckDate = get(breastCancerMedicalHistory, 'breastCancerScreeningCheckDate');
    //     const breastCancerScreeningScreeningSuggest = get(
    //       breastCancerMedicalHistory,
    //       'breastCancerScreeningScreeningSuggest',
    //     );
    //     set(data, 'breastCancerMedicalHistory.previousBreastScreening', {
    //       key: 2,
    //       keyNote: `${breastCancerScreeningScreeningSuggest}(${breastCancerScreeningCheckDate})`,
    //     });
    //   }
    // }
    if (!get(data, 'breastCancerDiagnosisAndGuidance.checkUnit'))
      set(data, 'breastCancerDiagnosisAndGuidance.checkUnit', get(system, 'config.hospitalName'));
    if (!get(data, 'breastCancerDiagnosisAndGuidance.checkDate'))
      set(data, 'breastCancerDiagnosisAndGuidance.checkDate', dayjs(new Date()));
    if (!get(data, 'breastCancerDiagnosisAndGuidance.checkDoctor'))
      set(data, 'breastCancerDiagnosisAndGuidance.checkDoctor', get(basicInfo, 'firstName'));
    this.setState({ data, formKey });
  };

  handleSubmit = async (values: any) => {

    const { onRefresh, id, baseUrl } = this.props as any;
    const { formDescriptionsWithoutSection, data, activeItem } = this.state as any;

    let params: any = valueToApi(values, formDescriptionsWithoutSection);
    console.log('values', values, params)

    if (get(values, 'id')) {
      // 修改
      params = {
        ...data,
        ...params,
        screeningType: '乳腺癌筛查',
      };
      await SFubao_BreastCancerScreening.new_put(params)
      // const res = (await request.put('/api/two/cancer/screening/updateBreastCancerScreening', params)).data;

      onRefresh && onRefresh('Screening', activeItem);
    } else {
      //新增
      params = {
        breastCancerScreening: {
          ...params,
          screeningType: '乳腺癌筛查',
        },
        twoCancerScreeningId: Number(id),
      };
      // const res = (await request.post(baseUrl, params)).data
      await SFubao_BreastCancerScreening.new_post(params)

      onRefresh && onRefresh('Screening', activeItem, true);
    }
  };
}
