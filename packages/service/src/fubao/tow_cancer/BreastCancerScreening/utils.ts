import { ICommonOption, mchcEnv, mchcUtils, optionKey不详, optionKey其他, optionKey否 } from "@lm_fe/env";
import { getSearchParamsValue, safe_json_parse_arr } from "@lm_fe/utils";
import { IFubao_BreastCancerScreening } from "./type";
import { cloneDeep } from "lodash";





export function processTwoCancer_remote(data: IFubao_BreastCancerScreening) {
    if (!data?.id) return data
    const physicalExamination = data.womenHealthcarePhysicalExamination ?? {}

    // 月经史



    data.womenHealthcareMenstrualHistory = mchcUtils.autoNoteToCommonOption(data.womenHealthcareMenstrualHistory)




    //病史情况
    data.breastCancerMedicalHistory = mchcUtils.autoNoteToCommonOption(data.breastCancerMedicalHistory)
    data.breastCancerDiagnosisAndGuidance = mchcUtils.autoNoteToCommonOption(data.breastCancerDiagnosisAndGuidance)


    //妇科检查
    // let BreastCancerGynecologicExamination = (['vulva', 'secretions', 'vaginal', 'cervix', 'zg', 'appendix'] as const)
    //     .reduce((obj, k) => {
    //         return mchcUtils.noteToCommonOption(obj, k)
    //     }, data.breastCancerGynecologicExamination)

    // data.BreastCancerGynecologicExamination = BreastCancerGynecologicExamination

    //诊断及指导
    // data.BreastCancerDiagnosisAndGuidance = mchcUtils.noteToCommonOption(data.BreastCancerDiagnosisAndGuidance, 'screeningResults')

    // 体格检查
    physicalExamination.MyPressure__ = [physicalExamination.systolic, physicalExamination.diastolic]
    return data
}
export function processTwoCancer_local(_data: IFubao_BreastCancerScreening) {
    const data = cloneDeep(_data)

    // 月经史



    data.womenHealthcareMenstrualHistory = mchcUtils.autoCommonOptionToNote(data.womenHealthcareMenstrualHistory)




    //病史情况
    data.breastCancerMedicalHistory = mchcUtils.autoCommonOptionToNote(data.breastCancerMedicalHistory)
    data.breastCancerDiagnosisAndGuidance = mchcUtils.autoCommonOptionToNote(data.breastCancerDiagnosisAndGuidance)

    //妇科检查
    // let BreastCancerGynecologicExamination = (['vulva', 'secretions', 'vaginal', 'cervix', 'zg', 'appendix'] as const)
    //     .reduce((obj, k) => {
    //         return mchcUtils.commonOptionToNote(obj, k)
    //     }, data.BreastCancerGynecologicExamination)

    // data.BreastCancerGynecologicExamination = BreastCancerGynecologicExamination

    //诊断及指导
    // data.BreastCancerDiagnosisAndGuidance = mchcUtils.commonOptionToNote(data.BreastCancerDiagnosisAndGuidance, 'screeningResults')
    // 体格检查
    const physicalExamination = data.womenHealthcarePhysicalExamination ?? {}
    console.log('physicalExamination', physicalExamination)
    const MyPressure__ = safe_json_parse_arr(physicalExamination.MyPressure__)
    physicalExamination.systolic = MyPressure__[0]
    physicalExamination.diastolic = MyPressure__[1]
    data.womenHealthcarePhysicalExamination = physicalExamination
    return data
}