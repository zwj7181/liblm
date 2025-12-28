import { DayjsConfigType, formatDate, isString, toInt } from "@noah-libjs/utils";
import dayjs, { Dayjs } from "dayjs";
import { unmarshal_gestationWeek } from "./small-fn-old";




/**
 * 计算孕周
 * gesDate:预产期-B超
 * date：产检/报告日期
 */
export function getGesWeek(gesDate: string, date: string) {
    const diffDays = 280 - dayjs(gesDate).diff(dayjs(date), 'days');
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    return days === 0 ? `${weeks}` : `${weeks}+${days}`;
}

/**
 * 计算停经孕周
 * @param checkData 当前日期
 * @param lmp 末次月经
 * @returns
 */
export const menopauseWeek = (checkData: string, lmp: string) => {
    const diffDays = dayjs(checkData).diff(dayjs(lmp), 'days');
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    return days === 0 ? `${weeks}` : `${weeks}+${days}`;
};

/**
 * 计算孕周对应的天数
 */
export function getGestationalDays(gestationalWeek: string) {
    if (!isString(gestationalWeek)) return 0
    const arr = gestationalWeek.split('+');
    const weeks = Number(arr[0]) || 0;
    const days = Number(arr[1]) || 0;
    return weeks * 7 + days;
}



/**
 * 根据末次月经计算预产期B超
 */
export function getExpected(date: string) {
    const addDays = 280 - dayjs().diff(dayjs(date), 'days');
    return dayjs().add(addDays, 'days').format('YYYY-MM-DD');
}



/**
 * 根据 预产期B超 日期获取孕周
 * 得出 ${孕周周数}+${孕周天数}
 * 预产期B超
 */
export const getGestationalWeekBySureEdd = function (sureEdd: string): string {
    if (!sureEdd) return '';
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
        }-${today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`}`;
    const days = dayjs(sureEdd).diff(dayjs(todayStr))
    // 这里会出现孕周为负数的情况
    const gestationalWeek = `${((280 - days) / 7) >>> 0}+${(280 - days) % 7}`;
    return gestationalWeek;
};

/**
 * 根据末次月经计算预产期B超
 */
export function calEddByLmp(lmp: Dayjs) {
    return dayjs(lmp).add(280, 'days');
}
export function cal_edd_by_lmp(lmp: any) {
    return dayjs(lmp).add(280, 'days').format(formatDate.format);
}

export function calc_edd_by_IVF(移植时间: string, 天数: number) {
    let num = toInt(天数)
    if (isNaN(num)) return null
    const 孕0 = dayjs(移植时间).subtract(14 + +天数, 'days')
    const 预产期B超时间 = 孕0.add(280, 'days')

    return formatDate(预产期B超时间)
}


// 通过 nt 检查的检查日期和如孕天数推算预产期
export function calc_edd_by_ntExam(checkdate: DayjsConfigType, gestationalWeek: string) {

    if (!gestationalWeek && !checkdate) {
        return null;
    }

    const week_data = unmarshal_gestationWeek(gestationalWeek)
    if (!week_data) return null

    let ntEdd = dayjs(checkdate).add(280 - week_data.days, 'days');
    return formatDate(ntEdd)
}










// 末次月经开始算
export const calGestationalWeekByLmp = (lmp: Dayjs, defaultDate = dayjs().endOf('day')) => {
    const diffWeek = defaultDate.diff(lmp, 'week');
    const diffDay = defaultDate.diff(lmp, 'day');

    return `${diffWeek}+${diffDay % 7}`;
};

// 预产期B超开始算
export const calGestationalWeekBySureEdd = (sureEdd: any, defaultDate = dayjs().endOf('day')) => {
    let sureEddMoment = dayjs(sureEdd).startOf('day');
    const startDate = sureEddMoment.subtract(280, 'days');
    const diffWeek = defaultDate.diff(startDate, 'week');
    const diffDay = defaultDate.diff(startDate, 'day');
    if (diffDay % 7 === 0) {
        return diffWeek;
    }
    return `${diffWeek}+${diffDay % 7}`;
};
