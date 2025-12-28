import React, { Component } from 'react';
import { Button, Modal, Tabs } from 'antd';
import { map, join, get } from 'lodash';
import DoctorEnd_TemplateTree from '../TemplateTree';
import './index.less';
interface IndexProps {
  closeModal: Function;
  isShowTemplate: boolean;
  basicInfo: any;
}
interface IndexState {
  activeTabKey: any;
  departmentTemp: any;
  personalTemp: any;
}
export default class Index extends Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTabKey: '1',
      departmentTemp: [],
      personalTemp: [],
    };
  }

  handleCancel = () => {
    const { closeModal } = this.props;
    closeModal('isShowCCTemplate', '', 'chiefComplaint');
  };

  handleOK = () => {
    const { activeTabKey, departmentTemp, personalTemp } = this.state;
    const { closeModal } = this.props;
    let items;
    if (activeTabKey === '1') {
      items = departmentTemp.filter(
        (i: any) => (i.checked && i.pid !== 0) || (i.checked && i.pid === 0 && i.children.length === 0),
      );
    } else {
      items = personalTemp.filter(
        (i: any) => (i.checked && i.pid !== 0) || (i.checked && i.pid === 0 && i.children.length === 0),
      );
    }
    items = join(
      map(items, (item) => item.val),
      '；',
    );
    closeModal('isShowCCTemplate', items, 'chiefComplaint');
  };

  handleTabChange = (key: string) => {
    this.setState({ activeTabKey: key });
  };

  getTemplateData = (data: any) => {
    const { activeTabKey } = this.state;
    if (activeTabKey === '1') {
      this.setState({ departmentTemp: data });
    } else {
      this.setState({ personalTemp: data });
    }
  };

  render() {
    const { activeTabKey } = this.state;
    const { isShowTemplate, basicInfo } = this.props;

    return (
      <Modal
        className="temp-modal"
        title="主诉模板"
        closable
        visible={isShowTemplate}
        width={1100}
        onCancel={this.handleCancel}
        onOk={this.handleOK}
      >
        <Tabs defaultActiveKey={activeTabKey} onChange={this.handleTabChange}>
          <Tabs.TabPane tab={<Button className="list-btn">科室模板</Button>} key="1">
            <DoctorEnd_TemplateTree
              type={16}
              depid={2}
              checkable={true}
              onChecked={this.getTemplateData}
              divide={true}
              editable={true}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Button className="list-btn">个人模板</Button>} key="2">
            <DoctorEnd_TemplateTree
              type={17}
              userid={get(basicInfo, 'id')}
              checkable={true}
              onChecked={this.getTemplateData}
              divide={true}
              editable={true}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}
