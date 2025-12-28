import dayjs, { Dayjs } from 'dayjs'

import store from 'store';
import { DIFF_HOUR, HOUR_SPAN, START_HOUR } from './constant';
import { IBooking, IStatisticData, TOperationType } from './type';
import { getTimeFrame } from './util';
import {
  IModel_FamilyPlaningSchedulingDetails,
  IModel_FamilyPlanningDefaultSetting,
  SModel_EarlyPregnancyCheckSurgeryType,
  SModel_FamilyPlaningSchedulingDetails,
  stupidEnums,
} from '../../.stupid_model';
import {
  getMonthStartEnd,
  getWeekStartEnd
} from './util';
const COLS_OF_SAME_INTERVAL_KEY = 'COLS_OF_SAME_INTERVAL_KEY';
type TOs = (data: IBooking[]) => void;
export class DD {
  bookings: IBooking[] = [];
  statisticData: Partial<IStatisticData> = {};
  scheduleArr: IModel_FamilyPlaningSchedulingDetails[] = [];
  start: Dayjs = dayjs();
  end: Dayjs = dayjs();
  mode: 'day' | 'week' | 'month' = 'day';
  selectMoment = dayjs();
  observers: TOs[] = [];
  disabledStartTime = dayjs('2000-01-01 12:00');
  disabledEndTime = dayjs('2000-01-01 14:00');
  colsOfSameInterval = 1;
  appointSetting?: IModel_FamilyPlanningDefaultSetting;
  static allSchedulingData: { [x: string]: IModel_FamilyPlaningSchedulingDetails };

