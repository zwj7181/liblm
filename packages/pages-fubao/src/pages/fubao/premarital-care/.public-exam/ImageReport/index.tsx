// import aImg from '@/assets/imgs/images/a.jpg';
// import bImg from '@/assets/imgs/images/b.png';
import { LazyAntd } from '@lm_fe/components';
import { Button, Col, Input, Modal, Row } from 'antd';
import React, { Component } from 'react';
import './index.less';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

export default class Index extends Component {
  state = {
    isShowModal: false,
    modalTitle: '',
    tableData: [],
    pdfPath: '',
    btnsData: ['无脑儿', '脑积水', '侧脑室扩张', '十二指肠闭锁', '多囊肾', '唇裂'],
    isShowSearchPdf: false,
  };

  async componentDidMount() {

  }

  handleBtnClick = (text: any, record: any, type: number) => {
    this.setState({ isShowModal: true });
    if (type === 1) {
      this.setState({ pdfPath: record.url, modalTitle: '影像报告' });
    } else {
      this.setState({ modalTitle: '超声图片' });
    }
  };

  columns = () => [
    { title: '标题', dataIndex: 'title', width: 100 },
    {
      title: '检查日期',
      dataIndex: 'reportDate',
      width: 100,
      render: (text: any, record: any) => text && text.substr(0, 10),
    },
    { title: '报告医生', dataIndex: 'reportDoctorName', width: 100 },
    { title: '诊断', dataIndex: 'diagnosis', width: 100 },
    { title: '结论', dataIndex: 'result', width: 200 },
    {
      title: '查看报告',
      dataIndex: 'operation',
      align: 'center',
      width: 100,
      render: (text: any, record: any) => (
        <>
          <Button style={{ marginRight: '10px' }} type="primary" onClick={() => this.handleBtnClick(text, record, 1)}>
            查看报告
          </Button>
          {/* <Button type="primary" onClick={() => this.handleBtnClick(text, record, 2)}>
            查看影像
          </Button> */}
        </>
      ),
    },
  ];

  handleSearch = () => {
    this.setState({
      isShowSearchPdf: true,
    });
  };

  handleCancel = () => {
    this.setState({
      isShowModal: false,
      pdfPath: '',
      isShowSearchPdf: false,
    });
  };

  renderModal() {
    const { isShowModal, modalTitle, pdfPath, isShowSearchPdf, btnsData } = this.state;

    return (
      <Modal
        centered
        width="1200px"
        footer={null}
        visible={isShowModal}
        title={modalTitle}
        onCancel={this.handleCancel}
        className="prenatal-visit-main_image-modal"
      >
        {modalTitle === '影像报告' ? (
          <object key={pdfPath} data={pdfPath} type="application/pdf" width="100%" height="100%" />
        ) : (
          <Row className="image-modal-content">
            <Col span={isShowSearchPdf ? 10 : 20}>
              {/* <object data={aImg} type="application/pdf" width="100%" /> */}
            </Col>

            {isShowSearchPdf && (
              <Col span={10}>
                {/* <object data={bImg} type="application/pdf" width="100%" /> */}
              </Col>
            )}

            <Col span={4} className="image-search">
              <Input.Search placeholder="请输入相关诊断" enterButton="搜索" onClick={this.handleSearch} />
              <p className="image-msg">点击下方关键词打开影像对比</p>
              {btnsData.map((item: any) => (
                <Button className="image-btn" onClick={this.handleSearch}>
                  {item}
                </Button>
              ))}
            </Col>
          </Row>
        )}
      </Modal>
    );
  }

  render() {
    const { tableData } = this.state;
    return (
      <div className="prenatal-visit-main_image">
        <Table
          size="small"
          className="prenatal-visit-main-table"
          columns={this.columns()}
          dataSource={tableData}
          pagination={false}
        />
        {this.renderModal()}
      </div>
    );
  }
}
