import { BaseEditPanel, fromApi as defaultFromApi, formDescriptionsWithoutSectionApi, observePatientData } from '@lm_fe/components_m';
import { SLocal_State, SMchc_FormDescriptions } from '@lm_fe/service';
import { request } from '@lm_fe/utils';
import { get, set } from 'lodash';
import Form from './components/Form';

export default class ReferralOut extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/referrals',
    moduleName: 'referral-out',
    title: '转出登记',
    Form,
  };

  async componentDidMount() {
    const { routerQuery, moduleName, baseUrl, fromApi = defaultFromApi } = this.props;
    // 订阅从 panel 获取的数据
    observePatientData.subscribe((data: any) => {
      const { data: prevData } = this.state;
      this.setState({
        data: {
          ...prevData,
          ...data,
        },
      });
    });
    // 优先从 props 里面获取id，因为可能作为组件，被其它页面引用使用
    const id = get(this.props, 'id') || get(routerQuery, 'id');
    const formDescriptions = await SMchc_FormDescriptions.getModuleParse(moduleName!);

    this.setState({ spinning: false });
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const data = id ? fromApi((await request.get(`${baseUrl}/${id}`)).data, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    if (!get(data, 'recorder')) set(data, 'recorder', SLocal_State.userData?.firstName);

    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  }
}
