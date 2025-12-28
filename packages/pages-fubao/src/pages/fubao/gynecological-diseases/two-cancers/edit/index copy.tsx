import {
  BaseEditPanel, fromApi as defaultFromApi,
  toApi as defaultToApi, formDescriptionsWithoutSectionApi,
  resolveFubaoPath
} from '@lm_fe/components_m';
import { SLocal_History, SMchc_FormDescriptions } from '@lm_fe/service';
import { getSearchParamsValue, fubaoRequest as request } from '@lm_fe/utils';
import { message } from 'antd';
import { get, set } from 'lodash';
import dayjs from 'dayjs';
import Form from './components/Form';
import { fubaoHistoryPush } from '@lm_fe/components_m';
import { valueToApi, valueToForm } from './config/adapter';
class TwoCancers extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/two/cancer/screening/addTwoCancerScreeningFile', request,
    moduleName: 'two-cancers',
    title: '两癌筛查',
    Form,
  };

  async componentDidMount() {
    this.handleInit();
  }

  handleInit = async () => {
    const { routerQuery, moduleName, fromApi = defaultFromApi, user, system } = this.props as any;
    const id = get(this.props, 'id') || getSearchParamsValue('id');
    // 获取配置文件
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName!);
    this.setState({ spinning: false });

    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    let data = id ? (await request.get(`/api/two/cancer/screening/getTwoCancerScreeningFile/page?id.equals=${id}`)).data : {};
    console.log('data', data)
    if (data) {
      data = get(data, 'data.pageData.0');
    }
    data = id ? fromApi(data, formDescriptionsWithoutSection) : {};
    if (data) {
      data = valueToForm(data);
    }
    const formKey = get(data, 'id') || Math.random();

    if (!get(data, 'testingFacility')) set(data, 'testingFacility', get(system, 'config.hospitalName'));
    if (!get(data, 'registerDate')) set(data, 'registerDate', dayjs(new Date()));
    if (!get(data, 'registerPerson')) set(data, 'registerPerson', get(user, 'basicInfo.firstName'));
    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { formDescriptionsWithoutSection } = this.state as any;
    const {
      toApi = defaultToApi,
      baseUrl,
      history,
      deleteTab,
      routerPath,
      keepAliveProviderRef,
      updateTabs,
      tabs,
    } = this.props as any;
    let params = await toApi(values, formDescriptionsWithoutSection);
    params = valueToApi(params);
    console.log('params', params, values)
    //判断是否继续新建还是关闭
    if (get(params, 'build')) {
      const res = (await request.post(baseUrl, params)).data

    } else {
      if (get(values, 'id')) {
        // 修改档案
        const res = (await request.put('/api/two/cancer/screening/updateTwoCancerScreeningFile', params, { showMsg: true })).data;

        //删除keepAliveProvider缓存
        // await updateTabs(get(tabs, `tabsMapping./gynecological-diseases/two-cancers`));
        // routerPath && (await deleteTab(routerPath));
        // fubaoHistoryPush('/gynecological-diseases/two-cancers', this.props as any);
        // const { path, search } = get(tabs, `tabsMapping.${routerPath}`);
        // keepAliveProviderRef?.current.removeCache(`${path}.name.${search}`);

        // routerPath && deleteTab(routerPath);
        // fubaoHistoryPush('/gynecological-diseases/two-cancers');

        SLocal_History.closeAndPush(resolveFubaoPath(`/gynecological-diseases/two-cancers`))

      } else {
        //新增档案
        console.log('params 新增档案')

        const res = (await request.post(baseUrl, params)).data

        console.log('params', res)


        //删除keepAliveProvider缓存
        // await updateTabs(get(tabs, `tabsMapping./gynecological-diseases/two-cancers`));
        // routerPath && (await deleteTab(routerPath));
        // fubaoHistoryPush('/gynecological-diseases/two-cancers', this.props as any);
        // const { path, search } = get(tabs, `tabsMapping.${routerPath}`);
        // keepAliveProviderRef?.current.removeCache(`${path}.name.${search}`);

        // routerPath && deleteTab(routerPath);
        // fubaoHistoryPush('/gynecological-diseases/two-cancers');

        SLocal_History.closeAndPush(resolveFubaoPath(`/gynecological-diseases/two-cancers`))

      }
    }
  };
}
export default TwoCancers
