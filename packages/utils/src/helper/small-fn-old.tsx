import { diff_between, EMPTY_PLACEHOLDER, formatDate, isNumber, isString, toFloat, toInt } from "@noah-libjs/utils";
import dayjs, { Dayjs } from "dayjs";
import { request } from "./Request";
/**
 * 计算BMI
 */
export function getBMI(weight: number, height: number) {
    if (!weight || !height) return 0;
    return toFloat(((weight / (height * height)) * 10000).toFixed(2));
}
export const calc_bmi = getBMI


/**
 * 获取本周五、下周五、下下周五时间
 */
export function getOrderTime(orderDate: '本周五' | '下周五' | '下下周五') {
    if (orderDate === '本周五') {
        return dayjs().day(5);
    } else if (orderDate === '下周五') {
        return dayjs().day(12);
    } else if (orderDate === '下下周五') {
        return dayjs().day(19);
    }
    return dayjs(new Date());
}




/**
 * 计算两个日期相隔的年数
 */
export function getDiffYears(a: string, b: string) {
    return diff_between(a, b, 'years')
}








/**根据出生日期计算年龄 */
export function GetAgeByBirthDay(strBirthday: string) {
    if (!isString(strBirthday)) return null;
    var returnAge;
    var strBirthdayArr = strBirthday.split('-');
    var birthYear: any = strBirthdayArr[0];
    var birthMonth: any = strBirthdayArr[1];
    var birthDay: any = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge; //返回周岁年龄
}


export const getDataSource = async (url: string, params: object, processFromApi?: (v: any) => any) => {
    const response = await request.get(url, {
        params,
    });
    const { data, headers } = response;
    const count = headers['x-total-count'];
    const _data = data.data ?? data

    return {
        count,
        data: processFromApi ? processFromApi(_data) : _data,
    };
};


export function gen_id_form_item_config(name = 'id') {
    return {
        inputType: 'id' as const,
        dataIndex: name,
        name,
        form_hidden: true
    }
}

export function format_gp(data: { gravidity?: any, parity?: any }): string {
    const { gravidity, parity } = data

    if (!isNumber(gravidity) || !isNumber(parity)) return EMPTY_PLACEHOLDER

    return `${gravidity}/${parity}`
}
export function unmarshal_gestationWeek(weekStr?: string) {

    if (!weekStr) return null
    const arr = weekStr.split('+')
    const week = toInt(arr[0], 0)
    const day = toInt(arr[1], 0)
    const days = week * 7 + day
    if ([week, day, days].some(_ => isNaN(_)))
        return null
    return { day, days, week }
}

export function marshal_gestationWeek(week?: string | number, day?: string | number) {
    if (!week && !day) {
        return '0'
    }
    week = week ?? '0'
    day = day ? `+${day}` : ''
    return `${week}${day}`
}