import { ICommonOption } from "@lm_fe/env";


type TT<T> = Partial<T & {
    checkdate: string,
    menopause: string,
    gestationalWeek: string,
}>

export interface IMchc_Doctor_FirstVisitPresentmhOutpatient {
    "id": 1373,
    "lmp": "2022-08-04",
    "edd": "2023-05-11",
    "sureEdd": "2023-05-11",
    "sureEddModify": null,
    "conceiveMode": 1,
    "conceiveModeNote": string,
    "chiefcomplaint": null,
    "presentmhNote": null,
    "yolksac": null,
    "sac": null,
    "ntExams": TT<{ nt: number, crl: number }>[],
    "nfExams": TT<{ nf: number, bpd: number }>[],
    "mlUltrasounds": any[]
    conceiveMode__: ICommonOption[]

    // added
    isBanned: boolean


}

