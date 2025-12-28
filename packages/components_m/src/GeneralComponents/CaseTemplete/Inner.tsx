import { MyIcon } from '@lm_fe/components';
import { APP_CONFIG, ds, mchcMacro } from '@lm_fe/env';
import { sleep } from '@lm_fe/utils';
import { Button } from 'antd';
import { get } from 'lodash';
import React, { Component } from 'react';
import store from 'store';
import { defaultToolbars } from './config';
import './index.less';
interface IProps {
  onSave: any;
  content?: any;
  containerProps?: any;
  toolbars?: any;
  mode?: 'DESIGN' | 'EDITOR' | 'STRICT' | 'READONLY';
  hiddenButton?: boolean;
  sdeKey?: any;
  hidentoolbars?: boolean;
}
// mode
// 1. DESIGN 设计模式；
// 2. EDITOR 编辑模式；
// 3. STRICT 严格模式（表单模式）；
// 4. READONLY 只读模式；可以把整个表格的内容修改了
let loaded = false
export default class CaseTempleteEdit extends Component<IProps> {
  editRef: any;
  async load_and_init() {
    if (!loaded) {
      const pp = mchcMacro.PUBLIC_PATH
      await ds([
        `${pp}lib/sde.config.js`,
        `${pp}lib/ueditor/ueditor.all.min.js`,
        `${pp}lib/ueditor/lang/zh-cn/zh-cn.js`,
        `${pp}lib/ueditor/themes/default/css/ueditor.css`,
        `${pp}lib/sde/sde-ie8-design.js`,
      ])
      loaded = true
      await sleep(1000)
    }
    this.initSDE()
  }
  componentDidMount() {
    window.apiToken = store.get(APP_CONFIG.TOKEN);
    this.load_and_init()
    // this.initSDE();
  }

  async componentDidUpdate() {
    if (this.props.content) {
      this.initSDE()

    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.content === this.props.content) {
      return false;
    }
    return true;
  }

  initSDE = () => {
    const { toolbars, content, mode, containerProps, hidentoolbars } = this.props;
    // console.log('mode', { mode, hidentoolbars }); //模式
    // console.log(' this.editRef,', this.editRef,);

    var sde = (window.sde = new window.SDE({
      el: this.editRef,
      mode,
      iframe_css_src: '/lib/sde/index.css', //扩展CSS
      page_start_num: 1, //页面起始页，默认为1
      //这里可以处理url，对url进行再加工。如果此时执行 this.isLoadAsyncData(true)，则表示代替sde自带的异步请求方法，
      ctrl_remote_handle: function (data) { },
      default_open_toolbar: 'sde-toolbar-tools', //默认打开的toolbar的集合，如果不填，默认使用第一个集合
      toolbars: toolbars || defaultToolbars,
    }));
    // console.log("sde",sde.addListener('ready'));
    //编辑器初始化完成后触发
    sde.addListener('ready', function () {
      // console.log("content",content);
      // 把content的内容显示到报卡上
      sde.html(content);
    });
    window.sde = sde;
    const editorElement = document.getElementsByClassName('sde-editor')[0];
    editorElement.style.height = `${get(containerProps, 'height') - 143}px`;
    if (mode === 'STRICT') {
      const toolbarElement = document.getElementsByClassName('sde-toolbars')[0];
      toolbarElement.style.display = 'none';
      editorElement.style.height = `${get(containerProps, 'height')}px`;
    }
    if (hidentoolbars) {
      setTimeout(() => {
        const toolbarElement = document.getElementsByClassName('sde-toolbars')[0];
        toolbarElement.style.display = 'none';
      }, 0);
    }
  };

  handleSave = () => {
    const { onSave } = this.props;
    const content = window.sde.html();
    console.log('content', content);

    onSave && onSave(content);
  };

  handlePrint = () => {
    window.sde.execCommand('print');
  };

  render() {
    const { hiddenButton } = this.props;
    return (
      <div id="case-templete-container" className="case-templete-container">
        <div
          className="sde-container"
          key={this.props.sdeKey || Math.random()}
          ref={(refNode) => {
            this.editRef = refNode;
          }}
        ></div>
        {/* <div className="case-templete-container_actions"> */}
        {!hiddenButton && (
          <div className="right-bottom-btns">
            <Button
              className="case-templete-container_actions-btns"
              onClick={this.handlePrint}
              icon={<MyIcon value='PrinterOutlined' />}
            >
              打印
            </Button>
            <Button
              type="primary"
              className="case-templete-container_actions-btns"
              onClick={this.handleSave}
              icon={<MyIcon value='SaveOutlined' />}
            >
              保存
            </Button>
          </div>
        )}
      </div>
    );
  }
}