  constructor() {
    this.init();
  }
  init(cols: number = store.get(COLS_OF_SAME_INTERVAL_KEY) || 6) {
    store.set(COLS_OF_SAME_INTERVAL_KEY, cols);
    this.colsOfSameInterval = 6;
  }
  observe(o: TOs) {
    this.observers.push(o);
    // this.emitChange()
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }
  setData(data: IBooking[]) {
    this.bookings = data;
    this.emitChange();
  }
  setStatisticData(data: Partial<IStatisticData>) {
    this.statisticData = { ...data };
  }
  setScheduleArr(data: IModel_FamilyPlaningSchedulingDetails[]) {
    this.scheduleArr = [...data];
  }
  setStartAndEnd(start: Dayjs, end: Dayjs) {
    this.start = start;
    this.end = end;
  }
  addToDayView(data: IBooking) {
    this.addToRemote(data);
    // this.    ([...this.bookings, data])
  }
  addToWeekView(data: Omit<IBooking, 'endColInTime' | 'startColInTime'>) {
    this.addToRemote(data);
    // const arr = this.findStartColToAdd(data.startTime, data.endTime)
    // if (arr.length) {
    //     this.addToRemote({ ...data, startColInTime: arr[0], endColInTime: arr[0] + 1 })
    // }
  }
  addToMonthView(data: Pick<IBooking, 'appointmentDate' | 'data'>) {
    const dayStart = data.appointmentDate.clone().set({ hour: START_HOUR });
    const arr = Array(DIFF_HOUR / HOUR_SPAN)
      .fill(0)
      .map((_, idx) => {
        const s = dayStart.clone().add(idx * HOUR_SPAN * 60, 'minute');
        const e = dayStart.clone().add((idx + 1) * HOUR_SPAN * 60, 'minute');
        return { availableCols: this.findStartColToAdd(s, e), s, e };
      })
      .filter((_) => _.availableCols.length);
    if (arr.length) {
      const target = arr[0];
      this.addToRemote({
        appointmentDate: target.s,
        data: data.data,
        appointmentMorningOrAfternoon: '上午',
      });

      // this.setData([
      //     ...this.bookings,
      //     {
      //         id: 0,
      //         startTime: target.s,
      //         endTime: target.e,
      //         startColInTime: target.availableCols[0],
      //         endColInTime: target.availableCols[0] + 1,
      //         data: data.data
      //     }
      // ])

      this.emitChange();
    }
  }
  equalDay(a: Date, b: Date) {
    return true;
  }
  checkInRestTime(startTime: Dayjs) {
    return false;
  }
  canAddInDayView(appointmentDate: Dayjs, colIndex: number, rowIndex: number, type: TOperationType) {
    return false
    // const thisDayData = findAppointmentOfThisDay(this.bookings.map(_ => _.data), type, appointmentDate)
    // if (thisDayData.length >= getOperationOpenStatusAndNum(appointmentDate, type, this.appointSetting)[1]) return false
    // if (this.checkInRestTime(appointmentDate)) return false
    // // startTime.isBetween()
    // const bookingsOfDate = this.bookings.filter(_ => _.appointmentDate.isSame(appointmentDate, 'day'))
    // const isOk = !bookingsOfDate.some(_ => {
    //     return _.colIndex === colIndex && _.rowIndex === colIndex
    // })
    // return isOk
  }
  findStartColToAdd(startTime: Dayjs, endTime: Dayjs) {
    return Array(this.colsOfSameInterval)
      .fill(0)
      .map((_, i) => {
        const isOk = this.canAddInDayView(startTime, endTime, i, i + 1);
        return isOk ? i : -1;
      })
      .filter((_) => _ !== -1);
  }
  canAddInWeekView(startTime: Dayjs, endTime: Dayjs) {
    const colArr = this.findStartColToAdd(startTime, endTime);
    return !!colArr.length;
  }
  canAddInMonthView(startTime: Dayjs) {
    const dayStart = startTime.clone().set({ hour: START_HOUR });

    return Array(DIFF_HOUR / HOUR_SPAN)
      .fill(0)
      .map((_, idx) =>
        this.canAddInWeekView(
          dayStart.clone().add(idx * HOUR_SPAN * 60, 'minute'),
          dayStart.clone().add((idx + 1) * HOUR_SPAN * 60, 'minute'),
        ),
      )
      .some((_) => _);
  }
  emitChange() {
    this.observers.forEach((o) => o?.call(null, this.bookings));
  }
  async addToRemote(item: IBooking) {
    const { data, appointmentDate, appointmentMorningOrAfternoon } = item;
    SModel_EarlyPregnancyCheckSurgeryType.appointmentSurgery({
      ...data,
      progressStatus: stupidEnums.EarlyPregnancyCheckSurgeryType.progressStatus.getValue('待签到'),
      appointmentMorningOrAfternoon,
      appointmentDate: appointmentDate,
    })
      .then(() => {
        this.initData();
        this.getStatistic();
        this.getBetweenList();
      })
      .catch((e) => {
        if (e?.msg?.includes('号源不足')) {
          // stupidModal.open('BookingModal', {
          //     onClose: () => {
          //         this.initData()
          //     },
          //     modalData: {
          //         step: 0,
          //         data,
          //     }
          // })
        }
      });
  }
  initData() {
    let start: Dayjs, end: Dayjs;
    if (this.mode === 'day') {
      start = this.selectMoment;
      end = this.selectMoment;
    } else if (this.mode === 'week') {
      const [_start, _end] = getWeekStartEnd(this.selectMoment);
      start = _start;
      end = _end;
    } else {
      const [_start, _end] = getMonthStartEnd(this.selectMoment);
      start = _start.subtract(7, 'day');
      end = _end.add(7, 'day');
    }

    SModel_EarlyPregnancyCheckSurgeryType.getList({
      params: {
        'appointmentDate.greaterOrEqualThan': start.format('YYYY-MM-DD'),
        'appointmentDate.lessOrEqualThan': end.format('YYYY-MM-DD'),
        // progressStatus: stupidEnums.EarlyPregnancyCheckSurgeryType.progressStatus.getValue('待签到')
      },
    }).then((r) => {
      const resData = r.filter(
        (_) => _.progressStatus !== stupidEnums.EarlyPregnancyCheckSurgeryType.progressStatus.getValue('待预约'),
      );

      if (Array.isArray(resData)) {
        const validData = resData.filter((_) => _.appointmentDate?.isValid());
        const data = validData.map((_) => {
          // SModel_EarlyPregnancyCheckSurgeryType.del(_.id)

          return {
            data: _,
            appointmentDate: _.appointmentDate,
            appointmentMorningOrAfternoon: _.appointmentMorningOrAfternoon || '上午',
          } as IBooking;
        });
        this.setData(data);
      }
    });
    // SModel_EarlyPregnancyCheckSurgeryType.getFamilyPlanningDefaultSetting()
    // SModel_FamilyPlanningDefaultSetting.getList()
  }
  getStatistic() {
    const { start, end } = getTimeFrame(this.mode, this.selectMoment);
    SModel_EarlyPregnancyCheckSurgeryType.getStatistic(start, end).then((res) => {
      this.setStatisticData(res);
    });
  }
  getBetweenList() {
    const isMonth = this.mode === 'month';
    const { start, end } = getTimeFrame(this.mode, this.selectMoment);
    this.setStartAndEnd(start, end);
    SModel_FamilyPlaningSchedulingDetails.getBetweenList(
      isMonth ? start.subtract(7, 'day') : start,
      isMonth ? end.add(7, 'day') : end,
    ).then((res) => {
      this.setScheduleArr(res);
    });
  }
}
