/**
 * @author bhliang
 * @email 710122069@qq.com
 * @create date 2021-12-01 10:13:19
 * @modify date 2021-12-01 10:13:19
 * @desc [排班管理]
 */
import React from 'react';
import './index.less';
import Calendar from './components/Calendar/index';
import SettingModal from './components/SettingModal';
import GlobalSettingModal from './components/GlobalSettingModal';
import { getReservationPanelByDate } from './apis/api';
import dayjs from 'dayjs';
import { mchcLogger } from '@lm_fe/env';
dayjs().locale('zh-cn');
class WorkfaceManagement extends React.Component {
  state = {
    isModalVisible: false,
    isGlobalSettingModalVisible: false,
    settingDate: dayjs(),

    curMonth: dayjs(), //当前月
    activeDay: dayjs(), //选中日期
    reservationPanel: [],
  };

  async componentDidActivate() {
    this.getReservationPanel();
  }

  componentDidMount() {
    this.getReservationPanel();
  }
  // 获取排版列表
  getReservationPanel = async () => {
    const { curMonth } = this.state;
    const startDay = dayjs(curMonth).date(1); // 当前月的1号
    const startDayCount = startDay.day(); //1号是星期几
    const startDate = startDay.subtract(startDayCount, 'days');

    const endDay = dayjs(curMonth).date(1).add(1, 'months');
    const endDayCount = 6 - endDay.day(); //6-星期几，就可知道要最后一周星期六 是下个月几号
    const endDate = endDay.add(endDayCount, 'days');
    const res: any = await getReservationPanelByDate(startDate, endDate);
    mchcLogger.log('xxg res', res)

    this.setState({ reservationPanel: res.data });
  };
  onChangeDate = (date: any, dateString: string) => {
    this.setState({ settingDate: date, isModalVisible: true });
  };
  setGlobalSettingModal = (val: any) => {
    this.setState({ isGlobalSettingModalVisible: val });
  };
  setSettingModal = (val: any) => {
    this.setState({ isModalVisible: val });
  };
  changeCurMonth = (val: any) => {
    this.setState({ curMonth: val }, () => this.getReservationPanel());
  };
  renderCalendar() {
    const { reservationPanel, curMonth } = this.state;
    return (
      <Calendar
        setGlobalSettingModal={this.setGlobalSettingModal}
        setSettingModal={this.setSettingModal}
        onChangeDate={this.onChangeDate}
        reservationPanel={reservationPanel}
        curMonth={curMonth}
        changeCurMonth={this.changeCurMonth}
      />
    );
  }
  render() {
    const { isGlobalSettingModalVisible, isModalVisible, settingDate, reservationPanel } = this.state;
    return (
      <div className="workface-management">
        {this.renderCalendar()}
        {isModalVisible && (
          <SettingModal
            isModalVisible={isModalVisible}
            setSettingModal={this.setSettingModal}
            settingDate={settingDate}
            getReservationPanel={this.getReservationPanel}
            reservationPanel={reservationPanel}
          />
        )}
        {isGlobalSettingModalVisible && (
          <GlobalSettingModal
            isGlobalSettingModalVisible={isGlobalSettingModalVisible}
            setGlobalSettingModal={this.setGlobalSettingModal}
            getReservationPanel={this.getReservationPanel}
          />
        )}
      </div>
    );
  }
}
export default WorkfaceManagement
