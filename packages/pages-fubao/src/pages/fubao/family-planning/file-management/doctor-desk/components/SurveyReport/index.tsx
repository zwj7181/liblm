import { CalendarOutlined } from '@ant-design/icons';
import { LazyAntd } from '@lm_fe/components';
import { SMchc_Admission } from '@lm_fe/service';
import { formatDate as formatTimeToDate, fubaoRequest as request } from '@lm_fe/utils';
import { Badge, Collapse } from 'antd';
import { get, includes, map, size } from 'lodash';
import React, { Component } from 'react';
import ExaminationItemCurve from './components/ExaminationItemCurve';
import './index.less';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

// const tableColumns = [
//   { title: '检验项目', dataIndex: 'itemName', key: 'itemName' },
//   { title: '结果', dataIndex: 'result', key: 'result' },
//   { title: '单位', dataIndex: 'unit', key: 'unit' },
//   { title: '参考值', dataIndex: 'limit', key: 'limit' },
//   { title: '状态', dataIndex: 'status', key: 'status' },
// ];
export default class Index extends Component {
  state = {
    reportList: [],
    detailData: {},
    reportFile: null,
    isShowCurve: false,
    itemName: '',
  };

  tableColumns = [
    { title: '检验项目', dataIndex: 'itemName', key: 'itemName' },
    { title: '结果', dataIndex: 'result', key: 'result' },
    { title: '单位', dataIndex: 'unit', key: 'unit' },
    { title: '参考值', dataIndex: 'limit', key: 'limit' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    {
      title: '曲线',
      render: (record: any) => (
        <div className="curve-words" onClick={() => this.openIndexCurve(record)}>
          曲线
        </div>
      ),
    },
  ];

  componentDidMount() {
    //this.getLabExamGroup();
  }

  openIndexCurve = (record: any) => {
    this.setState({
      itemName: record.itemName,
      isShowCurve: true,
    });
  };

  getLabExamGroup = async () => {
    const { headerInfoOfInpatientData } = this.props as any;
    const inpatientNO = get(headerInfoOfInpatientData, 'inpatientNO');
    const idNO = get(headerInfoOfInpatientData, 'idNO');
    const outpatientNO = get(headerInfoOfInpatientData, 'outpatientNO') || get(headerInfoOfInpatientData, 'outpatientNo');
    let list = {} as any;

    list = await SMchc_Admission.listPatientLabExamReport({
      params: { inpatientNO, outpatientNO, idNO },
      //  baseURL: '/fb'
    })

    // const { pregnancyData, type = 1 } = this.props;
    // const pregnancyId = get(pregnancyData, 'id') || get(getUrlQuery(), 'id');
    // const list = await api.survey.getLabExamGroup(pregnancyId, type);
    this.setState({ reportList: list });
  };

  handleItemClick = async (item: any) => {
    const { id, type } = item;
    const detailData = await request.get(`/api/getLabExamReport?id=${id}&type=${type}`);
    // if (!item.firstReader) {
    //   await api.survey.saveFirstReader(item);
    //   this.getLabExamGroup();
    // }
    if (type === 2) {
      //const reportFile = await api.survey.getOutReportFileBase64(item.path);
      await this.setState({
        reportFile: `data:application/pdf;base64, ${get(detailData, 'imgBase64')}`,
        detailData: detailData,
      });
    } else {
      await this.setState({ reportFile: null, detailData: detailData });
    }
    this.getLabExamGroup();
  };

  setClassName = (record: any, index: any) => {
    if (includes([1, 2, 3], record.state)) {
      return 'abnormalValue';
    }
    return '';
  };

  closeModal = () => {
    this.setState({
      isShowCurve: false,
    });
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
                  !item.gesWeek ? (
                    <>
                      {formatTimeToDate(item.date)}
                      <div style={{ position: 'absolute', right: 6, top: 6 }}>
                        <Badge
                          count={item.unread ? item.unread : item.total}
                          style={!item.unread ? { backgroundColor: 'green' } : {}}
                        ></Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      `${formatTimeToDate(item.date)} (孕周：${item.gesWeek})`
                      <div style={{ position: 'absolute', right: 6, top: 6 }}>
                        <Badge
                          count={item.unread ? item.unread : item.total}
                          style={!item.unread ? { backgroundColor: 'green' } : {}}
                        ></Badge>
                      </div>
                    </>
                  )
                }
                key={item.id}
              >
                {map(item.examReport, (subItem) => (
                  <div className="left-item" onClick={() => this.handleItemClick(subItem)}>
                    {subItem.unread ? <span className="left-item-state">新</span> : null}
                    <p
                      className="left-item-title"
                      title={subItem.title}
                      style={!subItem.normal ? { color: 'red' } : {}}
                    >
                      {subItem.title}
                    </p>
                    {subItem.type === 2 ? <span className="left-item-lable">外院</span> : null}
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
          <div className="right-doctor">首阅医生：{get(detailData, 'firstReadDoctor') || ''}</div>
        </div>
        <ul className="right-msg">
          <li className="msg-item">检验单号: {get(detailData, 'examNo') || ''}</li>
          <li className="msg-item">送检: {get(detailData, 'requestDoctor') || ''}</li>
          <li className="msg-item">姓名: {get(detailData, 'patientName') || ''}</li>
          <li className="msg-item">性别: {get(detailData, 'patientGender') || ''}</li>
          <li className="msg-item">年龄: {get(detailData, 'patientAge') || ''}</li>
          <li className="msg-item">标本部位: {get(detailData, 'samplePart') || ''}</li>
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
              columns={this.tableColumns}
              dataSource={get(detailData, 'examItems') || []}
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
    const { isShowCurve, itemName } = this.state;
    const { pregnancyData } = this.props;
    return (
      <div className="prenatal-visit-main_survey">
        <div className="survey-left-wrapper">{this.renderLeft()}</div>
        <div className="survey-right-wrapper">{this.renderRight()}</div>
        {isShowCurve && (
          <ExaminationItemCurve
            isShowCurve={isShowCurve}
            itemName={itemName}
            onClose={this.closeModal}
            pregnancyData={pregnancyData}
          />
        )}
      </div>
    );
  }
}
