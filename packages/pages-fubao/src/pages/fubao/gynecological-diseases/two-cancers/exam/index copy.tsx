import React from 'react';
import { PanelTitle, PanelWithChild } from '@lm_fe/components_m';
import BasicInfo from '../../../gynecological-diseases/two-cancers/edit';
import FollowUp from './components/FollowUp';
import CervicalCarcinoma from './components/CervicalCarcinoma';
import MammaryCancer from './components/MammaryCancer';
import InformedConsent from '../../../premarital-care/.public-exam/InformedConsent';
// import SurveyReport from './components/SurveyReport';
// import ImageReport from './components/ImageReport';
import { DoctorEnd_SurveyReport, DoctorEnd_ImageReport } from '@lm_fe/pages-mchc';

import { Space } from 'antd';
import { get, map } from 'lodash';
import { getSearchParamsValue, fubaoRequest as request } from '@lm_fe/utils';
import classnames from 'classnames';
import styles from './index.module.less';
console.log('PanelWithChild styles', PanelWithChild.styles)
const tabs = [
  {
    key: 'CervicalCarcinoma',
    title: '宫颈癌筛查',
  },
  {
    key: 'MammaryCancer',
    title: '乳腺癌筛查',
  },
  {
    key: 'SurveyReport',
    title: '检验检查',
  },
  {
    key: 'ImageReport',
    title: '影像报告',
  },
  // {
  //   key: 'InformedConsent',
  //   title: '文书管理',
  // },
  // {
  //   key: 'FollowUp',
  //   title: '宣教随访',
  // },
  {
    key: 'BasicInfo',
    title: '基本信息',
  },
  // {
  //   key: 'CaseReport',
  //   title: '全景病历',
  // },
];

export default class panel extends PanelWithChild {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
      activeKey: '',
    };
  }
  async componentDidMount() {
    const id = getSearchParamsValue('id');
    let data = id ? (await request.get(`/api/two/cancer/screening/getTwoCancerScreeningFile/page?id.equals=${id}`)).data : {};
    if (data) {
      data = get(data, 'data.pageData.0');
    }
    const activeKey = get(this.props, 'routerQuery.activeKey') || (__DEV__ ? 'MammaryCancer' : 'CervicalCarcinoma');
    this.setState({
      data,
      activeKey,
    });
  }
  renderHeader = () => {
    const { data } = this.state;

    const h = [
      { title: '姓名', value: get(data, 'name') },
      { title: '性别', value: '女' },
      { title: '年龄', value: get(data, 'age') },
      { title: '门诊号', value: get(data, 'outpatientNo') },

    ]
    return (
      <PanelTitle headerItems={h} />
    );

  };
  handleClickTab = (activeKey: any) => async () => {
    this.setState({
      activeKey,
    });
  };
  getIcon = (tab: any) => {
    const { activeKey } = this.state;
    if (activeKey === tab.key) {
      return <div className={styles["circle-icon"]}></div>;
    }
    return null;
  };
  renderTabs = () => {
    const { activeKey } = this.state;
    return (
      <div className={PanelWithChild.styles["panel-with-child-desk-tabs"]}>
        {map(tabs, (tab) => (
          <div
            key={tab.key}
            onClick={this.handleClickTab(tab.key)}
            className={classnames(PanelWithChild.styles['panel-with-child-desk-tabs-item'], {
              [PanelWithChild.styles['panel-with-child-desk-tabs-item-active']]: activeKey === tab.key,
            })}
          >
            <Space>
              {/* {this.getIcon(tab)} */}
              {tab.title}
            </Space>
          </div>
        ))}
      </div>
    );
  };
  renderContent = () => {
    const { basicInfo, system } = this.props as any;
    const id = getSearchParamsValue('id');
    const cervicalCancerScreeningId = get(this.props, 'routerQuery.cervicalCancerScreeningId');
    const breastCancerScreeningId = get(this.props, 'routerQuery.breastCancerScreeningId');
    const breastCancerXRayId = get(this.props, 'routerQuery.breastCancerXRayId');
    const { data, activeKey } = this.state;
    return (
      <div className={classnames([styles["hj-desk"], PanelWithChild.styles["panel-with-child-desk"]])}>
        {this.renderTabs()}
        <div className={PanelWithChild.styles["panel-with-child-desk-content"]}>
          {activeKey === 'CervicalCarcinoma' && (
            <CervicalCarcinoma
              id={id}
              basicInfo={basicInfo}
              basicData={data}
              system={system}
              cervicalCancerScreeningId={cervicalCancerScreeningId}
            />
          )}
          {activeKey === 'MammaryCancer' && (
            <MammaryCancer
              id={id}
              basicInfo={basicInfo}
              basicData={data}
              system={system}
              breastCancerScreeningId={breastCancerScreeningId}
              breastCancerXRayId={breastCancerXRayId}
            />
          )}
          {activeKey === 'SurveyReport' && <DoctorEnd_SurveyReport headerInfo={data as any} />}
          {activeKey === 'ImageReport' && <DoctorEnd_ImageReport headerInfo={data as any} />}
          {activeKey === 'InformedConsent' && <InformedConsent />}
          {activeKey === 'FollowUp' && <FollowUp />}
          {activeKey === 'BasicInfo' && <BasicInfo id={id} basicInfo={basicInfo} basicData={data} />}
        </div>
      </div>
    );
  };
}
