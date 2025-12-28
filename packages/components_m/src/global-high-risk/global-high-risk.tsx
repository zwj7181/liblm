import { initRiskWs } from '@/actions/prenatal-visit';
import { CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import { formatTimeToStandard } from '@/utils/format';
import storage from '@/utils/storage';
import { LazyAntd } from '@lm_fe/components';
import { Drawer, Popconfirm, Popover } from 'antd';
import classnames from 'classnames';
import { cloneDeep, get, map, pick, remove } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { EventEmitter_Old } from '../utils';
import { APP_CONFIG } from '../utils/constants';
import { tableColumns } from './config';
import './index.less';
import MovePoint from './move-point';

import { getGlobalJHighRiskAlert, updateGlobaJHighRiskAlert } from './request';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const { PUBLIC_PATH, API_PREFIX, ENVIRONMENT_MODE, HOST_URL, ...rest } = process.env;
interface Iprops {
  [key: string]: any;
}
export default function GlobalHighRisk({ ...props }: Iprops) {
  const history = useHistory();
  const store = useSelector((state: any) => state);
  const [drawerVisible, setSrawerVisible] = useState(false);
  const [recordVisble, setRecordVisble] = useState(false);
  const [highList, setHighList] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const websocket: any = useRef();
  const dispatch = useDispatch(); ///dispatch(changeModalVisible(true));
  const timer = useRef();
  const sendTmer = useRef();
  const [highTotal, setHighTotal] = useState(0);
  const [websocketData, setWebsocketData] = useState(null);
  const [twinkle, setTwinkle] = useState(false); // 闪烁
  const bgmusicRef: any = useRef();

  useEffect(() => {
    const audio = new Audio('/assets/warn.mp3');
    bgmusicRef.current = audio;
    function autoplay() {
      bgmusicRef.current.muted = false;
    }
    document.addEventListener('click', autoplay);
    return () => {
      document.removeEventListener('click', autoplay);
    };
  }, []);

  useEffect(() => {
    if (isLogin()) {
      initWebsocket();
    }
    function A() {
      initWebsocket();
    }
    EventEmitter_Old.subscribe('loginLinkWs', A);
    return () => {
      EventEmitter_Old.unSubscribe('loginLinkWs', A);
    };
  }, []);

  useEffect(() => {
    return () => {
      closeWebsocket();
    };
  }, [store.prenatalVisit.highRiskWebsocket]);

  //#region  websocket相关
  async function initWebsocket() {
    const token = storage.getItem(APP_CONFIG.TOKEN);
    const id = get(store, `user.basicInfo.id`);
    if (!token || !id) return;
    if (store.prenatalVisit.highRiskWebsocket) return;
    const address = getWebsocketAddress();
    const newPUBLIC_PATH = PUBLIC_PATH && PUBLIC_PATH?.substring(0, PUBLIC_PATH.lastIndexOf('/'));
    const websocketAddress =
      'ws://' +
      address +
      (newPUBLIC_PATH ? newPUBLIC_PATH : '') +
      '/ws/obis-globalRisk?token=' +
      token +
      '&userId=' +
      id;

    // 初始化websocket
    const options = {
      connectionTimeout: 60 * 1000, // 如果在10s之后没有连接，重试连接
    };
    // console.log(websocketAddress);
    closeWebsocket();
    const websocketServicesInstance = await new ReconnectingWebSocket(websocketAddress, [], options);
    // websocket.current = websocketServicesInstance;
    dispatch(initRiskWs(websocketServicesInstance));
    websocketServicesInstance.addEventListener('open', (e: any) => {
      const state = e.target.readyState;
      websocketHeartbeat(websocketServicesInstance);
    });
    websocketServicesInstance.addEventListener('message', (e: any) => {
      reduceMessage(e.data);
    });
    websocketServicesInstance.addEventListener('error', (e: any) => {
      console.log({ error: 'error websocket连接失败' });
    });
    websocketServicesInstance.addEventListener('close', (e: any) => {
      console.log({ close: '断开连接', e });
      dispatch(initRiskWs(null));
    });
  }
  /**处理消息 */
  function reduceMessage(_data: any) {
    const data = JSON.parse(_data);
    if (get(data, 'isDealWith')) {
      setTimeout(() => {
        console.log('处理消息');
        setWebsocketData(data);
        setTwinkle(true);
        play();
      }, 8 * 1000);
    }
  }
  /**websocket心跳检测，nginx转发，默认60秒内不通信，就会中断连接的 */
  function websocketHeartbeat(websocketServicesInstance: any) {
    if (!websocketServicesInstance) return false;
    if (sendTmer.current) clearInterval(sendTmer.current);
    sendTmer.current = setInterval(() => {
      websocketServicesInstance.send('currenttime');
    }, 5 * 1000);
  }
  /** 根据打包环境的不同，获得websocket得知 */
  function getWebsocketAddress() {
    let address: any = '';
    if (ENVIRONMENT_MODE == 'development') {
      try {
        address = HOST_URL?.substr(HOST_URL.lastIndexOf('/') + 1);
      } catch (error) {
        console.error('address 截取错误');
      }
    } else {
      address = window.location.host;
    }
    return address;
  }

  /**关闭websocket 链接 */
  function closeWebsocket() {
    store.prenatalVisit.highRiskWebsocket && store.prenatalVisit.highRiskWebsocket.close();
  }
  //#endregion
  async function initData() {
    if (isLogin()) {
      const res: any = await getGlobalJHighRiskAlert();
      setHighList(res);
    }
  }

  function play() {
    try {
      bgmusicRef.current.play();
    } catch (error) {
      console.error({ error });
    }
  }

  function showDrawer() {
    setSrawerVisible((pre) => !pre);
    setTwinkle(false);
  }

  function onClose() {
    setSrawerVisible(false);
  }

  function oncancleRecord() {
    setRecordVisble(false);
  }

  function handleSure(postdata: any) {
    return async () => {
      await updateGlobaJHighRiskAlert({
        ...pick(postdata, ['age', 'edd', 'outpatientNO', 'highRiskValue', 'id']),
        reportDate: formatTimeToStandard(new Date()),
      });
      const globalJHighRiskAlertVM: any = cloneDeep(get(websocketData, `globalJHighRiskAlertVM`));
      remove(globalJHighRiskAlertVM.pregnancyInfo, (item: any) => item.id == postdata.id);
      const _globalJHighRiskAlertVM = {
        ...globalJHighRiskAlertVM,
        processedNumber: globalJHighRiskAlertVM.processedNumber + 1,
        unProcessedNumber: globalJHighRiskAlertVM.unProcessedNumber - 1,
      };
      let updateRecord_: any = cloneDeep(get(websocketData, `updateRecord`));
      updateRecord_.unshift({
        content: get(postdata, `highRiskValue`),
        date: new Date().getTime(),
        dealWithStatus: '已处理',
        name: get(store, `user.userData.firstName`),
        pregnancyName: get(postdata, `name`),
      });
      setWebsocketData({
        ...websocketData,
        globalJHighRiskAlertVM: _globalJHighRiskAlertVM,
        recordTotal: websocketData.recordTotal + 1,
        updateRecord: updateRecord_,
      });
    };
  }
  async function handleGetRecord() {
    // const res: any = await getGlobalJHighRiskUpdateRecord();
    // console.log({ res });
    // setRecordList(res);
    setRecordVisble(true);
  }

  function isLogin() {
    const token = storage.getItem(APP_CONFIG.TOKEN);
    const username = storage.getItem(APP_CONFIG.AUTH_NAME);
    const loginTime = storage.getItem(APP_CONFIG.LOGIN_TIME) || 0;
    if (!token || !username || APP_CONFIG.EXPIRE_TIME * 1000 + loginTime < new Date().getTime()) {
      return false;
    }
    return true;
  }
  return (
    <div className="global-hight-risk-container">
      {isLogin() && websocketData && (
        <MovePoint onHandleClick={showDrawer}>
          {/* <div className={classnames('big-circle',{'twinkle':twinkle})}> */}
          <div className={classnames('circle', { twinkle: twinkle })}>
            <CustomIcon type={drawerVisible ? 'icon-close' : 'icon-emergency'} className="drag-icon" />
            <span className="circle-tip">{get(websocketData, `globalJHighRiskAlertVM.unProcessedNumber`)}</span>
          </div>
          {/* </div> */}
        </MovePoint>
      )}
      {/* src={`${process.env.PUBLIC_PATH}warn.mp3`} */}
      <audio id="bgMusic" muted>
        <source src={'./warn_old.mp3'} type="audio/mp3" />
      </audio>
      <Drawer
        title={null}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerVisible}
        getContainer={false}
        style={{ position: 'absolute' }}
        width={600}
      >
        <div className="header-content padding">
          <div
            className="header-item cursor"
            onClick={() => {
              history.push('/cirsis/list');
              setSrawerVisible(false);
            }}
          >
            <div className="top-content">
              <span className="number">{get(websocketData, `globalJHighRiskAlertVM.highRiskTotal`)}</span>
              <span className="name">人</span>
            </div>
            <span className="title">今日检出高危</span>
          </div>

          <div className="header-item">
            <div className="top-content">
              <span className="number number1">{get(websocketData, `globalJHighRiskAlertVM.processedNumber`)}</span>
              <span className="name">人</span>
            </div>
            <span className="title">已处理</span>
          </div>
          <div className="header-item">
            <div className="top-content">
              <span className="number number1">{get(websocketData, `globalJHighRiskAlertVM.unProcessedNumber`)}</span>
              <span className="name">人</span>
            </div>
            <span className="title">未处理</span>
          </div>
        </div>
        <div className={classnames('slicer', { record: recordVisble })}>
          {recordVisble ? (
            <CustomIcon type="icon-back1" onClick={oncancleRecord} className="slicer-icon" />
          ) : (
            <CustomIcon type="icon-report" className="slicer-icon" />
          )}
          <span className="slicer-name" onClick={handleGetRecord}>
            处理记录
          </span>
          <span className="slicer-number">{get(websocketData, `recordTotal`)}条</span>
          {recordVisble && (
            <CustomIcon type="icon-cacncel" className="icon-cancel" onClick={oncancleRecord}></CustomIcon>
          )}
        </div>
        {!recordVisble && (
          <div className="main-content padding">
            {map(get(websocketData, `globalJHighRiskAlertVM.pregnancyInfo`), (item, index) => {
              return (
                <div className="content-list">
                  <div className="list-left">
                    <div className="list-left-top">
                      <span className="name">{get(item, `name`)}</span>
                      <span className="age">年龄：{get(item, `age`)}</span>
                      <span className="age">预产期：{get(item, `edd`)?.format('YYYY-MM-DD')}</span>
                      <span className="age">就诊卡号：{get(item, `outpatientNO`)}</span>
                    </div>
                    <div className="list-left-value">
                      <CustomIcon type="icon-emergency" className="list-warn" />
                      <Popover
                        content={<div className="popover-high">危急值: {get(item, `highRiskValue`)}</div>}
                        title={null}
                      >
                        <div className="value value-red">危急值: {get(item, `highRiskValue`)}</div>
                      </Popover>
                    </div>
                  </div>
                  <div className="list-btn">
                    <Popconfirm
                      placement="left"
                      title={
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span>确定处理后系统将自动确认</span>
                          <span> 处理人和处理时间，请再次确认</span>
                        </div>
                      }
                      onConfirm={handleSure(item)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <div className="btn">确认处理</div>
                    </Popconfirm>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {recordVisble && (
          <div className="record-content">
            <Table
              dataSource={get(websocketData, `updateRecord`) || []}
              columns={tableColumns}
              pagination={false}
              bordered={true}
              scroll={{ y: 400 }}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
}
