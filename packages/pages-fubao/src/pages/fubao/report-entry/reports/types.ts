import { IMchc_FormDescriptions_Field_Nullable_Arr, TIdTypeCompatible } from "@lm_fe/service"
import { AnyObject, PartialAll } from "@lm_fe/utils"

export interface IProps { injected?: boolean, idNO: string, }

export interface IReportType {
    "createdBy": "admin",
    "createdDate": "2025-03-19 17:18:25",
    "lastModifiedBy": "admin",
    "lastModifiedDate": "2025-03-19 17:18:25",
    "remark": null,
    "id": 5,
    "suitNO": string
    "suitName": string
    "visitNo": null,
    "sampleNO": null,
    "examinationDate": null,
    "patientInformationId": 33,
    "state": 1 | 2,
    "reviewer": null,
    "dept": string
    "deptLink": string
    "reviewerNO": null,
    "recycleer": null,
    "recycleerNO": null,
    "reportResults": {
        "id": 10,
        "index": null,
        "itemNO": string
        "itemName": string
        "limit": string
        "unit": string
        "normalLow": null,
        "normalHigh": null,
        "criticalLow": null,
        "criticalHigh": null,
        "result": string
        "state": null,
    }[]

}

export interface ITplConf {
    tpl_name: string
    tpl_form: IMchc_FormDescriptions_Field_Nullable_Arr
    tpl_values: PartialAll<IReportType>
}