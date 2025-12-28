
import { formatDate, formatDateTime, getMomentObj } from '@noah-libjs/utils'
import { Dayjs } from 'dayjs'

function formatRangeMoment(data: { [x: string]: Dayjs[] | null }, formater: (v: Dayjs) => string | null, cKeys: string[],) {
    const entries = Object.entries(data)
    return entries.reduce((a, [k, v], idx) => {
        if (!v) return a
        return {
            ...a,
            [`${k}.${cKeys[0]}`]: formater(v[0]),
            [`${k}.${cKeys[1]}`]: formater(v[1]),
        }
    }, {} as { [x: string]: string | null })
}
export function formatRangeDate(data: { [x: string]: Dayjs[] | null }, cKeys = ['greaterOrEqualThan', 'lessOrEqualThan']) {
    return formatRangeMoment(data, formatDate, cKeys)
}
export function formatRangeDateTime(data: { [x: string]: Dayjs[] | null }, cKeys = ['greaterOrEqualThan', 'lessOrEqualThan']) {
    return formatRangeMoment(data, formatDateTime, cKeys)
}

export function diff_hour_minute(inputA: any, inputB: any) {
    const a = getMomentObj(inputA)
    const b = getMomentObj(inputB)
    const a_without_sec = a.set('second', 0)
    const b_without_sec = b.set('second', 0)
    const diff = (a_without_sec.isValid() && b_without_sec.isValid()) ? a_without_sec.diff(b_without_sec, 'minute') : null
    return getHourAndMinute(diff)
}

function getHourAndMinute(minutes?: number | null) {
    if (!minutes || minutes < 0) return { h: 0, m: 0 }
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return { h, m }
}

