import { getFormData, MyForm } from '@lm_fe/components_m';
import { Button, message, Modal, Tabs } from 'antd';
import { cloneDeep, get, set, size } from 'lodash';
import React, { Component } from 'react';
import {
  bmiConfig,
  fetalOption,
  gdmConfig,
  multipletsConfig,
  slowGrowingConfig,
  twinsConfig,
} from './config';
import styles from './index.module.less';
import { getPregnancyCaseOfOutpatient, updatePregnancyCaseOfOutpatient } from './request';
interface IProps {
  [key: string]: any;
}
interface IState {
  [key: string]: any;
}
export default class DoctorEnd_ExemplaryCase extends Component<IProps, IState> {
  state = {
    activeKey: this.props.tabkey,
    gdmData: [],
    bmiData: [],
    formHandlerObj: {},
    formValue: {},
    formConfig: {
      4: cloneDeep(twinsConfig),
      5: cloneDeep(multipletsConfig),
    },
  };
  componentDidMount() {
    const { activeKey, formHandlerObj } = this.state;
    this.initData(activeKey);
  }
  componentDidUpdate() {
    const { activeKey, formHandlerObj, formValue } = this.state;
    const formHandler = get(formHandlerObj, `5`);

    if (formHandler && formHandler.subscribe) {
      formHandler.subscribe('fetalCount', 'change', (val: any) => {
        const fetalCont = formHandler.fetalCount.actions.getValue().value;
        this.changeConfig(fetalCont);
        const newvalue = cloneDeep(get(this.state.formValue, `5`));
        set(newvalue, `fetalCount`, fetalCont);
        this.setState({ formValue: { ...this.state.formValue, 5: newvalue } });
      });
    }
  }
  getId() {
    const { headerInfo, id } = this.props;
    return get(headerInfo, 'id') || id;
  }
  async initData(key: string) {
    const { headerInfo } = this.props;
    const { formValue } = this.state;
    let value;
    if (['4', '5'].includes(key) && !get(formValue, `${key}`)) {
      value = await getPregnancyCaseOfOutpatient(this.getId());
      this.changeConfig(get(value, `fetalCount`));
      this.setState({ formValue: { ...formValue, [key]: value } });
    }
  }

  getActiveKey() {
    const { isShowMultiplets, isShowTwins, isShowBmi, isShowSlowGrowing, isShowGdm } = this.props;
    let activeKey = '1';
    if (isShowMultiplets) activeKey = '5';
    if (isShowTwins) activeKey = '4';
    if (isShowBmi) activeKey = '3';
    if (isShowSlowGrowing) activeKey = '2';
    if (isShowGdm) activeKey = '1';
    return activeKey;
  }

  handleClose = () => {
    const { onClose } = this.props as any;
    onClose();
  };

  handleSure = async () => {
    const { onClose } = this.props as any;
    const { formHandlerObj, activeKey } = this.state;
    const formHandler = get(formHandlerObj, `${activeKey}`);
    const { validCode, res } = await formHandler.submit();
    if (validCode) {
      this.updataMethods(res);
    } else {
      message.destroy();
      message.error('请完善表单项！');
    }
    onClose();
  };
  async updataMethods(res: any) {
    const { activeKey, formValue } = this.state;
    const newData = getFormData(res);
    if (['4', '5'].includes(activeKey)) {
      const postData = {
        ...newData,
        ...newData.reduction,
        ...newData.stillbornFoetus,
        fetalCount: activeKey == 4 ? '二胎' : newData.fetalCount,
        id: get(formValue, `${activeKey}.id`),
      };
      // console.log({ newData, res, postData, formValue });
      await updatePregnancyCaseOfOutpatient(postData);
    }
  }

  handlePrint = () => {
    const { onClose } = this.props as any;
    onClose();
  };

  tabsOnChange(key: string) {
    this.initData(key);
    this.setState({ activeKey: key });
  }

  changeConfig(fetalCount?: string) {
    const { formHandlerObj, activeKey, formConfig } = this.state;
    let newConfig;
    if (activeKey == '4') {
      fetalCount = '二胎';
      newConfig = cloneDeep(formConfig['4']);
    } else {
      newConfig = cloneDeep(formConfig['5']);
    }
    const options =
      (fetalCount ? get(fetalOption, `${fetalCount}`) : get(fetalOption, `六胎`)) || get(fetalOption, `六胎`);
    set(newConfig, `[${size(newConfig) - 1}].input_props.tableColumns[2].editor.input_props.options`, options);
    this.setState({
      formConfig: {
        ...formConfig,
        [activeKey]: newConfig,
      },
    });
  }

  render() {
    const { isShowGdm, isShowBmi, isShowSlowGrowing, isShowTwins, isShowMultiplets } = this.props;
    const { activeKey, gdmData, bmiData, formHandlerObj, formValue, formConfig } = this.state;
    const footer = [
      <>
        <Button type="primary" onClick={this.handleSure}>
          确定
        </Button>
        {/* <Button onClick={this.handlePrint}>打印</Button> */}
      </>,
    ];

    return (
      <Modal
        width={1400}
        visible={true}
        footer={footer}
        onCancel={this.handleClose}
        className={styles['exemplary-case-container']}
      >
        <Tabs onChange={this.tabsOnChange.bind(this)} activeKey={activeKey}>
          {isShowGdm && (
            <Tabs.TabPane tab="GDM专案" key="1">
              <MyForm
                config={gdmConfig}
                value={gdmData}
                getFormHandler={(formHandler: any) =>
                  this.setState({ formHandlerObj: { ...formHandlerObj, 1: formHandler } })
                }
                submitChange={false}
              />
            </Tabs.TabPane>
          )}
          {isShowSlowGrowing && (
            <Tabs.TabPane tab="胎儿生长缓慢专案" key="2">
              <MyForm
                config={slowGrowingConfig}
                value={gdmData}
                getFormHandler={(formHandler: any) =>
                  this.setState({ formHandlerObj: { ...formHandlerObj, 2: formHandler } })
                }
                submitChange={false}
              />
            </Tabs.TabPane>
          )}
          {isShowBmi && (
            <Tabs.TabPane tab="BMI高危专案" key="3">
              <MyForm
                config={bmiConfig}
                value={bmiData}
                getFormHandler={(formHandler: any) =>
                  this.setState({ formHandlerObj: { ...formHandlerObj, 3: formHandler } })
                }
                submitChange={false}
              />
            </Tabs.TabPane>
          )}
          {isShowTwins && (
            <Tabs.TabPane tab="双胎专案" key="4">
              <MyForm
                config={get(formConfig, `4`)}
                value={get(formValue, `${4}`)}
                getFormHandler={(formHandler: any) =>
                  this.setState({ formHandlerObj: { ...formHandlerObj, 4: formHandler } })
                }
                submitChange={false}
              />
            </Tabs.TabPane>
          )}
          {isShowMultiplets && (
            <Tabs.TabPane tab={`${get(this.props, `headerInfo.pregnancyCaseLable`) || '多胎'}专案`} key="5">
              <MyForm
                config={get(formConfig, `5`)}
                value={get(formValue, `${5}`)}
                getFormHandler={(formHandler: any) =>
                  this.setState({ formHandlerObj: { ...formHandlerObj, 5: formHandler } })
                }
                submitChange={false}
              />
            </Tabs.TabPane>
          )}
        </Tabs>
      </Modal>
    );
  }
}
