import React, { Component } from 'react';
import { Input, Button, Modal, Tabs, Layout } from 'antd';
const { Sider, Content } = Layout;
import { map, join, get, concat } from 'lodash';
import TemplateTree from '../../../../others/TemplateTree';
import styles from './index.module.less';
import { ITextareaWithTemplateProp } from './types';
// import templateIcon from '@/assets/imgs/template-icon.png';

class TextareaWithTemplate extends Component<ITextareaWithTemplateProp, {}> {
  myRef: any = React.createRef();
  state = {
    isShowModal: false,
    activeTabKey: '1',
    departmentTemp: [],
    personalTemp: [],
    proposalTemp: [],
  };
  componentDidMount() {
    const { setMyRef } = this.props;
    setMyRef(this.myRef);
  }

  handleClickBtn = () => {
    this.setState({ isShowModal: true });
  };

  handleTabChange = (key: string) => {
    this.setState({ activeTabKey: key });
  };

  handleCancel = () => {
    this.setState({ isShowModal: false });
  };

  handleOK = () => {
    const { value, onChange } = this.props;
    const { activeTabKey, departmentTemp, personalTemp, proposalTemp } = this.state;
    let items, items2;
    if (activeTabKey === '1') {
      items = departmentTemp.filter(
        (i: any) => (i.checked && i.pid !== 0) || (i.checked && i.pid === 0 && i.children.length === 0),
      );
    } else {
      items = personalTemp.filter(
        (i: any) => (i.checked && i.pid !== 0) || (i.checked && i.pid === 0 && i.children.length === 0),
      );
    }
    items2 = proposalTemp.filter(
      (i: any) => (i.checked && i.pid !== 0) || (i.checked && i.pid === 0 && i.children.length === 0),
    );
    const itemsSum = concat(items, items2);
    items = join(
      map(itemsSum, (item) => item.val),
      '；',
    );
    const newValue = value || '';
    onChange(`${newValue}${newValue ? '；' : ''}${items}`);
    this.setState({ isShowModal: false });
  };

  handleTextareaChange = (e: any) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  getTemplateData = (data: any) => {
    const { activeTabKey } = this.state;
    if (activeTabKey === '1') {
      this.setState({ departmentTemp: data });
    } else {
      this.setState({ personalTemp: data });
    }
  };
  getproposalTemp = (data: any) => {
    this.setState({ proposalTemp: data });
  };
  handleFocus() {
    const { onFocus } = this.props;
    onFocus && onFocus('focus', null);
  }
  handleBlur() {
    const { onBlur } = this.props;
    onBlur && onBlur('blur', null);
  }

  renderModal() {
    const { activeTabKey, isShowModal } = this.state;
    const { basicInfo, input_props = {}, headerInfo, name } = this.props;
    const { title, departmentTempalteType, personalTempalteTType, departmentId } = input_props;
    const pregnancyid = this.props.id || get(headerInfo, `id`);
    return (
      <Modal
        closable
        centered
        className={styles["temp-modal"]}
        title={title}
        visible={isShowModal}
        width={1000}
        onCancel={this.handleCancel}
        onOk={this.handleOK}
      >
        <Layout style={{ background: '#fff' }}>
          {get(input_props, `showAdvise`) && (
            <Sider
              width={400}
              style={{ borderRight: '1px solid #ccc', paddingRight: '10px', overflow: 'auto', maxHeight: '520px' }}
            >
              <div className={styles["title"]}>处理建议..</div>
              <TemplateTree
                type={10}
                pregnancyid={pregnancyid}
                depid={departmentId}
                checkable={true}
                onChecked={this.getproposalTemp}
                divide={false}
                editable={false}
              />
            </Sider>
          )}

          <Content>
            <Tabs defaultActiveKey={activeTabKey} onChange={this.handleTabChange}>
              <Tabs.TabPane tab={<Button className={styles["list-btn"]}>科室模板</Button>} key="1">
                <TemplateTree
                  type={departmentTempalteType}
                  depid={departmentId}
                  checkable={true}
                  onChecked={this.getTemplateData}
                  divide={true}
                  editable={true}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Button className={styles["list-btn"]}>个人模板</Button>} key="2">
                <TemplateTree
                  type={personalTempalteTType}
                  userid={get(basicInfo, 'id')}
                  checkable={true}
                  onChecked={this.getTemplateData}
                  divide={true}
                  editable={true}
                />
              </Tabs.TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Modal>
    );
  }

  render() {
    const { value, input_props = {}, disabled } = this.props;
    const { minRows = 2, maxRows = 5 } = input_props;

    return (
      <div className={styles["template-wrapper"]}>
        <Input.TextArea
          disabled={disabled}
          className={styles["template-texarea"]}
          value={value}
          autoSize={{ minRows, maxRows }}
          onChange={this.handleTextareaChange}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          ref={this.myRef}
        />
        <div className={styles["template-action"]} onClick={this.handleClickBtn}>
          {/* <img src={templateIcon} style={{ width: '12px', height: '12px' }} /> */}
          模
        </div>
        {this.renderModal()}
      </div>
    );
  }
}
export default TextareaWithTemplate
