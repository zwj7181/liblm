import { MCHC_TYPE_MAP, MchcTypes } from "@lm_fe/env"

export interface IMchc_Doctor_RiskRecordsOfOutpatient<T extends MchcTypes = MCHC_TYPE_MAP['mchc']> {
    "id": number,
    "outEmrId": null,
    "eventDate": string,
    "gestationalWeek": null,
    "highriskGrade": string,
    "highriskNote": string
    "infection": null,
    "infectionNote": null,
    "note": null,
    "doctor": string


}