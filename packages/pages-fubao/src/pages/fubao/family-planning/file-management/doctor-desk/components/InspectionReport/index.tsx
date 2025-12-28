import { LazyAntd, transferDataByDate } from '@lm_fe/components_m';
import { SelectTip } from '@lm_fe/pages';
import { Card, Col, Collapse, List, Row } from 'antd';
import { first, get, isEmpty, keys, last, map, values } from 'lodash';
import React, { Component } from 'react';

import { CalendarOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';
import { getLibExamsByOutpatientNO } from './method';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const isUnusual = (record: any) => {
  const { normalHigh, normalLow, result, limit } = record;
  if (normalHigh && normalLow) {
    return !(Number(result) <= Number(normalHigh) && Number(result) >= Number(normalLow));
  } else if (normalHigh) {
    return !(Number(result) <= Number(normalHigh));
  } else if (normalLow) {
    return !(Number(result) <= Number(normalLow));
  }
  return !(result === limit || !limit || result.replace('-', '―') === limit);
};
const tabelCellRender = (value: any, rowData: any) => {
  return <span className={isUnusual(rowData) ? 'abnormal' : ''}>{value}</span>;
};
const columns = [
  {
    title: '项目',
    dataIndex: 'itemName',
    align: 'center',
    render: tabelCellRender,
  },
  {
    title: '结果',
    dataIndex: 'result',
    align: 'center',
    render: tabelCellRender,
  },
  {
    title: '单位',
    dataIndex: 'unit',
    align: 'center',
    render: tabelCellRender,
  },
  {
    title: '参考',
    dataIndex: 'limit',
    align: 'center',
    render: tabelCellRender,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    render: (value, rowData) => {
      if (isUnusual(rowData)) {
        return <span className="abnormal">异常</span>;
      }
    },
  },
];
export default class InspectionReport extends Component {
  state = {
    loading: true,
    siderPanels: [],
    datasource: [],
    activeItem: {},
  };

  async componentDidMount() {
    const { outpatientNO } = this.props;
    // TODO: MOCK
    // const outpatientNO = '8000683303';
    const datasource = await getLibExamsByOutpatientNO(outpatientNO);
    const siderPanels = transferDataByDate(datasource as any, 'reportDate');
    const defaultActiveItem = last(first(values(siderPanels))) || {};
    this.setState({
      datasource,
      siderPanels,
      loading: false,
      activeItem: defaultActiveItem,
    });
  }

  handleClickListItem = (activeItem: any) => () => {
    this.setState({
      activeItem,
    });
  };

  renderSider = () => {
    const { siderPanels, loading, activeItem } = this.state;
    return (
      <Card size="small" bordered={false} title="检验报告列表" loading={loading}>
        <Collapse defaultActiveKey={keys(siderPanels)}>
          {map(siderPanels, (siderPanel, key) => {
            return (
              <Collapse.Panel
                key={key}
                header={
                  <>
                    <CalendarOutlined /> {key}
                  </>
                }
              >
                <List
                  size="small"
                  dataSource={siderPanel}
                  renderItem={(item) => {
                    return (
                      <List.Item
                        className={classnames('doctor-desk-inspection-sider-list__item', {
                          'doctor-desk-inspection-sider-list__item_active': activeItem.id === item.id,
                        })}
                        onClick={this.handleClickListItem(item)}
                      >
                        {get(item, 'suitName')}
                      </List.Item>
                    );
                  }}
                />
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </Card>
    );
  };

  renderContent = () => {
    const { activeItem } = this.state;

    return (
      <>
        <div className="doctor-desk-inspection-content-block-header">
          <div className="doctor-desk-inspection-content-block-header__title">
            <span>{activeItem.suitName}</span>
          </div>
          <div className="doctor-desk-inspection-content-block-header__doctor">
            <span>首阅医生:{activeItem.reportDoctorName}</span>
          </div>
          <div className="doctor-desk-inspection-content-block-header__patient">
            <div>
              <span>检验单号: {activeItem.profileId}</span>
            </div>
            <div>
              <span>送检：{activeItem.requestDate}</span>
            </div>
            <div>
              <span>姓名:{activeItem.name}</span>
            </div>
            <div>
              <span>性别：女</span>
            </div>
            <div>
              <span>年龄：{activeItem.age}</span>
            </div>
            <div>
              <span>标本部位：{activeItem.diagnosis}</span>
            </div>
          </div>
        </div>
        <Table
          size="small"
          bordered
          className="doctor-desk-inspection-content-block-table"
          columns={columns}
          dataSource={activeItem.labExamResults}
          rowKey="id"
          pagination={false}
        />
      </>
    );
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Row className="doctor-desk-inspection">
        <Col className="doctor-desk-inspection-sider" span={5}>
          {this.renderSider()}
        </Col>
        <Col className="doctor-desk-inspection-content" span={19}>
          <div className="doctor-desk-inspection-content-block" key={get(activeItem, 'id')}>
            {isEmpty(activeItem) ? <SelectTip /> : this.renderContent()}
          </div>
        </Col>
      </Row>
    );
  }
}
