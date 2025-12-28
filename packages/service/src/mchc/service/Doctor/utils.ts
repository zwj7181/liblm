import { mchcEnv, mchcUtils } from "@lm_fe/env";
import { getSearchParamsValue } from "@lm_fe/utils";
import { IMchc_Doctor_FirstVisitInfoOfOutpatient, IMchc_Doctor_FirstVisitPastmhOutpatient, IMchc_Doctor_RvisitInfoOfOutpatient } from "./types";
import { process_conceiveMode_remote } from "../Nurse";
import { IMchc_Doctor_FirstVisitPresentmhOutpatient } from "./types/IMchc_Doctor_FirstVisitPresentmhOutpatient";

export function processFirstInfoOfOutpatient(data: IMchc_Doctor_FirstVisitInfoOfOutpatient) {
    const serialNo = getSearchParamsValue('serialNo')


    if (mchcEnv.appName === '广三' && serialNo) {
        // data.diagnosisAndAdvice.diagnoses = data.diagnosisAndAdvice.diagnoses.filter(_ => _.serialNo === serialNo)
    }
    return data;
}
export function processRvisitInfoOfOutpatient(data: IMchc_Doctor_RvisitInfoOfOutpatient) {
    const serialNo = getSearchParamsValue('serialNo')


    if (mchcEnv.appName === '广三' && serialNo) {
        // data.diagnoses = data.diagnoses.filter(_ => _.serialNo === serialNo)
        // data.rvisits = data.rvisits.filter(_ => _.serialNo === serialNo)
    }
    return data
}
// 现病史
export function processFirstPresent_remote(_data: IMchc_Doctor_FirstVisitPresentmhOutpatient) {

    const data = mchcUtils.autoNoteToCommonOption(_data)
    data.conceiveMode__ = process_conceiveMode_remote(data.conceiveMode, data.conceiveModeNote)

    return data
}
// 现病史
export function processFirstPresent_local(_data: IMchc_Doctor_FirstVisitPresentmhOutpatient) {

    return mchcUtils.autoCommonOptionToNote(_data)

}
// 既往史
export function processPastmh_remote(_data: IMchc_Doctor_FirstVisitPastmhOutpatient) {


    const data = mchcUtils.autoNoteToCommonOption(_data)

    return data
}
export function processPastmh_local(_data: IMchc_Doctor_FirstVisitPastmhOutpatient) {

    const data = mchcUtils.autoCommonOptionToNote(_data)


    return data
}
// 其他病史
export function processOther_remote(_data: IMchc_Doctor_FirstVisitInfoOfOutpatient['othermh']) {

    const data = mchcUtils.autoNoteToCommonOption(_data)
    data.pmh = mchcUtils.autoNoteToCommonOption(_data.pmh)
    data.fmh = mchcUtils.autoNoteToCommonOption(_data.fmh)
    return data
}
export function processOther_local(_data: IMchc_Doctor_FirstVisitInfoOfOutpatient['othermh']) {

    const data = mchcUtils.autoCommonOptionToNote(_data)
    data.pmh = mchcUtils.autoCommonOptionToNote(_data.pmh)
    data.fmh = mchcUtils.autoCommonOptionToNote(_data.fmh)
    return data
}

export function processLabExamOfOutpatient_local(_data: any) {
    const data = mchcUtils.autoCommonOptionToNote(_data)
    return data

}
export function processLabExamOfOutpatient_remote(_data: any) {
    const data = mchcUtils.autoNoteToCommonOption(_data)
    return data
}
export function processPhysicalExamOfOutpatient_local(_data: IMchc_Doctor_FirstVisitInfoOfOutpatient['physicalExam']) {
    const data = mchcUtils.autoCommonOptionToNote(_data)

    // const { MyPressure1__ = [], MyPressure2__ = [], MyPressure3__ = [] } = _data.physicalBaseExam


    // data.physicalBaseExam = {

    //     ...data.physicalBaseExam,
    //     systolic: MyPressure1__[0],
    //     diastolic: MyPressure1__[1],
    //     systolic2: MyPressure2__[0],
    //     diastolic2: MyPressure2__[1],
    //     systolic3: MyPressure3__[0],
    //     diastolic3: MyPressure3__[1],

    // }


    // data.physicalgeneralExam = mchcUtils.autoCommonOptionToNote(_data.physicalgeneralExam)
    return data

}
export function processPhysicalExamOfOutpatient_remote(_data: IMchc_Doctor_FirstVisitInfoOfOutpatient['physicalExam']) {
    const data = mchcUtils.autoNoteToCommonOption(_data)



    // data.physicalBaseExam = {
    //     ..._data.physicalBaseExam,
    //     MyPressure1__: [_data.physicalBaseExam.systolic, _data.physicalBaseExam.diastolic],
    //     MyPressure2__: [_data.physicalBaseExam.systolic2, _data.physicalBaseExam.diastolic2],
    //     MyPressure3__: [_data.physicalBaseExam.systolic3, _data.physicalBaseExam.diastolic3],
    // }
    // data.physicalgeneralExam = mchcUtils.autoNoteToCommonOption(_data.physicalgeneralExam)
    return data
}