import { mchcEnv, mchcUtils } from "@lm_fe/env";
import { safe_json_parse, safe_json_stringify } from "@lm_fe/utils";
import { cloneDeep, isEmpty, isObject, orderBy, values } from "lodash";
import { IMchc_Nurse_OutpatientDocument, IMchc_Nurse_OutpatientDocument_physicalExam } from "./types";
// transfer old format ot common option
export function process_conceiveMode_remote(conceiveMode?: number, conceiveModeNote?: string) {
    const fallback = [{ value: conceiveMode, label: '', text: conceiveModeNote }]
    const old = safe_json_parse(conceiveModeNote) // { 1:{ key:1, value:{ 0:'2023-11-13T07:44:25.095Z', 1:123, 2:123 } } }
    if (isEmpty(old))
        return fallback


    if (Array.isArray(old)) {
        // if (isInt(old[0]?.value))
        //     return old
        return fallback
    }

    const oldObj = values(old)[0] as { key: number, value: { 0: string, 1: number, 2: number } }
    if (isObject(oldObj) && isObject(oldObj.value)) {
        const oldTextObj = oldObj.value

        return [{ value: oldObj.key, text: safe_json_stringify([oldTextObj[0], oldTextObj[1], oldTextObj[2]]), label: '' }]
    }
    return fallback


}


export function process_OutpatientDocument_remote(data: IMchc_Nurse_OutpatientDocument) {

    if (mchcEnv.appName === '广三') {
    }
    // 受孕方式 pregnancyInfo
    let pregnancyInfo = data.pregnancyInfo ?? {}




    // pregnancyInfo = fuckNote
    //     .reduce((obj, k) => {
    //         return mchcUtils.noteToCommonOption(obj, k)
    //     }, pregnancyInfo)

    pregnancyInfo = mchcUtils.autoNoteToCommonOption(pregnancyInfo)
    pregnancyInfo.fmh = mchcUtils.autoNoteToCommonOption(pregnancyInfo.fmh)


    pregnancyInfo.conceiveMode__ = process_conceiveMode_remote(pregnancyInfo.conceiveMode, pregnancyInfo.conceiveModeNote)


    //过敏史
    pregnancyInfo.amh = mchcUtils.autoNoteToCommonOption(pregnancyInfo.amh)
 

    data.pregnancyInfo = pregnancyInfo

    data.physicalExam = process_OutpatientDocument_physicalExam_remote(data.physicalExam)

    // 孕产史数据排序处理
    const pregnancymh = data.pregnancymh ?? []
    data.pregnancymh = orderBy(pregnancymh, ['gravidityindex'], ['asc'])

    // 丈夫基本信息处理

    data.partnerInfo = mchcUtils.autoNoteToCommonOption(data.partnerInfo)



    return data;
}

export function process_OutpatientDocument_physicalExam_local(physicalExam?: IMchc_Nurse_OutpatientDocument_physicalExam) {
    if (!physicalExam) return {} as IMchc_Nurse_OutpatientDocument_physicalExam
    // 体征数据处理
    // const { MyPressure1__ = [], MyPressure2__ = [], MyPressure3__ = [] } = physicalExam
    const _physicalExam = { ...physicalExam }
    // _physicalExam.systolic = MyPressure1__[0] || _physicalExam.systolic
    // _physicalExam.diastolic = MyPressure1__[1] || _physicalExam.diastolic
    // _physicalExam.systolic2 = MyPressure2__[0] || _physicalExam.systolic2
    // _physicalExam.diastolic2 = MyPressure2__[1] || _physicalExam.diastolic2
    // _physicalExam.systolic3 = MyPressure3__[0] || _physicalExam.systolic3
    // _physicalExam.diastolic3 = MyPressure3__[1] || _physicalExam.diastolic3
    return _physicalExam
}
export function process_OutpatientDocument_physicalExam_remote(physicalExam?: IMchc_Nurse_OutpatientDocument_physicalExam) {
    if (!physicalExam) return {} as IMchc_Nurse_OutpatientDocument_physicalExam
    // 体征数据处理
    // const { systolic, systolic2, systolic3, diastolic, diastolic2, diastolic3 } = physicalExam

    const _physicalExam = { ...physicalExam }
    // _physicalExam.MyPressure1__ = [systolic, diastolic]
    // _physicalExam.MyPressure2__ = [systolic2, diastolic2]
    // _physicalExam.MyPressure3__ = [systolic3, diastolic3]
    return _physicalExam
}

export function process_OutpatientDocument_local(_data: IMchc_Nurse_OutpatientDocument) {
    const data = cloneDeep(_data)
    // 受孕方式 pregnancyInfo
    let pregnancyInfo = data.pregnancyInfo ?? {}

    pregnancyInfo = mchcUtils.autoCommonOptionToNote(pregnancyInfo)




    pregnancyInfo.fmh = mchcUtils.autoCommonOptionToNote(pregnancyInfo.fmh)
    pregnancyInfo.amh = mchcUtils.autoCommonOptionToNote(pregnancyInfo.amh)

    data.pregnancyInfo = pregnancyInfo

    // 体征数据处理
    data.physicalExam = process_OutpatientDocument_physicalExam_local(data.physicalExam)

    // 丈夫基本信息处理

    data.partnerInfo = mchcUtils.autoCommonOptionToNote(data.partnerInfo)

    return data
}