import { IMchc_AddressItemType } from "@lm_fe/service";
import { cloneDeep, isEmpty, isEqual, isString } from "lodash";


export function checkFetchAddrOptionsNeed(value: string | undefined, oldArr: string[], options: IMchc_AddressItemType[]): 'noNeed' | 'init' | 'detail' {
    const { arr, } = parseValue(value)

    if (isEmpty(arr)) {
        if (isEmpty(options)) return 'init'
        return 'noNeed'
    } else {
        if (isEqual(arr, oldArr)) return 'noNeed'
        return 'detail'
    }
}

export function parseValue(value?: string): { arr: string[], str: string } {
    if (!value || !isString(value))
        return { arr: [], str: '' }

    // “&”分割选择地址和详细地址
    let [provinces, detailed] = value.split('&');
    const rawArr = provinces ? provinces.split(',') : [];
    let newArr = cloneDeep(rawArr);
    // 兼容旧版本全是“,”分割的地址（省,市,区,街道,详细地址）
    if (!value.includes('&')) {
        newArr = rawArr.slice(0, 3);
        detailed = rawArr.slice(3).join(',');
    }
    return { arr: newArr, str: detailed }

}