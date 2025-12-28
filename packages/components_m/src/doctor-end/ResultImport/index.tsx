import { api } from '@/pages/prenatal-visit/pregnancy/doctor-end/api';
import { Button, Modal, Tabs } from 'antd';
import { forEach, get, isEmpty } from 'lodash';
import { Component } from 'react';
import './index.less';

import { LazyAntd } from '@lm_fe/components';

const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

export default class Index extends Component {
  state = {
    activeTabKey: '1',
    examResult: [],
    defaultExpandedKey: '',
    checkedItems: [],
  };

  async componentDidMount() {
    const { pregnancyData } = this.props;
    const examResult = await api.components.getLabExamImportTree(get(pregnancyData, 'id'));

    this.setState({
      examResult,
      defaultExpandedKey: String(get(examResult, '0.id')),
    });
  }

  handleCancel = () => {
    const { closeModal } = this.props;
    closeModal('isShowResultImport');
  };

  handleTabChange = async (key: string) => {
    const { pregnancyData } = this.props;
    let examResult: any = [];
    if (key === '1') {
      examResult = await api.components.getLabExamImportTree(get(pregnancyData, 'id'));
    } else {
      examResult = await api.components.getImageExamImportTree(get(pregnancyData, 'id'));
    }
    this.setState({
      activeTabKey: key,
      examResult,
      defaultExpandedKey: String(get(examResult, '0.id')),
    });
  };

  handleOk = () => {
    const { checkedItems } = this.state;
    const { closeModal } = this.props;

    let nodeStr = '';
    if (checkedItems.length > 0) {
      forEach(checkedItems, (item) => {
        nodeStr += item + '，';
      });
    }

    nodeStr = nodeStr.substr(0, nodeStr.length - 1);
    closeModal('isShowResultImport', nodeStr, 'inspection');
  };
  // checkedKeys, e:{checked: bool, checkedNodes, node, event, halfCheckedKeys}
  handleCheck = (keys: any, { checkedNodes }) => {
    console.log({ checkedNodes });
    const checkedItems: any[] = [];
    forEach(checkedNodes, (item) => {
      checkedItems.push(item.title);
    });
    this.setState({ checkedItems });
  };

  transferTemplateData = (data: any, pid = 0) => {
    const treeData: any = [];
    const unusualArr = ['↑', '↓'];
    forEach(data, (item) => {
      if (item.pid === pid) {
        item.key = String(item.id);
        item.className = item.unusual === '1' && 'unusual-item';
        item.title = unusualArr.includes(item.unusualDesc) ? `${item.title} ${item.unusualDesc}` : item.title;
        item.children = this.transferTemplateData(item.items, item.id);
        if (isEmpty(item.children)) {
          item.isLeaf = true;
        } else {
          item.isLeaf = false;
        }
        treeData.push(item);
      }
    });
    return treeData;
  };

  render() {
    const { examResult, defaultExpandedKey, activeTabKey } = this.state;
    const { isShowResultImport, importTitle } = this.props;
    const treeData = this.transferTemplateData(examResult);

    return (
      <Modal
        className="result-import-modal"
        title={importTitle}
        visible={isShowResultImport}
        width={900}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <Tabs defaultActiveKey={activeTabKey} onChange={this.handleTabChange}>
          <Tabs.TabPane tab={<Button className="list-btn">检验结果</Button>} key="1">
            {!isEmpty(examResult) && activeTabKey === '1' ? (
              <Tree
                checkable
                defaultExpandedKeys={[defaultExpandedKey]}
                onCheck={this.handleCheck}
                treeData={treeData}
              />
            ) : (
              '暂无数据~'
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Button className="list-btn">超声结果</Button>} key="2">
            {!isEmpty(examResult) && activeTabKey === '2' ? (
              <Tree
                checkable
                defaultExpandedKeys={[defaultExpandedKey]}
                onCheck={this.handleCheck}
                treeData={treeData}
              />
            ) : (
              '暂无数据~'
            )}
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}
