import { MCHC_TYPE_MAP, MchcTypes } from "@lm_fe/env"
import { IMchc_Doctor_Diagnoses } from "./common"
import { IMchc_Doctor_Pregnancymh } from "./IMchc_Doctor_Pregnancymh"

export interface IMchc_Doctor_PreRiskAssessmentInfo<T extends MchcTypes = MCHC_TYPE_MAP['mchc']> {
    diagnoses: IMchc_Doctor_Diagnoses<T>[]
    pregnancymh: IMchc_Doctor_Pregnancymh[]
    gravidity: number
    parity: number
    bmi: number
    eddAge: number
    familyHistoryOrderNote: null,
    allergyDrug: false,
    allergyDrugNote: string
    allergyFood: false,
    allergyFoodNote: string
    allergyOther: false,
    allergyOtherNote: string
    conceiveMode: number
    conceiveModeNote: string
    smoke: false
    weight: number
    curgesweek: string
}