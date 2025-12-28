import { get, getSearchParamsValue, safe_json_parse_arr } from "@lm_fe/utils";
import { cloneDeep, isNil } from "lodash";
import { ACTION_TYPE } from "src/state/actionType";
import { ICommonOption } from "../select_options";
export interface ISingleData { id: any, patient: any, result: any, isSingle: boolean, }

export function single_id(props?: any) {
    return Number(props?.id ?? getSearchParamsValue('id') ?? fuck_cache<ISingleData>('single')?.id)
}

export function fuck_cache<T>(key: string, data?: T): T | undefined {
    let cache_key = `__${key}__`
    if (data) {
        Object.assign(window, { [cache_key]: data })
        return data
    } else {
        return get(window, cache_key) as unknown as T
    }
}
export function getActionType(key: keyof typeof ACTION_TYPE) {
    return ACTION_TYPE[key]
}

type TNoteType<T extends string | number> = `${T}Note`
type TOptionType<T extends string | number> = `${T}__`



export function noteToCommonOption<D extends { [x in N | O]: any }, T extends Exclude<keyof D, symbol>, N extends TNoteType<T>, O extends TOptionType<T>>(data: D, key: T, marshal = false) {
    if (!data) return data
    const _data = { ...data }
    const noteKey = `${key}Note` as N
    const __Key = `${key}__` as O
    const options: ICommonOption[] = [{ value: data[key], text: data[noteKey] }]
    _data[__Key] = (marshal ? JSON.stringify(options) : options) as any
    return _data

}
export function commonOptionToNote<D extends { [x in N | O]: any }, T extends Exclude<keyof D, symbol>, N extends TNoteType<T>, O extends TOptionType<T>>(data: D, key: T,) {
    if (!data) return data
    const _data = { ...data }
    const noteKey = `${key}Note` as N
    const __Key = `${key}__` as O
    const __raw_value = data[__Key]
    if (__raw_value === null) {
        _data[key] = null!
        _data[noteKey] = null!
        return _data

    }
    const arr: ICommonOption[] = safe_json_parse_arr(__raw_value)

    if (Array.isArray(arr)) {
        const option = arr[0]
        _data[key] = option?.value
        _data[noteKey] = option?.text
    }



    return _data

}


export function autoCommonOptionToNote<T = any>(data: T) {
    if (isNil(data)) return data
    const _data: any = cloneDeep(data)
    const keys = Object.keys(_data)
        .filter(_ => _.endsWith('__'))
        .map(_ => _.slice(0, -2))
    return (keys)
        .reduce((obj, k) => {
            return commonOptionToNote(obj, k)
        }, _data) as T
}

export function autoNoteToCommonOption<T = any>(data: T) {
    if (isNil(data)) return data
    const _data: any = cloneDeep(data)
    const allKeys = Object.keys(_data)
    const keys = allKeys
        .filter(_ => allKeys.includes(`${_}Note`));
    return (keys)
        .reduce((obj, k) => {
            return noteToCommonOption(obj, k)
        }, _data) as T
}