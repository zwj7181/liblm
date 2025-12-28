import { ICommonOption } from "@lm_fe/env";


export interface IMchc_Doctor_FirstVisitPastmhOutpatient {


    "id": 1,

    "hypertension": boolean,
    "hypertensionNote": null,
    "hypertension__": string,

    "diabetes": boolean,
    "diabetesNote": "BB",
    "diabetes__": string,

    "cardiacDisease": boolean,
    "cardiacDiseaseNote": null,
    "cardiacDisease__": string,

    "allergy__": ICommonOption[],


    "allergyDrug": boolean,
    "allergyDrugNote": "青霉素类,喹啉类,庆大霉素,卡那霉素,利福平",

    "allergyFood": boolean,
    "allergyFoodNote": "",

    "allergyOther": boolean,
    "allergyOtherNote": "",

    "nothing": boolean,
    "unknown": boolean

    "transfusionHistory": boolean,
    "transfusionHistoryNote": null,
    "transfusionHistory__": string,

    "operationHistory": boolean,
    "operationHistoryNote": null,
    "operationHistory__": string,

    "heart": null,
    "lung": null,
    "nephropathyNote": null,
    "hematopathyNote": null,
    "hepaticDiseaseNote": null,
    "anemia": null,
    "hyperthyroidism": null,
    "epilepsyNote": null,
    "gynaecologyProcedureHistory": null,
    "otherNote": string,


}

