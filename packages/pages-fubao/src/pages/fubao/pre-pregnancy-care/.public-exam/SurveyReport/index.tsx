import { CalendarOutlined } from '@ant-design/icons';
import { getLabExamGroup, getOutReportFileBase64, LazyAntd, saveFirstReader } from '@lm_fe/components_m';
import { formatDate as formatTimeToDate, getSearchParamsValue } from '@lm_fe/utils';
import { Collapse } from 'antd';
import { get, includes, map, size } from 'lodash';
import React, { Component } from 'react';
import './index.less';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const tableColumns = [
  { title: '检验项目', dataIndex: 'itemName', key: 'itemName' },
  { title: '结果', dataIndex: 'result', key: 'result' },
  { title: '单位', dataIndex: 'unit', key: 'unit' },
  { title: '参考值', dataIndex: 'limit', key: 'limit' },
  { title: '状态', dataIndex: 'status', key: 'status' },
];
export default class Index extends Component {
  state = {
    reportList: [],
    detailData: {},
    reportFile: null,
  };

  componentDidMount() {
    // this.getLabExamGroup();
  }

  getLabExamGroup = async () => {
    const { pregnancyData, type = 1 } = this.props;
    const pregnancyId = get(pregnancyData, 'id') || getSearchParamsValue('id');
    const list = await getLabExamGroup(pregnancyId, type);
    this.setState({ reportList: list });
  };

  handleItemClick = async (item: any) => {
    if (!item.firstReader) {
      await saveFirstReader(item);
      this.getLabExamGroup();
    }
    if (item.labExamTypeEnum === 'outer') {
      const reportFile = await getOutReportFileBase64(item.path);
      await this.setState({
        reportFile: `data:application/pdf;base64, ${reportFile}`,
        detailData: item,
      });
    } else {
      await this.setState({ reportFile: null, detailData: item });
    }
  };

  setClassName = (record: any, index: any) => {
    if (includes([1, 2, 3], record.state)) {
      return 'abnormalValue';
    }
    return '';
  };

  renderLeft() {
    const { reportList } = this.state;
    return (
      <div className="survey-left">
        <div className="left-title">检验报告列表</div>
        {size(reportList) > 0 ? (
          <Collapse defaultActiveKey={['0']} expandIcon={() => <CalendarOutlined />}>
            {map(reportList, (item: any) => (
              <Collapse.Panel
                header={
                  !item.reportGestationalWeek
                    ? formatTimeToDate(item.reportDate)
                    : `${formatTimeToDate(item.reportDate)}  (孕周：${item.reportGestationalWeek})`
                }
                key={item.id}
              >
                {map(item.data, (subItem) => (
                  <div className="left-item" onClick={() => this.handleItemClick(subItem)}>
                    {!subItem.firstReader ? <span className="left-item-state">新</span> : null}
                    <p className="left-item-title" title={subItem.reportName}>
                      {subItem.reportName}
                    </p>
                    {subItem.labExamTypeEnum === 'outer' ? <span className="left-item-lable">外院</span> : null}
                  </div>
                ))}
              </Collapse.Panel>
            ))}
          </Collapse>
        ) : (
          <div className="no-data">
            <p className="no-data-title">暂无数据</p>
          </div>
        )}
      </div>
    );
  }

  renderRight() {
    const { detailData, reportFile } = this.state;
    return (
      <div className="survey-right">
        <div className="right-top">
          <p className="right-title">
            <span className="right-words">{get(detailData, 'reportName') || ''} 检验报告单</span>
          </p>
          <div className="right-doctor">首阅医生：{get(detailData, 'firstReader') || ''}</div>
        </div>
        <ul className="right-msg">
          <li className="msg-item">检验单号: {get(detailData, 'reportNo') || ''}</li>
          <li className="msg-item">送检: {get(detailData, 'reportDoctorName') || ''}</li>
          <li className="msg-item">姓名: {get(detailData, 'name') || ''}</li>
          <li className="msg-item">性别: {get(detailData, 'sex') || ''}</li>
          <li className="msg-item">年龄: {get(detailData, 'age') || ''}</li>
          <li className="msg-item">标本部位: {get(detailData, 'specimen') || ''}</li>
          <li className="msg-item">报告日期: {formatTimeToDate(get(detailData, 'reportDate')) || ''}</li>
          <li className="msg-item">送检日期: {formatTimeToDate(get(detailData, 'requestDate')) || ''}</li>
        </ul>
        <div>
          {reportFile ? (
            <div className="right-pdf">
              <img alt="report" src={reportFile} />
            </div>
          ) : (
            <Table
              className="prenatal-visit-main-table right-table"
              columns={tableColumns}
              dataSource={get(detailData, 'labExamResults') || []}
              pagination={false}
              rowClassName={(record, index) => this.setClassName(record, index)}
            />
          )}
        </div>
      </div>
    );
  }

  onExit = () => {
    this.setState({ stepsEnabled: false });
  };

  render() {
    return (
      <div className="prenatal-visit-main_survey">
        <div className="survey-left-wrapper">{this.renderLeft()}</div>
        <div className="survey-right-wrapper">{this.renderRight()}</div>
      </div>
    );
  }
}
