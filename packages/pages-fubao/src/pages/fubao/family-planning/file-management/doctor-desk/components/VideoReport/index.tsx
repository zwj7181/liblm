import { ModalIframeView } from '@/components/PDFPreview';
import { LazyAntd } from '@lm_fe/components';
import React, { Component } from 'react';
import './index.less';
import { getImageExamsByOutpatientNO } from './method';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd


const columns = [
  { title: '标题', dataIndex: 'title', align: 'center', width: 250 },
  {
    title: '报告日期',
    dataIndex: 'reportDate',
    align: 'center',
    width: 100,
    render: (text: string) => text.substring(0, 10),
  },
  { title: '报告医生', dataIndex: 'reportDoctorName', align: 'center', width: 80 },
  { title: '超声描述', dataIndex: 'result', align: 'center', width: 250 },
  { title: '超声提示', dataIndex: 'diagnosis', align: 'center', width: 100 },
  {
    title: '查看报告',
    key: 'openPDF',
    align: 'center',
    width: 80,
    render: (_text: any, record: any) => (
      <ModalIframeView
        file={`http://168.168.250.31:8899/Obcloud/mule/getPacsPDF?docUniqueid=${record.sampleNO}&docType=XDS.UR2.USBG`}
      >
        查看报告
      </ModalIframeView>
    ),
  },
];
export default class InspectionReport extends Component {
  state = {
    loading: true,
    datasource: [],
  };

  async componentDidMount() {
    const { outpatientNO } = this.props;
    // TODO: MOCK
    // const outpatientNO = '8000683303';
    const datasource = await getImageExamsByOutpatientNO(outpatientNO);
    this.setState({
      datasource,
      loading: false,
    });
  }

  render() {
    const { loading, datasource } = this.state;

    return (
      <div className="doctor-desk-video-report">
        <Table
          loading={loading}
          size="small"
          bordered
          className="doctor-desk-video-report-table"
          columns={columns}
          dataSource={datasource}
          rowKey="id"
          pagination={false}
        />
      </div>
    );
  }
}
