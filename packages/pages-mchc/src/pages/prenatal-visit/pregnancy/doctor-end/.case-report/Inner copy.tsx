import SelectTip from '@/components/exception/SelectTip';
import { caseType } from '@/pages/newly/report-card/caseType';
import { admissionCardList, ReporCardList, ReportCardEnum } from '@/pages/newly/report-card/constant';

import ReportCard from '@/pages/newly/report-card/report-card';
import { EventEmitter } from '@/utils/EventEmitter';
import { MyIcon, Select_L } from '@lm_fe/components';
import { request } from '@lm_fe/utils';
import { Button, Card, Col, Menu, message, Modal, Popconfirm, Row } from 'antd';
import { cloneDeep, find, findIndex, get, includes, isEmpty, map, set, } from 'lodash';
import queryString from 'query-string';
import { Component, FC } from 'react';
import './index.less';
const { SubMenu } = Menu;



class CaseReport extends Component<any, any> {
  state = {
    siderPanels: [], // 模板列表
    loading: true,
    isNew: false,
    template: '',
    IC: null, // 当前选择的模板
    selectKey: '',
    childrenNumber: { num: 0 },
    childerninfo: {
      visible: false,
      option: [],
    },
    templateOptions: [] as { Component: FC<any>, label: string, value: string }[],
    datas: {},
    openKeys: [],
  };
  async componentDidMount() {
    this.newInitData();
    this.getChildrenNumber();
    EventEmitter.subscribe('updatasiderPanels', this.updatasiderPanels.bind(this));
    this.setState({ templateOptions: this.props.caseType == caseType.admission ? admissionCardList : ReporCardList });
  }

  async getChildrenNumber() {
    if (this.props.caseType == caseType.admission || true) {
      const id = this.getpregnancyId();
      const res = await request.get<{ num: number }>('/api/ic/getNeonateNum', { params: { admissionId: id } });

      this.setState({ childrenNumber: res.data });
    }
  }
  async updatasiderPanels({ icId }: any) {
    const { id, caseType } = this.props;
    const pregnancyId = id || get(queryString.parse(window.location.search), 'id');
    const res = await request.get('/api/ic/findPersonalPage', {
      params: { [caseType]: pregnancyId, page: 0, size: 100 },
    });
    this.setState({ siderPanels: res.data });
  }
  newInitData = async () => {
    const { id, caseType } = this.props;
    const pregnancyId = id || get(queryString.parse(window.location.search), 'id');
    const res = await request.get('/api/ic/findPersonalPage', {
      params: { [caseType]: pregnancyId, page: 0, size: 100 },
    });
    this.setState({ siderPanels: res.data, loading: false });
  };
  handleAdd = () => {
    this.setState({
      isNew: true,
      template: null,
    });
  };
  handleDelete = (item) => async () => {
    await request.delete(`/api/ic/delete/${get(item, 'id')}`);
    this.newInitData();
    this.setState({
      isNew: false,
      template: null,
    });
  };
  handleClickListItem = (item: any) => {
    const template = find(this.state.templateOptions, (lItem) => get(lItem, 'value') == get(item, 'code'));

    this.setState({ template, IC: item });
  };

  selectHandleChange = async (value: string, option: { label: string, value: string, Component: FC<any> }) => {
    const { siderPanels, childrenNumber } = this.state;
    if (this.isAdmission() && get(childrenNumber, 'num') > 1) {
      const tipList = [
        ReportCardEnum.hepatitispregnantbaby,
        ReportCardEnum.hepatitisbabyfollowup,
        ReportCardEnum.syphilisbabycard,
        ReportCardEnum.aidspregnantbabycard,
        ReportCardEnum.birthdefect,
        // ReportCardEnum.pregnantdeath,
        ReportCardEnum.childrendeath,
      ];

      if (includes(tipList, value)) {
        this.setState({ childerninfo: { visible: true, option: option } });
      }
    }
    const index = findIndex(siderPanels, (item) => get(item, 'code') == value);
    if (index != -1) {
      message.error(`已存在${get(option, 'label')},不能再新增`);
      return;
    }
    const optionClone = cloneDeep(option);
    const list = [
      ReportCardEnum.hepatitispregnantbaby,
      ReportCardEnum.syphilisbabycard,
      ReportCardEnum.aidspregnantbabycard,
    ];
    if (includes(list, value)) {
      const label = get(optionClone, 'label') + `(B${1})`;
      set(optionClone, 'label', label);
    }

    if (value == 'AD_IC_BIRTH_DEFECT' || value == 'AD_IC_CHILD_DEATH' || value == 'AD_IC_MATERNAL_DEATH') {
      const id = this.getpregnancyId();
      let res = await request.get('/api/ic/import', {
        params: {
          admissionId: id,
          code: value,
        },
      });

      this.setState({
        datas: get(res.data, `adIndividualCaseCards.0`),
      });
    }
    this.setState({
      template: { ...optionClone, neonateOrder: 1, way: this.isAdmission() ? 2 : 1 },
      IC: null,
      selectKey: Math.random(),
    });
  };

