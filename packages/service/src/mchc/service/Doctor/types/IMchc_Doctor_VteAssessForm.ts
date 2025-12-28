import { MCHC_TYPE_MAP, MchcTypes } from "@lm_fe/env"

interface IMchc_Doctor_VteAssessForm_广三<T extends MchcTypes> {
    id: number
    vteId: number
    preNote1: number
    preNote2: number
    preNote3: number
    preNote4: number
    preNote5: number
    preNote6: number
    preNote7: number
    preNote8: number
    preNote9: number
    preNote10: number
    preNote11: number
    preNote12: number
    preNote13: number
    obsNote1: number
    obsNote2: number
    obsNote3: number
    obsNote4: number
    obsNote5: number
    obsNote6: number
    obsNote7: number
    obsNote8: number
    obsNote9: number
    obsNote10: number
    obsNote11: number
    obsNote12: number
    onceNote1: number
    onceNote2: number
    onceNote3: number
    onceNote4: number
    onceNote5: number
    note1: number
    note2: number
}
export type IMchc_Doctor_VteAssessForm<T extends MchcTypes> = T extends MCHC_TYPE_MAP['广三'] ? IMchc_Doctor_VteAssessForm_广三<T> : IMchc_Doctor_VteAssessForm_广三<T>