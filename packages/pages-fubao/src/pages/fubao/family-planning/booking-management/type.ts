import { IModel_EarlyPregnancyCheckSurgeryType } from '../../.stupid_model';
import { Dayjs } from 'dayjs';
export type TabType = 'day' | 'week' | 'month';

export interface IBooking {
  data: Partial<IModel_EarlyPregnancyCheckSurgeryType>;
  appointmentDate: Dayjs;
  appointmentMorningOrAfternoon: TMorningOrAfternoon;
}

export interface IStatisticData {
  appointmentNum: number;
  completeNum: number;
  signNum: number;
  timeout: number;
}

export const ItemTypes = '__ItemTypes';

export type TOperationType = '人工流产' | '刮宫术' | '宫内避孕器放置术' | '宫内节育器取出术' | '子宫输卵管通液术';

export type TMorningOrAfternoon = '上午' | '下午';

export type TAttendanceType = '休息' | '全天' | TMorningOrAfternoon;