  getpregnancyId() {
    const pregnancyId = this.props.id || get(queryString.parse(window.location.search), 'id');
    return pregnancyId;
  }
  isAdmission() {
    return this.props.caseType == caseType.admission;
  }
  handleModalOk() { }
  handleModalCancel() {
    this.setState({ childerninfo: { visible: false, option: [] } });
  }
  handleSelectChange = async (value: any) => {
    const { isNew, selectKey, childerninfo, childrenNumber, siderPanels } = this.state;

    const index = findIndex(
      siderPanels,
      (item: any) => item.neonateOrder == value && get(childerninfo, 'option.value') == item.code,
    );

    if (index != -1) {
      message.error('已经存在该婴儿的报卡，不能新增，请选择修改');
      return false;
    }
    const optionClone = cloneDeep(get(childerninfo, 'option'));
    const label = get(optionClone, 'label') + `(B${value})`;
    set(optionClone, 'label', label);
    this.setState({
      childerninfo: { visible: false, option: [] },
      template: { ...optionClone, neonateOrder: value, way: this.isAdmission() ? 2 : 1 },
      IC: null,
      selectKey: Math.random(),
    });
    if (
      get(childerninfo, 'option.value') == 'AD_IC_BIRTH_DEFECT' ||
      get(childerninfo, 'option.value') == 'AD_IC_CHILD_DEATH'
    ) {
      const id = this.getpregnancyId();
      let res = await request.get('/api/ic/import', {
        params: {
          admissionId: id,
          code: get(childerninfo, 'option.value'),
        },
      });
      if (this.isAdmission() && get(childrenNumber, 'num') > 1) {
        this.setState({
          datas: get(res.data, `adIndividualCaseCards.${value - 1}`),
        });
      }
    }
  };

  rendersiderPanels = () => {
    const { siderPanels, informedConsent, loading, panelsKey } = this.state;
    return (
      <Card
        loading={loading}
        size="small"
        style={{ marginTop: 12 }}
      // title="个案登记列表"
      // extra={<PlusCircleOutlined onClick={this.handleAdd} />}
      >
        {map(siderPanels, (item) => {
          return (
            <div className="sider-panel">
              <span
                className="patient-informed-consent-list__item-title"
                onClick={this.handleClickListItem.bind(this, item)}
              >
                {get(item, 'name')}
              </span>
              <Popconfirm
                title="确定要删除这个登记表么?"
                onConfirm={this.handleDelete(item)}
                okText="确定"
                cancelText="取消"
              >
                <MyIcon value='DeleteOutlined' />
              </Popconfirm>
            </div>
          );
        })}
      </Card>
    );
  };
  onOpenChange(keys: any) {
    this.setState({ openKeys: keys });
  }

  render() {
    const { isNew, selectKey, childerninfo, childrenNumber, templateOptions, openKeys, datas } = this.state;
    return (
      <Row className="patient-informed-consent">
        <Col className="patient-informed-consent-list " span={4}>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={this.onOpenChange.bind(this)}
            className="record-menu"
            expandIcon={() => {
              if (openKeys.length != 0) {
                return <span style={{ color: 'rgb(24,144,255)' }}>取消</span>;
              }
              return <MyIcon value='PlusCircleOutlined' />;
            }}
          >
            <SubMenu key="sub1" title="个案登记列表" style={{ paddingLeft: 0 }}>
              {map(templateOptions, (nurseType, key) => {
                return (
                  <Button
                    style={{ margin: 8, padding: '2.7px 4px', width: 'calc(100% - 16px)' }}
                    key={key}
                    onClick={this.selectHandleChange.bind(this, nurseType.value, nurseType)}
                  >
                    {nurseType.label}
                  </Button>
                );
              })}
            </SubMenu>
          </Menu>
          {this.rendersiderPanels()}
        </Col>
        <Col className="patient-informed-consent-detail" span={20}>
          {isEmpty(this.state.template) && !isNew ? (
            <SelectTip />
          ) : (
            <div className="patient-informed-consent-detail-block2 ">
              {/* <Row className="block2-row1">
                <Col span={12}>
                  <Form.Item label="个案模板" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Select_L
                      options={templateOptions}
                      onChange={this.selectHandleChange.bind(this)}
                      value={get(this.state, `template.value`)}
                    />
                  </Form.Item>
                </Col>
              </Row> */}
              <div className="detail-block_report-card">
                {get(this.state, 'template') && (
                  <ReportCard
                    datas={datas}
                    template={get(this.state, 'template')}
                    IC={this.state.IC}
                    pregnancyId={this.getpregnancyId()}
                    selectKey={selectKey}
                    cardType={this.props.caseType}
                    handleClickListItem={(data: any) => {
                      return this.handleClickListItem(data);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </Col>
        {get(childerninfo, 'visible') && (
          <Modal
            title="选择胎儿"
            visible={get(childerninfo, 'visible')}
            onOk={this.handleModalOk.bind(this)}
            onCancel={this.handleModalCancel.bind(this)}
          >
            <div>该孕产妇有多个胎儿，请选择胎儿</div>
            <Select_L style={{ width: '90%' }} onChange={this.handleSelectChange.bind(this)}>
              {get(childrenNumber, 'num') == 2 && (
                <>
                  <Select_L.Option value={1}>新生儿1</Select_L.Option>
                  <Select_L.Option value={2}>新生儿2</Select_L.Option>
                </>
              )}
              {get(childrenNumber, 'num') == 3 && (
                <>
                  <Select_L.Option value={1}>新生儿1</Select_L.Option>
                  <Select_L.Option value={2}>新生儿2</Select_L.Option>
                  <Select_L.Option value={3}>新生儿3</Select_L.Option>
                </>
              )}
              {get(childrenNumber, 'num') == 4 && (
                <>
                  <Select_L.Option value={1}>新生儿1</Select_L.Option>
                  <Select_L.Option value={2}>新生儿2</Select_L.Option>
                  <Select_L.Option value={3}>新生儿3</Select_L.Option>
                  <Select_L.Option value={4}>新生儿4</Select_L.Option>
                </>
              )}
            </Select_L>
          </Modal>
        )}
      </Row>
    );
  }
}

// const Comp = connect(({ dictionaries, tabs }) => ({ dictionaries, tabs }))(CaseReport as any);

export default function CaseReport_Inner(props: any) {
  return <CaseReport {...props} />
}
