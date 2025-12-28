import { ICommonOption } from "@lm_fe/env";

export interface IFubao_womenHealthcarePhysicalExamination {
    "id": 411,
    "weight": 60.0,
    "height": 160.0,
    "systolic": number,
    MyPressure__: number[],

    "diastolic": number,
    "heartRate": "100",
    "bmi": "23.44",
    "deleteFlag": 0
}
export interface IFubao_womenHealthcareMenstrualHistory {
    "dysmenorrhea": number,
    "dysmenorrheaNote": string,
    "dysmenorrhea__": ICommonOption[],
    "menopause": number,
    "menopauseNote": string,
    "menopause__": ICommonOption[],

    "id": 119,
    "menarche": 11,
    "menstrualCycle": 11,
    "menstrualPeriod": 22,
    "menstrualVolume": "多",
    "lmd": "2023-12-06",
    "deleteFlag": 0,
    "menopauseSurgery": 2,
    "conceived": 1,
    "parity": 1,
}