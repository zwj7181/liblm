import { MCHC_TYPE_MAP, MchcTypes } from "@lm_fe/env"




export interface IMchc_Doctor_Pregnancymh<T extends MchcTypes = MCHC_TYPE_MAP['mchc']> {
    id: number
    gravidityindex: number
    year: string
    month: null,
    naturalAbortion: boolean,
    medicalAbortion: boolean,
    surgicalAbortion: boolean,
    currettageAbortion: null,
    currettage: boolean,
    biochemicalAbortion: boolean,
    inducedLabor: boolean,
    fetusdeath: null,
    preterm: boolean,
    term: boolean,
    vaginalDelivery: boolean,
    cesareanSection: boolean,
    forceps: boolean,
    vacuumAssisted: boolean,
    breechMidwifery: boolean,
    hemorrhage: null,
    puerperalFever: null,
    gestationalWeek: string
    fetalcount: number
    hospital: null,
    exceptionalcase: null,
    children: {
        id: number
        childGender: number
        childLiving: null,
        childDeath: null,
        childDeathTime: null,
        childDeathNote: null,
        neonateWeight: null,
        sequelaNote: null
    }[]
    // new
    neonateDeath: null,

}